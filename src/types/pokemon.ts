import { Ability } from "./ability";
import { Sprites } from "./sprites";

export interface Pokemon {
  abilities: Ability[];
  height: number;
  weight: number;
  name: string;
  sprites: Sprites;
  types: { slot: number; type: { name: string; url: string } }[];
}

export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}
