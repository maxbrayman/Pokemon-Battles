import Move from "./Move";
import { Sprites } from "./Sprites";
import StatusEffect from "./StatusEffects";
import Type from "./Types";

export default class Pokemon {
  public currentHp: number;
  public sprites: Sprites;
  public teamID?: string;
  constructor(
    public id: number,
    public name: string,
    public types: Type[],
    public strength: number,
    public defense: number,
    public speed: number,
    public maxHp: number,
    public moves: [Move, Move, Move, Move],
    public statusEffect?: StatusEffect
  ) {
    const existingMoves = new Set<string>();
    for (let move of moves) {
      if (existingMoves.has(move.name))
        throw new Error("A Pokemon cannot have duplicate moves");
      else existingMoves.add(move.name);
    }
    this.currentHp = maxHp;
    this.sprites = {
      front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`,
    };
  }
}
