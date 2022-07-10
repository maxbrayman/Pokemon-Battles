import Move from "../models/Move";
import Pokemon from "../models/Pokemon";

export const getMove = (
  pokemon: Pokemon,
  moveName: string
): Move | undefined => {
  return pokemon.moves.find((m) => m.name === moveName);
};
