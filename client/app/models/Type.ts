export enum TypeNames {
  Normal = "Normal",
  Water = "Water",
  Grass = "Grass",
  Fire = "Fire",
  Flying = "Flying",
  Fighting = "Fighting",
  Poison = "Poison",
  Rock = "Rock",
  Ground = "Ground",
  Electric = "Electric",
  Bug = "Bug",
  Dragon = "Dragon",
  Psychic = "Psychic",
  Ghost = "Ghost",
  Ice = "Ice",
}

export default class Type {
  constructor(
    public name: TypeNames,
    public resistantTo: TypeNames[] = [],
    public vulnerableTo: TypeNames[] = [],
    public imperviousTo: TypeNames[] = [],
    public color: string
  ) {}
}

export const Normal = new Type(
  TypeNames.Normal,
  [],
  [TypeNames.Fighting, TypeNames.Psychic],
  [TypeNames.Ghost],
  "#a8a77a"
);

export const Water = new Type(
  TypeNames.Water,
  [TypeNames.Fire, TypeNames.Water, TypeNames.Ice],
  [TypeNames.Grass, TypeNames.Electric],
  [],
  "#6390f0"
);

export const Grass = new Type(
  TypeNames.Grass,
  [TypeNames.Water, TypeNames.Ground, TypeNames.Grass, TypeNames.Electric],
  [
    TypeNames.Fire,
    TypeNames.Poison,
    TypeNames.Bug,
    TypeNames.Flying,
    TypeNames.Ice,
  ],
  [],
  "#7ac74c"
);

export const Fire = new Type(
  TypeNames.Fire,
  [TypeNames.Bug, TypeNames.Fire, TypeNames.Grass, TypeNames.Ice],
  [TypeNames.Ground, TypeNames.Water, TypeNames.Rock],
  [],
  "#ee8130"
);

export const Electric = new Type(
  TypeNames.Electric,
  [TypeNames.Flying],
  [TypeNames.Ground],
  [TypeNames.Electric],
  "#f7d02c"
);

export const Ice = new Type(
  TypeNames.Ice,
  [TypeNames.Ice],
  [TypeNames.Fighting, TypeNames.Rock, TypeNames.Fire],
  [],
  "#96d9d6"
);

export const Bug = new Type(
  TypeNames.Bug,
  [TypeNames.Fighting, TypeNames.Ground, TypeNames.Grass],
  [TypeNames.Flying, TypeNames.Fire, TypeNames.Rock],
  [],
  "#a6b91a"
);

export const Psychic = new Type(
  TypeNames.Psychic,
  [TypeNames.Fighting, TypeNames.Psychic],
  [TypeNames.Bug, TypeNames.Ghost],
  [],
  "#f95587"
);

export const Poison = new Type(
  TypeNames.Poison,
  [TypeNames.Fighting, TypeNames.Poison, TypeNames.Grass],
  [TypeNames.Ground, TypeNames.Psychic],
  [],
  "#a33ea1"
);

export const Fighting = new Type(
  TypeNames.Fighting,
  [TypeNames.Rock, TypeNames.Bug],
  [TypeNames.Psychic, TypeNames.Flying],
  [],
  "#c22e28"
);

export const Flying = new Type(
  TypeNames.Flying,
  [TypeNames.Fighting, TypeNames.Ground, TypeNames.Bug, TypeNames.Grass],
  [TypeNames.Rock, TypeNames.Electric, TypeNames.Ice],
  [],
  "#a98ff3"
);

export const Ground = new Type(
  TypeNames.Ground,
  [TypeNames.Poison, TypeNames.Rock],
  [TypeNames.Water, TypeNames.Grass, TypeNames.Ice],
  [TypeNames.Electric],
  "#e2bf65"
);

export const Rock = new Type(
  TypeNames.Rock,
  [TypeNames.Normal, TypeNames.Poison, TypeNames.Fire, TypeNames.Flying],
  [TypeNames.Grass, TypeNames.Water, TypeNames.Fighting, TypeNames.Ground],
  [TypeNames.Electric],
  "#b6a136"
);

export const Ghost = new Type(
  TypeNames.Ghost,
  [TypeNames.Bug],
  [TypeNames.Ghost],
  [TypeNames.Normal, TypeNames.Fighting, TypeNames.Poison],
  "#735797"
);

export const Dragon = new Type(
  TypeNames.Dragon,
  [TypeNames.Fire, TypeNames.Water, TypeNames.Grass, TypeNames.Electric],
  [TypeNames.Ice, TypeNames.Dragon],
  [],
  "#6f35fc"
);
