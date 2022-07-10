// import Move, {
//   BodySlam,
//   Ember,
//   PoisonSting,
//   RazorLeaf,
//   Tackle,
//   WaterGun,
// } from "./Moves";

import Move from "./Moves";
import * as Moves from "./Moves";

import StatusEffect from "./StatusEffect";
import Type, {
  Bug,
  Dragon,
  Electric,
  Fighting,
  Fire,
  Flying,
  Ghost,
  Grass,
  Ground,
  Ice,
  Normal,
  Poison,
  Psychic,
  Rock,
  Water,
} from "./Type";
import { Sprites } from "./Sprites";

export default class PokemonClass {
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

export const clonePokemon = (pokemon: PokemonClass): PokemonClass => {
  const clone = new PokemonClass(
    pokemon.id,
    pokemon.name,
    pokemon.types,
    pokemon.strength,
    pokemon.defense,
    pokemon.speed,
    pokemon.maxHp,
    pokemon.moves,
    pokemon.statusEffect
  );
  clone.currentHp = pokemon.currentHp;
  clone.teamID = pokemon.teamID;
  return clone;
};

export class Bulbasaur extends PokemonClass {
  constructor() {
    super(1, "Bulbasaur", [Grass, Poison], 49, 49, 45, 95, [
      new Moves.RazorLeaf(),
      new Moves.BodySlam(),
      new Moves.PoisonSting(),
      new Moves.Tackle(),
    ]);
  }
}

export class Ivysaur extends PokemonClass {
  constructor() {
    super(2, "Ivysaur", [Grass, Poison], 62, 63, 60, 110, [
      new Moves.RazorLeaf(),
      new Moves.Scratch(),
      new Moves.VineWhip(),
      new Moves.TakeDown(),
    ]);
  }
}

export class Venasaur extends PokemonClass {
  constructor() {
    super(3, "Venasaur", [Grass, Poison], 82, 83, 80, 130, [
      new Moves.RazorLeaf(),
      new Moves.SolarBeam(),
      new Moves.Strength(),
      new Moves.Sludge(),
    ]);
  }
}

export class Charmander extends PokemonClass {
  constructor() {
    super(4, "Charmander", [Fire], 52, 43, 65, 89, [
      new Moves.Ember(),
      new Moves.Scratch(),
      new Moves.SeismicToss(),
      new Moves.QuickAttack(),
    ]);
  }
}

export class Charmeleon extends PokemonClass {
  constructor() {
    super(5, "Charmeleon", [Fire], 64, 58, 80, 108, [
      new Moves.SkullBash(),
      new Moves.Slam(),
      new Moves.Flamethrower(),
      new Moves.Tackle(),
    ]);
  }
}

export class Charizard extends PokemonClass {
  constructor() {
    super(6, "Charizard", [Fire, Flying], 84, 78, 100, 128, [
      new Moves.WingAttack(),
      new Moves.FireBlast(),
      new Moves.FirePunch(),
      new Moves.Headbutt(),
    ]);
  }
}

export class Squirtle extends PokemonClass {
  constructor() {
    super(7, "Squirtle", [Water], 48, 65, 43, 94, [
      new Moves.WaterGun(),
      new Moves.Swift(),
      new Moves.Lick(),
      new Moves.Cut(),
    ]);
  }
}

export class Wartortle extends PokemonClass {
  constructor() {
    super(8, "Wartortle", [Water], 63, 80, 58, 109, [
      new Moves.WaterGun(),
      new Moves.Bubble(),
      new Moves.Tackle(),
      new Moves.Scratch(),
    ]);
  }
}

export class Blastoise extends PokemonClass {
  constructor() {
    super(9, "Blastoise", [Water], 83, 100, 78, 129, [
      new Moves.SkullBash(),
      new Moves.HydroPump(),
      new Moves.Bubble(),
      new Moves.Slash(),
    ]);
  }
}

export class Caterpie extends PokemonClass {
  constructor() {
    super(10, "Caterpie", [Bug], 30, 35, 45, 95, [
      new Moves.Twineedle(),
      new Moves.Tackle(),
      new Moves.QuickAttack(),
      new Moves.PoisonSting(),
    ]);
  }
}

export class Butterfree extends PokemonClass {
  constructor() {
    super(12, "Butterfree", [Bug, Flying], 45, 50, 70, 110, [
      new Moves.Swift(),
      new Moves.RazorWind(),
      new Moves.Gust(),
      new Moves.Cut(),
    ]);
  }
}

export class Weedle extends PokemonClass {
  constructor() {
    super(13, "Weedle", [Bug, Poison], 35, 30, 50, 90, [
      new Moves.Twineedle(),
      new Moves.Tackle(),
      new Moves.QuickAttack(),
      new Moves.PoisonSting(),
    ]);
  }
}

export class Beedrill extends PokemonClass {
  constructor() {
    super(15, "Beedrill", [Bug, Poison], 80, 40, 75, 115, [
      new Moves.Swift(),
      new Moves.Acid(),
      new Moves.Gust(),
      new Moves.Cut(),
    ]);
  }
}

export class Pidgey extends PokemonClass {
  constructor() {
    super(16, "Pidgey", [Normal, Flying], 45, 40, 56, 90, [
      new Moves.Gust(),
      new Moves.Tackle(),
      new Moves.QuickAttack(),
      new Moves.Cut(),
    ]);
  }
}

export class Pidgeotto extends PokemonClass {
  constructor() {
    super(17, "Pidgeotto", [Normal, Flying], 60, 55, 71, 113, [
      new Moves.WingAttack(),
      new Moves.Swift(),
      new Moves.Scratch(),
      new Moves.Tackle(),
    ]);
  }
}

export class Pidgeot extends PokemonClass {
  constructor() {
    super(18, "Pidgeot", [Normal, Flying], 80, 75, 91, 133, [
      new Moves.RazorWind(),
      new Moves.QuickAttack(),
      new Moves.Slash(),
      new Moves.Cut(),
    ]);
  }
}

export class Rattata extends PokemonClass {
  constructor() {
    super(19, "Rattata", [Normal], 56, 35, 72, 80, [
      new Moves.QuickAttack(),
      new Moves.Scratch(),
      new Moves.Swift(),
      new Moves.TakeDown(),
    ]);
  }
}

export class Raticate extends PokemonClass {
  constructor() {
    super(20, "Raticate", [Normal], 81, 60, 97, 105, [
      new Moves.HyperFang(),
      new Moves.Slash(),
      new Moves.BodySlam(),
      new Moves.Pound(),
    ]);
  }
}

export class Spearow extends PokemonClass {
  constructor() {
    super(21, "Spearow", [Normal, Flying], 60, 30, 70, 90, [
      new Moves.Gust(),
      new Moves.Tackle(),
      new Moves.Peck(),
      new Moves.Cut(),
    ]);
  }
}

export class Fearow extends PokemonClass {
  constructor() {
    super(22, "Fearow", [Normal, Flying], 90, 65, 100, 115, [
      new Moves.WingAttack(),
      new Moves.QuickAttack(),
      new Moves.DrillPeck(),
      new Moves.Cut(),
    ]);
  }
}

export class Ekans extends PokemonClass {
  constructor() {
    super(23, "Ekans", [Poison], 60, 44, 55, 85, [
      new Moves.PoisonSting(),
      new Moves.Pound(),
      new Moves.Tackle(),
      new Moves.Swift(),
    ]);
  }
}

export class Arbok extends PokemonClass {
  constructor() {
    super(24, "Arbok", [Poison], 85, 69, 80, 110, [
      new Moves.Sludge(),
      new Moves.HyperFang(),
      new Moves.Lick(),
      new Moves.Tackle(),
    ]);
  }
}

export class Pikachu extends PokemonClass {
  constructor() {
    super(25, "Pikachu", [Electric], 55, 30, 90, 85, [
      new Moves.QuickAttack(),
      new Moves.ThunderShock(),
      new Moves.Pound(),
      new Moves.Scratch(),
    ]);
  }
}

export class Raichu extends PokemonClass {
  constructor() {
    super(26, "Raichu", [Electric], 90, 55, 100, 110, [
      new Moves.Thunder(),
      new Moves.Thunderbolt(),
      new Moves.TakeDown(),
      new Moves.BodySlam(),
    ]);
  }
}

export class Sandshrew extends PokemonClass {
  constructor() {
    super(27, "Sandshrew", [Ground], 75, 85, 40, 100, [
      new Moves.Scratch(),
      new Moves.BodySlam(),
      new Moves.BoneClub(),
      new Moves.Tackle(),
    ]);
  }
}

export class Sandslash extends PokemonClass {
  constructor() {
    super(28, "Sandslash", [Ground], 100, 110, 65, 125, [
      new Moves.SkullBash(),
      new Moves.Slam(),
      new Moves.Earthquake(),
      new Moves.TakeDown(),
    ]);
  }
}

export class NidoranF extends PokemonClass {
  constructor() {
    super(29, "Nidoran(f)", [Poison], 47, 52, 41, 105, [
      new Moves.PoisonSting(),
      new Moves.Tackle(),
      new Moves.QuickAttack(),
      new Moves.Slam(),
    ]);
  }
}

export class Nidorina extends PokemonClass {
  constructor() {
    super(30, "Nidorina", [Poison], 62, 67, 56, 120, [
      new Moves.Acid(),
      new Moves.BodySlam(),
      new Moves.Slash(),
      new Moves.Strength(),
    ]);
  }
}

export class Nidoqueen extends PokemonClass {
  constructor() {
    super(31, "Nidoqueen", [Poison, Ground], 82, 87, 76, 140, [
      new Moves.Sludge(),
      new Moves.TakeDown(),
      new Moves.Earthquake(),
      new Moves.Peck(),
    ]);
  }
}

export class NidoranM extends PokemonClass {
  constructor() {
    super(32, "Nidoran(m)", [Poison], 57, 40, 50, 96, [
      new Moves.PoisonSting(),
      new Moves.Tackle(),
      new Moves.QuickAttack(),
      new Moves.Slam(),
    ]);
  }
}

export class Nidorino extends PokemonClass {
  constructor() {
    super(33, "Nidorino", [Poison], 72, 57, 65, 111, [
      new Moves.Acid(),
      new Moves.BodySlam(),
      new Moves.Slash(),
      new Moves.Strength(),
    ]);
  }
}

export class Nidoking extends PokemonClass {
  constructor() {
    super(34, "Nidoking", [Poison, Ground], 92, 77, 85, 131, [
      new Moves.Sludge(),
      new Moves.TakeDown(),
      new Moves.Earthquake(),
      new Moves.Surf(),
    ]);
  }
}

export class Clefairy extends PokemonClass {
  constructor() {
    super(35, "Clefairy", [Normal], 45, 48, 35, 120, [
      new Moves.Pound(),
      new Moves.Swift(),
      new Moves.Tackle(),
      new Moves.Strength(),
    ]);
  }
}

export class Clefable extends PokemonClass {
  constructor() {
    super(36, "Clefable", [Normal], 70, 73, 60, 145, [
      new Moves.Swift(),
      new Moves.QuickAttack(),
      new Moves.RockSlide(),
      new Moves.SeismicToss(),
    ]);
  }
}

export class Vulpix extends PokemonClass {
  constructor() {
    super(37, "Vulpix", [Fire], 41, 40, 65, 88, [
      new Moves.Ember(),
      new Moves.Tackle(),
      new Moves.QuickAttack(),
      new Moves.Cut(),
    ]);
  }
}

export class Ninetales extends PokemonClass {
  constructor() {
    super(38, "Ninetales", [Fire], 76, 75, 100, 123, [
      new Moves.Flamethrower(),
      new Moves.TakeDown(),
      new Moves.SkullBash(),
      new Moves.Swift(),
    ]);
  }
}

export class Jigglypuff extends PokemonClass {
  constructor() {
    super(39, "Jigglypuff", [Normal], 45, 20, 20, 165, [
      new Moves.Pound(),
      new Moves.Swift(),
      new Moves.Tackle(),
      new Moves.WaterGun(),
    ]);
  }
}

export class Wigglytuff extends PokemonClass {
  constructor() {
    super(40, "Wigglytuff", [Normal], 70, 45, 45, 190, [
      new Moves.BodySlam(),
      new Moves.Earthquake(),
      new Moves.Scratch(),
      new Moves.QuickAttack(),
    ]);
  }
}

export class Zubat extends PokemonClass {
  constructor() {
    super(41, "Zubat", [Poison, Flying], 45, 35, 55, 90, [
      new Moves.Gust(),
      new Moves.PoisonSting(),
      new Moves.Swift(),
      new Moves.QuickAttack(),
    ]);
  }
}

export class Golbat extends PokemonClass {
  constructor() {
    super(42, "Golbat", [Poison, Flying], 80, 70, 90, 125, [
      new Moves.WingAttack(),
      new Moves.HyperFang(),
      new Moves.Lick(),
      new Moves.Cut(),
    ]);
  }
}

export class Oddish extends PokemonClass {
  constructor() {
    super(43, "Oddish", [Grass, Poison], 50, 55, 30, 95, [
      new Moves.RazorLeaf(),
      new Moves.Cut(),
      new Moves.Tackle(),
      new Moves.VineWhip(),
    ]);
  }
}

export class Gloom extends PokemonClass {
  constructor() {
    super(44, "Gloom", [Grass, Poison], 65, 70, 40, 110, [
      new Moves.Sludge(),
      new Moves.Swift(),
      new Moves.QuickAttack(),
      new Moves.Tackle(),
    ]);
  }
}

export class Vileplume extends PokemonClass {
  constructor() {
    super(45, "Vileplume", [Grass, Poison], 80, 85, 50, 125, [
      new Moves.SolarBeam(),
      new Moves.Acid(),
      new Moves.TakeDown(),
      new Moves.Twineedle(),
    ]);
  }
}

export class Paras extends PokemonClass {
  constructor() {
    super(46, "Paras", [Bug, Grass], 70, 55, 25, 85, [
      new Moves.Twineedle(),
      new Moves.Tackle(),
      new Moves.PoisonSting(),
      new Moves.Pound(),
    ]);
  }
}

export class Parasect extends PokemonClass {
  constructor() {
    super(47, "Parasect", [Bug, Grass], 95, 80, 30, 110, [
      new Moves.Acid(),
      new Moves.RazorLeaf(),
      new Moves.Swift(),
      new Moves.ViseGrip(),
    ]);
  }
}

export class Venonat extends PokemonClass {
  constructor() {
    super(48, "Venonat", [Bug, Poison], 55, 50, 45, 110, [
      new Moves.Twineedle(),
      new Moves.Tackle(),
      new Moves.PoisonSting(),
      new Moves.Pound(),
    ]);
  }
}

export class Venomoth extends PokemonClass {
  constructor() {
    super(49, "Venomoth", [Bug, Poison], 65, 60, 90, 120, [
      new Moves.WingAttack(),
      new Moves.Slam(),
      new Moves.Acid(),
      new Moves.Swift(),
    ]);
  }
}

export class Diglett extends PokemonClass {
  constructor() {
    super(50, "Diglett", [Ground], 55, 25, 95, 60, [
      new Moves.Earthquake(),
      new Moves.Cut(),
      new Moves.Tackle(),
      new Moves.Pound(),
    ]);
  }
}

export class Dugtrio extends PokemonClass {
  constructor() {
    super(51, "Dugtrio", [Ground], 80, 50, 120, 85, [
      new Moves.Earthquake(),
      new Moves.TakeDown(),
      new Moves.Cut(),
      new Moves.TriAttack(),
    ]);
  }
}

export class Meowth extends PokemonClass {
  constructor() {
    super(52, "Meowth", [Normal], 45, 35, 90, 90, [
      new Moves.PayDay(),
      new Moves.QuickAttack(),
      new Moves.Tackle(),
      new Moves.Scratch(),
    ]);
  }
}

export class Persian extends PokemonClass {
  constructor() {
    super(53, "Persian", [Normal], 70, 60, 115, 115, [
      new Moves.PayDay(),
      new Moves.Swift(),
      new Moves.TakeDown(),
      new Moves.Slash(),
    ]);
  }
}

export class Psyduck extends PokemonClass {
  constructor() {
    super(54, "Psyduck", [Water], 52, 48, 55, 100, [
      new Moves.WaterGun(),
      new Moves.Confusion(),
      new Moves.Swift(),
      new Moves.Tackle(),
    ]);
  }
}

export class Golduck extends PokemonClass {
  constructor() {
    super(55, "Golduck", [Water], 82, 78, 85, 130, [
      new Moves.WaterGun(),
      new Moves.Psybeam(),
      new Moves.Slash(),
      new Moves.Scratch(),
    ]);
  }
}

export class Mankey extends PokemonClass {
  constructor() {
    super(56, "Mankey", [Fighting], 80, 35, 70, 90, [
      new Moves.SeismicToss(),
      new Moves.Slam(),
      new Moves.Swift(),
      new Moves.Tackle(),
    ]);
  }
}

export class Primeape extends PokemonClass {
  constructor() {
    super(57, "Primeape", [Fighting], 105, 60, 95, 115, [
      new Moves.TakeDown(),
      new Moves.LowKick(),
      new Moves.MegaPunch(),
      new Moves.Pound(),
    ]);
  }
}

export class Growlithe extends PokemonClass {
  constructor() {
    super(58, "Growlithe", [Fire], 70, 45, 60, 105, [
      new Moves.Ember(),
      new Moves.Tackle(),
      new Moves.Scratch(),
      new Moves.Slam(),
    ]);
  }
}

export class Arcanine extends PokemonClass {
  constructor() {
    super(59, "Arcanine", [Fire], 110, 80, 95, 140, [
      new Moves.Flamethrower(),
      new Moves.TakeDown(),
      new Moves.SeismicToss(),
      new Moves.SkullBash(),
    ]);
  }
}

export class Poliwag extends PokemonClass {
  constructor() {
    super(60, "Poliwag", [Water], 50, 40, 90, 90, [
      new Moves.WaterGun(),
      new Moves.QuickAttack(),
      new Moves.Tackle(),
      new Moves.Cut(),
    ]);
  }
}

export class Poliwhirl extends PokemonClass {
  constructor() {
    super(61, "Poliwhirl", [Water], 65, 65, 90, 115, [
      new Moves.Bubble(),
      new Moves.BodySlam(),
      new Moves.MegaPunch(),
      new Moves.Swift(),
    ]);
  }
}

export class Poliwrath extends PokemonClass {
  constructor() {
    super(62, "Poliwrath", [Water, Fighting], 85, 95, 70, 140, [
      new Moves.Surf(),
      new Moves.KarateChop(),
      new Moves.Slam(),
      new Moves.Scratch(),
    ]);
  }
}

export class Abra extends PokemonClass {
  constructor() {
    super(63, "Abra", [Psychic], 20, 15, 90, 75, [
      new Moves.QuickAttack(),
      new Moves.Tackle(),
      new Moves.Confusion(),
      new Moves.Cut(),
    ]);
  }
}

export class Kadabra extends PokemonClass {
  constructor() {
    super(64, "Kadabra", [Psychic], 35, 30, 105, 90, [
      new Moves.Swift(),
      new Moves.Tackle(),
      new Moves.Psybeam(),
      new Moves.Scratch(),
    ]);
  }
}

export class Alakazam extends PokemonClass {
  constructor() {
    super(65, "Alakazam", [Psychic], 50, 45, 120, 105, [
      new Moves.Psybeam(),
      new Moves.Confusion(),
      new Moves.Cut(),
      new Moves.Headbutt(),
    ]);
  }
}

export class Machop extends PokemonClass {
  constructor() {
    super(66, "Machop", [Fighting], 80, 50, 35, 120, [
      new Moves.Tackle(),
      new Moves.SeismicToss(),
      new Moves.LowKick(),
      new Moves.Cut(),
    ]);
  }
}

export class Machoke extends PokemonClass {
  constructor() {
    super(67, "Machoke", [Fighting], 100, 70, 45, 130, [
      new Moves.Swift(),
      new Moves.KarateChop(),
      new Moves.RollingKick(),
      new Moves.TakeDown(),
    ]);
  }
}

export class Machamp extends PokemonClass {
  constructor() {
    super(68, "Machamp", [Fighting], 130, 80, 55, 140, [
      new Moves.Guillotine(),
      new Moves.MegaPunch(),
      new Moves.IcePunch(),
      new Moves.ThunderPunch(),
    ]);
  }
}

export class Bellsprout extends PokemonClass {
  constructor() {
    super(69, "Bellsprout", [Grass], 75, 35, 40, 100, [
      new Moves.VineWhip(),
      new Moves.Cut(),
      new Moves.Tackle(),
      new Moves.Twineedle(),
    ]);
  }
}

export class Weepinbell extends PokemonClass {
  constructor() {
    super(70, "Weepinbell", [Grass], 90, 50, 55, 105, [
      new Moves.RazorLeaf(),
      new Moves.Lick(),
      new Moves.QuickAttack(),
      new Moves.Cut(),
    ]);
  }
}

export class Victreebel extends PokemonClass {
  constructor() {
    super(71, "Victreebel", [Grass], 105, 65, 70, 130, [
      new Moves.HyperFang(),
      new Moves.VineWhip(),
      new Moves.Scratch(),
      new Moves.Slam(),
    ]);
  }
}

export class Tentacool extends PokemonClass {
  constructor() {
    super(72, "Tentacool", [Water, Poison], 40, 35, 70, 90, [
      new Moves.Bubble(),
      new Moves.PoisonSting(),
      new Moves.Pound(),
      new Moves.Tackle(),
    ]);
  }
}

export class Tentacruel extends PokemonClass {
  constructor() {
    super(73, "Tentacruel", [Water, Poison], 70, 65, 100, 130, [
      new Moves.Sludge(),
      new Moves.Smog(),
      new Moves.WaterGun(),
      new Moves.ViseGrip(),
    ]);
  }
}

export class Geodue extends PokemonClass {
  constructor() {
    super(74, "Geodue", [Rock, Ground], 80, 100, 20, 90, [
      new Moves.Tackle(),
      new Moves.SkullBash(),
      new Moves.RockThrow(),
      new Moves.Cut(),
    ]);
  }
}

export class Graveler extends PokemonClass {
  constructor() {
    super(75, "Graveler", [Rock, Ground], 95, 115, 35, 105, [
      new Moves.Slam(),
      new Moves.RockSlide(),
      new Moves.Scratch(),
      new Moves.MegaPunch(),
    ]);
  }
}

export class Golem extends PokemonClass {
  constructor() {
    super(76, "Golem", [Rock, Ground], 110, 130, 45, 130, [
      new Moves.Earthquake(),
      new Moves.RockThrow(),
      new Moves.SeismicToss(),
      new Moves.Tackle(),
    ]);
  }
}

export class Ponyta extends PokemonClass {
  constructor() {
    super(77, "Ponyta", [Fire], 85, 55, 90, 100, [
      new Moves.Ember(),
      new Moves.Tackle(),
      new Moves.Lick(),
      new Moves.LowKick(),
    ]);
  }
}

export class Rapidash extends PokemonClass {
  constructor() {
    super(78, "Rapidash", [Fire], 100, 70, 105, 115, [
      new Moves.Flamethrower(),
      new Moves.Swift(),
      new Moves.HornAttack(),
      new Moves.TakeDown(),
    ]);
  }
}

export class Slowpoke extends PokemonClass {
  constructor() {
    super(79, "Slowpoke", [Water], 65, 65, 15, 140, [
      new Moves.Bubble(),
      new Moves.Confusion(),
      new Moves.Cut(),
      new Moves.Tackle(),
    ]);
  }
}

export class Slowbro extends PokemonClass {
  constructor() {
    super(80, "Slowbro", [Water], 75, 110, 30, 145, [
      new Moves.Surf(),
      new Moves.SkullBash(),
      new Moves.Swift(),
      new Moves.TakeDown(),
    ]);
  }
}

export class Magnemite extends PokemonClass {
  constructor() {
    super(81, "Magnemite", [Electric], 35, 70, 45, 75, [
      new Moves.Tackle(),
      new Moves.QuickAttack(),
      new Moves.ThunderShock(),
      new Moves.Strength(),
    ]);
  }
}

export class Magneton extends PokemonClass {
  constructor() {
    super(82, "Magneton", [Electric], 60, 95, 70, 100, [
      new Moves.TriAttack(),
      new Moves.Thunder(),
      new Moves.Slam(),
      new Moves.Confusion(),
    ]);
  }
}

export class Farfetchd extends PokemonClass {
  constructor() {
    super(83, "Farfetch'd", [Normal, Flying], 65, 55, 60, 102, [
      new Moves.WingAttack(),
      new Moves.Cut(),
      new Moves.Swift(),
      new Moves.Tackle(),
    ]);
  }
}

export class Doduo extends PokemonClass {
  constructor() {
    super(84, "Doduo", [Normal, Flying], 85, 45, 75, 85, [
      new Moves.Gust(),
      new Moves.Tackle(),
      new Moves.Scratch(),
      new Moves.SkullBash(),
    ]);
  }
}

export class Dodrio extends PokemonClass {
  constructor() {
    super(85, "Dodrio", [Normal, Flying], 110, 70, 100, 110, [
      new Moves.TriAttack(),
      new Moves.WingAttack(),
      new Moves.Swift(),
      new Moves.Tackle(),
    ]);
  }
}

export class Seel extends PokemonClass {
  constructor() {
    super(86, "Seel", [Water, Ice], 45, 55, 45, 115, [
      new Moves.WaterGun(),
      new Moves.TakeDown(),
      new Moves.Scratch(),
      new Moves.Slam(),
    ]);
  }
}

export class Dewgong extends PokemonClass {
  constructor() {
    super(87, "Dewgong", [Water, Ice], 70, 80, 70, 140, [
      new Moves.BodySlam(),
      new Moves.AuroraBeam(),
      new Moves.Swift(),
      new Moves.Bubble(),
    ]);
  }
}

export class Grimer extends PokemonClass {
  constructor() {
    super(88, "Grimer", [Poison], 80, 50, 25, 130, [
      new Moves.Smog(),
      new Moves.Lick(),
      new Moves.Scratch(),
      new Moves.Tackle(),
    ]);
  }
}

export class Muk extends PokemonClass {
  constructor() {
    super(89, "Muk", [Poison], 105, 75, 50, 165, [
      new Moves.Sludge(),
      new Moves.SkullBash(),
      new Moves.SeismicToss(),
      new Moves.Pound(),
    ]);
  }
}

export class Shellder extends PokemonClass {
  constructor() {
    super(90, "Shellder", [Water], 65, 100, 40, 80, [
      new Moves.QuickAttack(),
      new Moves.Bubble(),
      new Moves.Cut(),
      new Moves.Lick(),
    ]);
  }
}

export class Cloyster extends PokemonClass {
  constructor() {
    super(91, "Cloyster", [Water], 95, 180, 70, 100, [
      new Moves.WaterGun(),
      new Moves.HornAttack(),
      new Moves.Swift(),
      new Moves.ViseGrip(),
    ]);
  }
}

export class Gastly extends PokemonClass {
  constructor() {
    super(92, "Gastly", [Ghost], 35, 30, 80, 80, [
      new Moves.Smog(),
      new Moves.Lick(),
      new Moves.Ember(),
      new Moves.Swift(),
    ]);
  }
}

export class Haunter extends PokemonClass {
  constructor() {
    super(93, "Haunter", [Ghost], 50, 45, 95, 95, [
      new Moves.Acid(),
      new Moves.Confusion(),
      new Moves.QuickAttack(),
      new Moves.Cut(),
    ]);
  }
}

export class Gengar extends PokemonClass {
  constructor() {
    super(94, "Gengar", [Ghost], 65, 60, 110, 110, [
      new Moves.Flamethrower(),
      new Moves.Acid(),
      new Moves.Slam(),
      new Moves.Tackle(),
    ]);
  }
}

export class Onix extends PokemonClass {
  constructor() {
    super(95, "Onix", [Rock, Ground], 45, 160, 70, 85, [
      new Moves.Earthquake(),
      new Moves.RockSlide(),
      new Moves.TakeDown(),
      new Moves.Tackle(),
    ]);
  }
}

export class Drowzee extends PokemonClass {
  constructor() {
    super(96, "Drowzee", [Psychic], 48, 45, 42, 110, [
      new Moves.Psybeam(),
      new Moves.Cut(),
      new Moves.Swift(),
      new Moves.QuickAttack(),
    ]);
  }
}

export class Hypno extends PokemonClass {
  constructor() {
    super(97, "Hypno", [Psychic], 73, 70, 67, 85, [
      new Moves.Confusion(),
      new Moves.SkullBash(),
      new Moves.Tackle(),
      new Moves.Scratch(),
    ]);
  }
}

export class Krabby extends PokemonClass {
  constructor() {
    super(98, "Krabby", [Water], 105, 90, 50, 80, [
      new Moves.Bubble(),
      new Moves.Cut(),
      new Moves.ViseGrip(),
      new Moves.Headbutt(),
    ]);
  }
}

export class Kingler extends PokemonClass {
  constructor() {
    super(99, "Kingler", [Water], 130, 115, 75, 105, [
      new Moves.Crabhammer(),
      new Moves.TakeDown(),
      new Moves.Surf(),
      new Moves.Swift(),
    ]);
  }
}

export class Voltorb extends PokemonClass {
  constructor() {
    super(100, "Voltorb", [Electric], 30, 50, 100, 90, [
      new Moves.Thunderbolt(),
      new Moves.Swift(),
      new Moves.Tackle(),
      new Moves.QuickAttack(),
    ]);
  }
}

export class Electrode extends PokemonClass {
  constructor() {
    super(101, "Electrode", [Electric], 50, 70, 140, 110, [
      new Moves.Thunder(),
      new Moves.SkullBash(),
      new Moves.Slam(),
      new Moves.SeismicToss(),
    ]);
  }
}

export class Exeggcute extends PokemonClass {
  constructor() {
    super(102, "Exeggcute", [Grass, Psychic], 40, 80, 40, 110, [
      new Moves.Twineedle(),
      new Moves.Confusion(),
      new Moves.Swift(),
      new Moves.Tackle(),
    ]);
  }
}

export class Exeggutor extends PokemonClass {
  constructor() {
    super(103, "Exeggutor", [Grass, Psychic], 95, 85, 55, 145, [
      new Moves.RazorLeaf(),
      new Moves.Psybeam(),
      new Moves.BodySlam(),
      new Moves.Slash(),
    ]);
  }
}

export class Cubone extends PokemonClass {
  constructor() {
    super(104, "Cubone", [Ground], 50, 95, 35, 100, [
      new Moves.Bonemerang(),
      new Moves.SeismicToss(),
      new Moves.Tackle(),
      new Moves.Swift(),
    ]);
  }
}

export class Marowak extends PokemonClass {
  constructor() {
    super(105, "Marowak", [Ground], 80, 95, 45, 110, [
      new Moves.BoneClub(),
      new Moves.MegaKick(),
      new Moves.Pound(),
      new Moves.SkullBash(),
    ]);
  }
}

export class Hitmonlee extends PokemonClass {
  constructor() {
    super(106, "Hitmonlee", [Fighting], 120, 53, 87, 100, [
      new Moves.LowKick(),
      new Moves.HighJumpKick(),
      new Moves.Tackle(),
      new Moves.QuickAttack(),
    ]);
  }
}

export class Hitmonchan extends PokemonClass {
  constructor() {
    super(107, "Hitmonchan", [Fighting], 105, 79, 76, 100, [
      new Moves.KarateChop(),
      new Moves.MegaPunch(),
      new Moves.FirePunch(),
      new Moves.TakeDown(),
    ]);
  }
}

export class Lickitung extends PokemonClass {
  constructor() {
    super(108, "Lickitung", [Normal], 55, 75, 30, 140, [
      new Moves.Lick(),
      new Moves.Pound(),
      new Moves.Swift(),
      new Moves.SkullBash(),
    ]);
  }
}

export class Koffing extends PokemonClass {
  constructor() {
    super(109, "Koffing", [Poison], 65, 95, 35, 90, [
      new Moves.Acid(),
      new Moves.Tackle(),
      new Moves.Ember(),
      new Moves.Headbutt(),
    ]);
  }
}

export class Weezing extends PokemonClass {
  constructor() {
    super(110, "Weezing", [Poison], 90, 120, 60, 115, [
      new Moves.Smog(),
      new Moves.Flamethrower(),
      new Moves.Lick(),
      new Moves.Slam(),
    ]);
  }
}

export class Rhyhorn extends PokemonClass {
  constructor() {
    super(111, "Rhyhorn", [Ground, Rock], 85, 95, 25, 130, [
      new Moves.Peck(),
      new Moves.RockSlide(),
      new Moves.BodySlam(),
      new Moves.Tackle(),
    ]);
  }
}

export class Rhydon extends PokemonClass {
  constructor() {
    super(112, "Rhydon", [Ground, Rock], 130, 120, 40, 165, [
      new Moves.HornAttack(),
      new Moves.TakeDown(),
      new Moves.Earthquake(),
      new Moves.Swift(),
    ]);
  }
}

export class Chansey extends PokemonClass {
  constructor() {
    super(113, "Chansey", [Normal], 5, 5, 50, 300, [
      new Moves.EggBomb(),
      new Moves.TakeDown(),
      new Moves.Swift(),
      new Moves.SkullBash(),
    ]);
  }
}

export class Tangela extends PokemonClass {
  constructor() {
    super(114, "Tangela", [Grass], 55, 115, 60, 115, [
      new Moves.VineWhip(),
      new Moves.ViseGrip(),
      new Moves.TakeDown(),
      new Moves.QuickAttack(),
    ]);
  }
}

export class Kangaskhan extends PokemonClass {
  constructor() {
    super(115, "Kangaskhan", [Normal], 95, 80, 90, 165, [
      new Moves.BodySlam(),
      new Moves.HyperBeam(),
      new Moves.TakeDown(),
      new Moves.ThunderPunch(),
    ]);
  }
}

export class Horsea extends PokemonClass {
  constructor() {
    super(116, "Horsea", [Water], 40, 70, 60, 80, [
      new Moves.Bubble(),
      new Moves.WaterGun(),
      new Moves.QuickAttack(),
      new Moves.Swift(),
    ]);
  }
}

export class Seadra extends PokemonClass {
  constructor() {
    super(117, "Seadra", [Water], 65, 95, 85, 105, [
      new Moves.HydroPump(),
      new Moves.HyperBeam(),
      new Moves.Tackle(),
      new Moves.Cut(),
    ]);
  }
}

export class Goldeen extends PokemonClass {
  constructor() {
    super(118, "Goldeen", [Water], 67, 60, 63, 95, [
      new Moves.Bubble(),
      new Moves.Peck(),
      new Moves.QuickAttack(),
      new Moves.Scratch(),
    ]);
  }
}

export class Seaking extends PokemonClass {
  constructor() {
    super(119, "Seaking", [Water], 92, 65, 68, 130, [
      new Moves.HornAttack(),
      new Moves.Surf(),
      new Moves.Swift(),
      new Moves.Tackle(),
    ]);
  }
}

export class Staryu extends PokemonClass {
  constructor() {
    super(120, "Staryu", [Water], 45, 55, 85, 80, [
      new Moves.Swift(),
      new Moves.Tackle(),
      new Moves.Bubble(),
      new Moves.QuickAttack(),
    ]);
  }
}

export class Starmie extends PokemonClass {
  constructor() {
    super(121, "Starmie", [Water], 75, 85, 115, 110, [
      new Moves.Surf(),
      new Moves.Swift(),
      new Moves.Slam(),
      new Moves.Confusion(),
    ]);
  }
}

export class MrMime extends PokemonClass {
  constructor() {
    super(122, "Mr. Mime", [Psychic], 45, 65, 90, 90, [
      new Moves.Psybeam(),
      new Moves.Swift(),
      new Moves.IcePunch(),
      new Moves.Tackle(),
    ]);
  }
}

export class Scyther extends PokemonClass {
  constructor() {
    super(123, "Scyther", [Bug, Flying], 110, 80, 105, 120, [
      new Moves.WingAttack(),
      new Moves.TakeDown(),
      new Moves.Twineedle(),
      new Moves.Tackle(),
    ]);
  }
}

export class Jynx extends PokemonClass {
  constructor() {
    super(124, "Jynx", [Ice, Psychic], 50, 35, 95, 115, [
      new Moves.Blizzard(),
      new Moves.FirePunch(),
      new Moves.Swift(),
      new Moves.Slam(),
    ]);
  }
}

export class Electabuzz extends PokemonClass {
  constructor() {
    super(125, "Electabuzz", [Electric], 83, 57, 105, 115, [
      new Moves.Thunderbolt(),
      new Moves.Thunder(),
      new Moves.MegaPunch(),
      new Moves.QuickAttack(),
    ]);
  }
}

export class Magmar extends PokemonClass {
  constructor() {
    super(126, "Magmar", [Fire], 95, 57, 93, 115, [
      new Moves.Flamethrower(),
      new Moves.FireBlast(),
      new Moves.SkullBash(),
      new Moves.Swift(),
    ]);
  }
}

export class Pinsir extends PokemonClass {
  constructor() {
    super(127, "Pinsir", [Bug], 125, 100, 85, 115, [
      new Moves.Guillotine(),
      new Moves.Twineedle(),
      new Moves.ViseGrip(),
      new Moves.Tackle(),
    ]);
  }
}

export class Tauros extends PokemonClass {
  constructor() {
    super(128, "Tauros", [Normal], 100, 95, 110, 125, [
      new Moves.TakeDown(),
      new Moves.SkullBash(),
      new Moves.SeismicToss(),
      new Moves.Earthquake(),
    ]);
  }
}

export class Magikarp extends PokemonClass {
  constructor() {
    super(129, "Magikarp", [Water], 10, 55, 80, 70, [
      new Moves.Tackle(),
      new Moves.WaterGun(),
      new Moves.QuickAttack(),
      new Moves.Cut(),
    ]);
  }
}

export class Gyarados extends PokemonClass {
  constructor() {
    super(130, "Gyarados", [Water, Flying], 125, 79, 81, 145, [
      new Moves.HydroPump(),
      new Moves.HyperBeam(),
      new Moves.WingAttack(),
      new Moves.Thunderbolt(),
    ]);
  }
}

export class Lapras extends PokemonClass {
  constructor() {
    super(131, "Lapras", [Water, Ice], 85, 80, 60, 180, [
      new Moves.AuroraBeam(),
      new Moves.Surf(),
      new Moves.SkullBash(),
      new Moves.Swift(),
    ]);
  }
}

export class Eevee extends PokemonClass {
  constructor() {
    super(133, "Eevee", [Normal], 55, 50, 55, 105, [
      new Moves.Tackle(),
      new Moves.Swift(),
      new Moves.QuickAttack(),
      new Moves.TakeDown(),
    ]);
  }
}

export class Vaporeon extends PokemonClass {
  constructor() {
    super(134, "Vaporeon", [Water], 65, 60, 65, 180, [
      new Moves.Surf(),
      new Moves.TakeDown(),
      new Moves.Swift(),
      new Moves.RollingKick(),
    ]);
  }
}

export class Jolteon extends PokemonClass {
  constructor() {
    super(135, "Jolteon", [Electric], 65, 60, 130, 105, [
      new Moves.QuickAttack(),
      new Moves.Thunderbolt(),
      new Moves.JumpKick(),
      new Moves.Tackle(),
    ]);
  }
}

export class Flareon extends PokemonClass {
  constructor() {
    super(136, "Flareon", [Fire], 130, 60, 65, 115, [
      new Moves.Flamethrower(),
      new Moves.TakeDown(),
      new Moves.Slam(),
      new Moves.Pound(),
    ]);
  }
}

export class Porygon extends PokemonClass {
  constructor() {
    super(137, "Porygon", [Normal], 60, 70, 40, 115, [
      new Moves.HyperBeam(),
      new Moves.TriAttack(),
      new Moves.ThunderShock(),
      new Moves.Swift(),
    ]);
  }
}

export class Omanyte extends PokemonClass {
  constructor() {
    super(138, "Omanyte", [Rock, Water], 40, 100, 35, 85, [
      new Moves.Bubble(),
      new Moves.RockThrow(),
      new Moves.Tackle(),
      new Moves.Cut(),
    ]);
  }
}

export class Omastar extends PokemonClass {
  constructor() {
    super(139, "Omastar", [Rock, Water], 60, 125, 55, 120, [
      new Moves.Surf(),
      new Moves.TakeDown(),
      new Moves.RockSlide(),
      new Moves.Swift(),
    ]);
  }
}

export class Kabuto extends PokemonClass {
  constructor() {
    super(140, "Kabuto", [Rock, Water], 80, 90, 55, 80, [
      new Moves.Bubble(),
      new Moves.RockThrow(),
      new Moves.Tackle(),
      new Moves.Cut(),
    ]);
  }
}

export class Kabutops extends PokemonClass {
  constructor() {
    super(141, "Kabutops", [Rock, Water], 115, 105, 80, 110, [
      new Moves.Surf(),
      new Moves.TakeDown(),
      new Moves.RockSlide(),
      new Moves.Swift(),
    ]);
  }
}

export class Aerodactyl extends PokemonClass {
  constructor() {
    super(142, "Aerodactyl", [Rock, Flying], 105, 65, 130, 130, [
      new Moves.RockSlide(),
      new Moves.WingAttack(),
      new Moves.TakeDown(),
      new Moves.Swift(),
    ]);
  }
}

export class Snorlax extends PokemonClass {
  constructor() {
    super(143, "Snorlax", [Normal], 110, 65, 30, 210, [
      new Moves.Headbutt(),
      new Moves.FirePunch(),
      new Moves.MegaPunch(),
      new Moves.Surf(),
    ]);
  }
}

export class Articuno extends PokemonClass {
  constructor() {
    super(144, "Articuno", [Ice, Flying], 85, 100, 85, 140, [
      new Moves.Blizzard(),
      new Moves.AuroraBeam(),
      new Moves.Gust(),
      new Moves.Peck(),
    ]);
  }
}

export class Zapdos extends PokemonClass {
  constructor() {
    super(145, "Zapdos", [Electric, Flying], 90, 85, 100, 140, [
      new Moves.DrillPeck(),
      new Moves.Thunder(),
      new Moves.QuickAttack(),
      new Moves.RazorWind(),
    ]);
  }
}

export class Moltres extends PokemonClass {
  constructor() {
    super(146, "Moltres", [Fire, Flying], 100, 90, 90, 140, [
      new Moves.Flamethrower(),
      new Moves.FireBlast(),
      new Moves.Peck(),
      new Moves.TakeDown(),
    ]);
  }
}

export class Dratini extends PokemonClass {
  constructor() {
    super(147, "Dratini", [Dragon], 64, 45, 50, 91, [
      new Moves.Tackle(),
      new Moves.Headbutt(),
      new Moves.WaterGun(),
      new Moves.QuickAttack(),
    ]);
  }
}

export class Dragonair extends PokemonClass {
  constructor() {
    super(147, "Dragonair", [Dragon], 84, 65, 70, 111, [
      new Moves.SkullBash(),
      new Moves.Swift(),
      new Moves.Flamethrower(),
      new Moves.Slam(),
    ]);
  }
}

export class Dragonite extends PokemonClass {
  constructor() {
    super(149, "Dragonite", [Dragon, Flying], 134, 95, 80, 141, [
      new Moves.AuroraBeam(),
      new Moves.Thunder(),
      new Moves.TakeDown(),
      new Moves.BodySlam(),
    ]);
  }
}

export class Mewtwo extends PokemonClass {
  constructor() {
    super(150, "Mewtwo", [Psychic], 110, 90, 130, 156, [
      new Moves.Confusion(),
      new Moves.MegaPunch(),
      new Moves.HyperBeam(),
      new Moves.LowKick(),
    ]);
  }
}

export class Mew extends PokemonClass {
  constructor() {
    super(151, "Mew", [Psychic], 100, 100, 100, 150, [
      new Moves.Psybeam(),
      new Moves.Surf(),
      new Moves.Thunderbolt(),
      new Moves.Earthquake(),
    ]);
  }
}
