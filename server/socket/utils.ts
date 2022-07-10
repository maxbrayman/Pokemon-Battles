import { ClientAttack, ClientSwap } from "../models/ClientActions";
import Game from "../models/Game";

export const findGame = (games: Game[], code: string): Game | undefined => {
  return games.find((g) => g.code === code);
};

export const isSwap = (action: ClientSwap | ClientAttack): boolean => {
  return "pokemonTeamID" in action;
};
