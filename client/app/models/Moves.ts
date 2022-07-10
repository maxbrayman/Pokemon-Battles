import { StatusType } from "./StatusEffect";
import Type, {
  Fire,
  Grass,
  Normal,
  Water,
  Flying,
  Fighting,
  Ghost,
  Electric,
  Psychic,
  Bug,
  Ice,
  Dragon,
  Poison,
  Rock,
  Ground,
} from "./Type";

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
export class Pound extends Move {
  constructor() {
    super("Pound", Normal, 20, 10, 95, 35);
  }
}

export class KarateChop extends Move {
  constructor() {
    super("Karate Chop", Fighting, 25, 10, 95, 25);
  }
}

export class MegaPunch extends Move {
  constructor() {
    super("Mega Punch", Normal, 40, 10, 85, 20);
  }
}

export class PayDay extends Move {
  constructor() {
    super("Pay Day", Normal, 20, 10, 95, 20);
  }
}

export class FirePunch extends Move {
  constructor() {
    super("Fire Punch", Fire, 35, 10, 95, 15, StatusType.Burn);
  }
}

export class IcePunch extends Move {
  constructor() {
    super("Ice Punch", Ice, 35, 10, 95, 15, StatusType.Frozen);
  }
}

export class ThunderPunch extends Move {
  constructor() {
    super("Thunder Punch", Electric, 35, 10, 95, 15, StatusType.Paralysis);
  }
}

export class Scratch extends Move {
  constructor() {
    super("Scratch", Normal, 20, 10, 95, 35);
  }
}

export class Guillotine extends Move {
  constructor() {
    super("Guillotine", Normal, 50, 10, 30, 5, undefined, true);
  }
}

export class ViseGrip extends Move {
  constructor() {
    super("Vise Grip", Normal, 25, 10, 95, 30);
  }
}

export class RazorWind extends Move {
  constructor() {
    super("Razor Wind", Normal, 40, 10, 95, 10);
  }
}

export class Cut extends Move {
  constructor() {
    super("Cut", Normal, 25, 10, 95, 30);
  }
}

export class Gust extends Move {
  constructor() {
    super("Gust", Flying, 20, 10, 95, 35);
  }
}

export class WingAttack extends Move {
  constructor() {
    super("Wing Attack", Flying, 30, 10, 95, 35);
  }
}

export class Slam extends Move {
  constructor() {
    super("Slam", Normal, 40, 10, 75, 20);
  }
}

export class VineWhip extends Move {
  constructor() {
    super("Vine Whip", Grass, 20, 10, 95, 25);
  }
}

export class MegaKick extends Move {
  constructor() {
    super("Mega Kick", Normal, 60, 10, 75, 5);
  }
}

export class JumpKick extends Move {
  constructor() {
    super("Jump Kick", Fighting, 45, 10, 95, 10);
  }
}

export class RollingKick extends Move {
  constructor() {
    super("Rolling Kick", Fighting, 30, 10, 85, 15);
  }
}

export class Headbutt extends Move {
  constructor() {
    super("Headbutt", Normal, 35, 10, 95, 15);
  }
}

export class HornAttack extends Move {
  constructor() {
    super("Horn Attack", Normal, 30, 10, 95, 25);
  }
}

export class Tackle extends Move {
  constructor() {
    super("Tackle", Normal, 20, 10, 95, 35);
  }
}

export class BodySlam extends Move {
  constructor() {
    super("Body Slam", Normal, 40, 10, 95, 15);
  }
}

export class TakeDown extends Move {
  constructor() {
    super("Take Down", Normal, 45, 10, 85, 20);
  }
}

export class PoisonSting extends Move {
  constructor() {
    super("Poison Sting", Poison, 15, 10, 95, 35, StatusType.Poisoned);
  }
}

export class Twineedle extends Move {
  constructor() {
    super("Twineedle", Bug, 15, 10, 95, 20);
  }
}

export class Acid extends Move {
  constructor() {
    super("Acid", Poison, 20, 10, 95, 30, StatusType.Poisoned);
  }
}

export class Ember extends Move {
  constructor() {
    super("Ember", Fire, 20, 10, 95, 25, StatusType.Burn);
  }
}

export class Flamethrower extends Move {
  constructor() {
    super("Flamethrower", Fire, 45, 10, 95, 15, StatusType.Burn);
  }
}

export class WaterGun extends Move {
  constructor() {
    super("Water Gun", Water, 20, 10, 95, 25);
  }
}

export class HydroPump extends Move {
  constructor() {
    super("Hydro Pump", Water, 55, 10, 80, 5);
  }
}

export class IceBeam extends Move {
  constructor() {
    super("Ice Beam", Ice, 45, 10, 95, 10, StatusType.Frozen);
  }
}

export class Blizzard extends Move {
  constructor() {
    super("Blizzard", Ice, 55, 10, 70, 5, StatusType.Frozen);
  }
}

export class Psybeam extends Move {
  constructor() {
    super("Psybeam", Psychic, 30, 10, 95, 20);
  }
}

export class AuroraBeam extends Move {
  constructor() {
    super("Aurora Beam", Ice, 30, 10, 95, 20, StatusType.Frozen);
  }
}

export class HyperBeam extends Move {
  constructor() {
    super("Hyper Beam", Normal, 75, 10, 90, 5);
  }
}

export class Peck extends Move {
  constructor() {
    super("Peck", Normal, 20, 10, 95, 35);
  }
}

export class DrillPeck extends Move {
  constructor() {
    super("Drill Peck", Normal, 40, 10, 95, 20);
  }
}

export class Submission extends Move {
  constructor() {
    super("Submission", Normal, 40, 10, 80, 20);
  }
}

export class Strength extends Move {
  constructor() {
    super("Strength", Normal, 40, 10, 95, 15);
  }
}

export class RazorLeaf extends Move {
  constructor() {
    super("Razor Leaf", Grass, 30, 10, 95, 25);
  }
}

export class SolarBeam extends Move {
  constructor() {
    super("Solar Beam", Grass, 80, 10, 80, 10);
  }
}

export class ThunderShock extends Move {
  constructor() {
    super("Thunder Shock", Electric, 20, 10, 95, 30, StatusType.Paralysis);
  }
}

export class Thunderbolt extends Move {
  constructor() {
    super("Thunderbolt", Electric, 45, 10, 95, 15, StatusType.Paralysis);
  }
}

export class Thunder extends Move {
  constructor() {
    super("Thunder", Electric, 60, 10, 70, 10, StatusType.Paralysis);
  }
}

export class RockThrow extends Move {
  constructor() {
    super("Rock Throw", Rock, 25, 10, 90, 15);
  }
}

export class Earthquake extends Move {
  constructor() {
    super("Earthquake", Ground, 50, 10, 95, 10);
  }
}

export class Confusion extends Move {
  constructor() {
    super("Confusion", Psychic, 25, 10, 95, 25);
  }
}

export class QuickAttack extends Move {
  constructor() {
    super("Quick Attack", Normal, 20, 50, 95, 30);
  }
}

export class EggBomb extends Move {
  constructor() {
    super("Egg Bomb", Normal, 45, 10, 75, 10);
  }
}

export class Lick extends Move {
  constructor() {
    super("Lick", Ghost, 20, 10, 95, 30);
  }
}

export class Smog extends Move {
  constructor() {
    super("Smog", Poison, 20, 10, 75, 20, StatusType.Poisoned);
  }
}

export class Sludge extends Move {
  constructor() {
    super("Sludge", Poison, 35, 10, 95, 20, StatusType.Poisoned);
  }
}

export class BoneClub extends Move {
  constructor() {
    super("Bone Club", Ground, 35, 10, 85, 20);
  }
}

export class FireBlast extends Move {
  constructor() {
    super("Fire Blast", Fire, 60, 10, 85, 5);
  }
}

export class Swift extends Move {
  constructor() {
    super("Swift", Normal, 25, 10, 100, 25);
  }
}

export class SkullBash extends Move {
  constructor() {
    super("Skull Bash", Normal, 65, 10, 70, 10);
  }
}

export class HighJumpKick extends Move {
  constructor() {
    super("HighJumpKick", Fighting, 65, 10, 75, 10);
  }
}

export class Bubble extends Move {
  constructor() {
    super("Bubble", Water, 25, 10, 95, 30);
  }
}

export class Crabhammer extends Move {
  constructor() {
    super("Crabhammer", Water, 50, 10, 85, 10);
  }
}

export class Bonemerang extends Move {
  constructor() {
    super("Bonemerang", Ground, 30, 10, 90, 10);
  }
}

export class RockSlide extends Move {
  constructor() {
    super("Rock Slide", Rock, 40, 10, 90, 10);
  }
}

export class HyperFang extends Move {
  constructor() {
    super("Hyper Fang", Normal, 40, 10, 90, 15);
  }
}

export class TriAttack extends Move {
  constructor() {
    super("Tri Attack", Normal, 40, 10, 95, 10);
  }
}

export class Slash extends Move {
  constructor() {
    super("Slash", Normal, 35, 10, 95, 20);
  }
}

export class Aeroblast extends Move {
  constructor() {
    super("Aeroblast", Flying, 50, 10, 85, 5);
  }
}

export class SeismicToss extends Move {
  constructor() {
    super("Seismic Toss", Fighting, 30, 10, 95, 20);
  }
}

export class LowKick extends Move {
  constructor() {
    super("Low Kick", Fighting, 20, 10, 95, 30);
  }
}

export class Surf extends Move {
  constructor() {
    super("Surf", Water, 35, 10, 95, 15);
  }
}
