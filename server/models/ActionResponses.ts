import Pokemon from "./Pokemon";

export interface SwapResponse {
  playerSocketID: string;
  pokemonTeamID: string;
  message: string;
}

export interface AttackResponse {
  defendingPlayerSocketID: string;
  defendingTeam: Pokemon[];
  attackingTeam: Pokemon[];
  attackMessage: string;
  damageMessage: string;
  pokemonFainted: boolean;
  gameOver?: GameOver | null;
}

export interface GameOver {
  winningSocketID: string;
  losingSocketID: string;
}
