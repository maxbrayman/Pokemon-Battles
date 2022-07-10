import StatusEffect from "./StatusEffects";

export default interface AttackOutcome {
  damage: number;
  message: string;
  statusEffect?: StatusEffect;
}
