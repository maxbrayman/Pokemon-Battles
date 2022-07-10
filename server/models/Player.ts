import { Attack, Swap } from "./Actions";
import Pokemon from "./Pokemon";

export default class Player {
  isReady = false;
  team: Pokemon[] = [];
  private _activePokemonID?: string;
  action: Swap | Attack | null = null;

  constructor(
    public socketID: string,
    private _isHost: boolean,
    public avatar: string
  ) {}

  get isHost(): boolean {
    return this._isHost;
  }

  get activePokemonID(): string | undefined {
    return this._activePokemonID;
  }

  getAcitvePokemon(): Pokemon | undefined {
    return this.team.find((p) => p.teamID === this._activePokemonID);
  }

  changeActivePokemon(teamID: string): Pokemon | null {
    const pokemon = this.team.find((p) => p.teamID === teamID);
    if (pokemon) {
      this._activePokemonID = teamID;
      return pokemon;
    } else return null;
  }
}
