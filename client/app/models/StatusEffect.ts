import { TypeNames } from "./Type";
export enum StatusType {
  Burn = "BRN",
  Sleeping = "SLP",
  Paralysis = "PAR",
  Poisoned = "PSN",
  Frozen = "FZN",
  Fainted = "FNT",
}

export default class StatusEffect {
  constructor(
    public type: StatusType,
    public damagePerTurn: number,
    public turnDuration: number,
    public pokemonType?: TypeNames
  ) {}
}

export class Burn extends StatusEffect {
  constructor() {
    super(StatusType.Burn, 5, 5, TypeNames.Fire);
  }
}

export class Poisoned extends StatusEffect {
  constructor() {
    super(StatusType.Poisoned, 5, 5, TypeNames.Poison);
  }
}

export class Sleeping extends StatusEffect {
  constructor() {
    super(StatusType.Sleeping, 0, 3, TypeNames.Psychic);
  }
}

export class Paralysis extends StatusEffect {
  constructor() {
    super(StatusType.Paralysis, 0, 5, TypeNames.Electric);
  }
}

export class Frozen extends StatusEffect {
  constructor() {
    super(StatusType.Frozen, 5, 5, TypeNames.Ice);
  }
}

export class Fainted extends StatusEffect {
  constructor() {
    super(StatusType.Fainted, 0, 0);
  }
}
