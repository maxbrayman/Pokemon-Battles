import { StatusType } from "./StatusEffects";
import Type from "./Types";

export default class Move {
  public currentPP: number;
  constructor(
    public name: string,
    public type: Type,
    public power: number,
    public speed: number,
    public accuracy: number,
    public maxPP: number,
    public statusEffect?: StatusType,
    public autoFaint?: boolean
  ) {
    this.currentPP = maxPP;
  }
}
