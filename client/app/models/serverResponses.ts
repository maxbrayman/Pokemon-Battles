import PokemonClass from "../models/Pokemon";

export interface SwapResponse {
  playerSocketID: string;
  pokemonTeamID: string;
  message: string;
}

export interface AttackResponse {
  defendingPlayerSocketID: string;
  defendingTeam: PokemonClass[];
  attackingTeam: PokemonClass[];
  attackMessage: string;
  damageMessage: string;
  pokemonFainted: boolean;
  gameOver?: GameOver | null;
}

export interface GameOver {
  winningSocketID: string;
  losingSocketID: string;
}
