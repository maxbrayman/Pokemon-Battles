import { generateRandomString } from "../utils/strings";
import Player from "./Player";
import Pokemon from "./Pokemon";
import Move from "./Move";
import { AttackResponse, GameOver, SwapResponse } from "./ActionResponses";
import { Attack, Swap } from "./Actions";
import { Fainted, StatusType } from "./StatusEffects";
import AttackOutcome from "./AttackOutcome";
import { random } from "../utils/math";
import { getMove } from "../utils/pokemon";

export type GameState = "StartUp" | "SelectAction" | "InProgress" | "End";

export default class Game {
  private _players: Player[] = [];
  readonly code: string;
  state: GameState = "StartUp";
  nextAction: Swap | Attack | null = null;
  actionReceivedBy: string[] = [];

  constructor(existingGames: Game[]) {
    let code = generateRandomString(6, false, "uppercase");
    let codeExists = existingGames.find((g) => g.code === code);
    while (codeExists) {
      code = generateRandomString(6, false, "uppercase");
      codeExists = existingGames.find((g) => g.code === code);
    }
    this.code = code;
  }

  get players(): Player[] {
    return this._players;
  }

  isFull(): boolean {
    return this._players.length === 2;
  }

  addPlayer(player: Player) {
    if (this._players.length === 2)
      throw new Error("Game cannot exceed 2 players");
    else this._players.push(player);
  }

  removePlayer(socketID: string): boolean {
    const index = this._players.findIndex((p) => p.socketID === socketID);
    let isHost = false;
    if (index > -1) {
      isHost = this._players[index].isHost;
      this._players.splice(index, 1);
    }
    return isHost;
  }

  playerReady(socketID: string) {
    const player = this._players.find((p) => {
      return p.socketID === socketID;
    });
    if (player) player.isReady = true;
  }

  arePlayersReady(): boolean {
    if (this._players.length !== 2) return false;
    else return this._players.every((p) => p.isReady);
  }

  getOpponent(socketID: string): Player | undefined {
    return this._players.find((p) => p.socketID !== socketID);
  }

  setPlayerTeam(socketID: string, team: Pokemon[]) {
    const player = this._players.find((p) => p.socketID === socketID);
    if (player) {
      player.team = team;
    }
  }

  areTeamsSet(): boolean {
    return this._players.every((p) => p.team.length === 6);
  }

  setPlayerAction(action: Swap | Attack | null) {
    if (!action) return;
    const player = this._findPlayer(action.socketID);
    if (player) {
      player.action = action;
    }
    if (this._players.every((p) => p.action !== null))
      this.state = "InProgress";
  }

  playerActionsAreSet(): boolean {
    return this._players.every((p) => p.action !== null);
  }

  executeAction(): SwapResponse | AttackResponse | null {
    this.actionReceivedBy = [];
    this._determineNextAction();
    if (this.nextAction) {
      let response: SwapResponse | AttackResponse | null;
      if ("pokemonTeamID" in this.nextAction) {
        response = this.swapPokemon(this.nextAction);
      } else {
        response = this._attack(this.nextAction);
        if (response?.pokemonFainted) {
          this._players.forEach((p) => (p.action = null));
        }
      }
      const player = this._findPlayer(this.nextAction.socketID);
      if (player) player.action = null;
      return response;
    } else {
      this.state = "SelectAction";
      return null;
    }
  }

  swapPokemon(swapAction: Swap): SwapResponse {
    const player = this._findPlayer(swapAction.socketID);
    const newActivePokemon = player?.changeActivePokemon(
      swapAction.pokemonTeamID
    );
    return {
      pokemonTeamID: swapAction.pokemonTeamID,
      playerSocketID: swapAction.socketID,
      message: `${newActivePokemon?.name} was sent out.`,
    };
  }

  actionReceivedByAllPlayers(): boolean {
    for (let player of this._players) {
      if (!this.actionReceivedBy.includes(player.socketID)) return false;
    }
    return true;
  }

  actionWasReceived(socketID: string) {
    const player = this._findPlayer(socketID);
    if (player) this.actionReceivedBy.push(player.socketID);
  }

  private _attack(attack: Attack): AttackResponse | null {
    const attackingPlayer = this._findPlayer(attack.socketID);
    const defendingPlayer = this._players.find(
      (p) => p.socketID !== attack.socketID
    );

    if (!attackingPlayer || !defendingPlayer) return null;

    const attackingPokemon = attackingPlayer.getAcitvePokemon();
    const defendingPokemon = defendingPlayer.getAcitvePokemon();

    if (!attackingPokemon || !defendingPokemon) return null;

    const move = getMove(attackingPokemon, attack.move);
    if (!move) return null;

    const outcome = this._calculateDamage(
      move,
      attackingPokemon,
      defendingPokemon
    );
    move.currentPP -= 1;

    if (!outcome) return null;

    if (outcome.statusEffect)
      defendingPokemon.statusEffect = outcome.statusEffect;
    defendingPokemon.currentHp -= outcome.damage;

    let didFaint = false;
    let gameOver: GameOver | null = null;
    if (defendingPokemon.currentHp === 0) {
      defendingPokemon.statusEffect = new Fainted();
      didFaint = true;
      if (this._teamIsFainted(defendingPlayer.team)) {
        gameOver = {
          winningSocketID: attackingPlayer.socketID,
          losingSocketID: defendingPlayer.socketID,
        };
        this.state = "End";
      }
    }

    return {
      defendingPlayerSocketID: defendingPlayer.socketID,
      defendingTeam: defendingPlayer.team,
      attackingTeam: attackingPlayer.team,
      damageMessage: didFaint
        ? `${defendingPokemon.name} fainted`
        : outcome.message,
      attackMessage: `${attackingPokemon.name} used ${move.name}`,
      pokemonFainted: didFaint,
      gameOver,
    };
  }

  private _findPlayer(socketID: string): Player | undefined {
    return this._players.find((p) => p.socketID === socketID);
  }

  private _determineNextAction() {
    const player1Action = this._players[0].action;
    const player2Action = this._players[1].action;
    if (!player1Action && !player2Action) this.nextAction = null;
    else if (!player1Action) this.nextAction = player2Action;
    else if (!player2Action) this.nextAction = player1Action;
    else if ("pokemonTeamID" in player1Action) this.nextAction = player1Action;
    else if ("pokemonTeamID" in player2Action) this.nextAction = player2Action;
    else {
      // calculate speed of each action
      const player1 = this._findPlayer(player1Action.socketID);
      const player2 = this._findPlayer(player2Action.socketID);

      if (!player1 || !player2) return;

      const player1Pokemon = player1.getAcitvePokemon();
      const player2Pokemon = player2.getAcitvePokemon();

      if (!player1Pokemon || !player2Pokemon) return;

      const player1Move = getMove(player1Pokemon, player1Action.move);
      const player2Move = getMove(player2Pokemon, player2Action.move);

      if (!player1Move || !player2Move) return;

      let player1Speed = player1Pokemon.speed + player1Move.speed;
      if (player1Pokemon.statusEffect?.type === StatusType.Paralysis)
        player1Speed /= 2;

      let player2Speed = player2Pokemon.speed + player2Move.speed;
      if (player2Pokemon.statusEffect?.type === StatusType.Paralysis)
        player2Speed /= 2;

      if (player1Speed > player2Speed) this.nextAction = player1Action;
      else this.nextAction = player2Action;
    }
  }

  private _calculateDamage(
    move: Move,
    attackingPokemon: Pokemon,
    defendingPokemon: Pokemon
  ): AttackOutcome | null {
    let damageMultiplier: number =
      attackingPokemon.strength / defendingPokemon.defense;
    let message = "";

    // check for status effects
    if (attackingPokemon.statusEffect?.type === StatusType.Sleeping) {
      return {
        damage: 0,
        message: `${attackingPokemon.name} is fast asleep`,
      };
    }

    if (attackingPokemon.statusEffect?.type === StatusType.Paralysis) {
      if (random(1, 4) === 4) {
        return {
          damage: 0,
          message: `${attackingPokemon.name} is stunned from paralysis`,
        };
      }
    }

    // check if defending pokemon is impervious to move
    const isImpervious = defendingPokemon.types.some((t) =>
      t.imperviousTo.includes(move.type.name)
    );
    if (isImpervious) {
      return {
        damage: 0,
        message: `The move has no effect on ${defendingPokemon.name}`,
      };
    }

    // determine if the attack misses
    const chanceOfMiss = random(0, 100);
    if (chanceOfMiss > move.accuracy) {
      return {
        damage: 0,
        message: `${attackingPokemon.name} missed the attack`,
      };
    }

    // check if move makes pokemon faint automatically
    if (move.autoFaint) {
      return {
        damage: defendingPokemon.currentHp,
        message: `${defendingPokemon.name} fainted`,
      };
    }

    let resistantTypes = 0;
    let vulnerableTypes = 0;

    for (let type of defendingPokemon.types) {
      if (type.resistantTo.includes(move.type.name)) {
        damageMultiplier -= 0.5;
        resistantTypes += 1;
      } else if (type.vulnerableTo.includes(move.type.name)) {
        damageMultiplier += 0.5;
        vulnerableTypes += 1;
      }
    }

    if (vulnerableTypes > resistantTypes)
      message = `The attack was super effective`;
    else if (resistantTypes > vulnerableTypes)
      message = `The attack was not very effective`;
    else message = `${defendingPokemon.name} was hit`;

    // calculate chance of critical hit
    const chanceOfCriticalHit = random(0, 100);
    if (chanceOfCriticalHit > 80) {
      damageMultiplier += 0.5;
      message = "Critical hit!";
    }

    // set a minimum multiplier of 0.25
    damageMultiplier = Math.max(0.25, damageMultiplier);

    // don't allow excess damage to be dealt
    const damage = Math.min(
      move.power * damageMultiplier,
      defendingPokemon.currentHp
    );

    return {
      damage,
      message,
    };
  }
  private _teamIsFainted(team: Pokemon[]): boolean {
    return team.every((p) => p.statusEffect?.type === StatusType.Fainted);
  }
}
