import AutoplaySpriteCarousel from "@/app/pokemon/[pokemonName]/_components/AutoplaySpriteCarousel";
import StatLine from "@/app/pokemon/[pokemonName]/_components/StatLine";
import TypeBadge from "@/app/pokemon/[pokemonName]/_components/TypeBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { firstLetterUppercase } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";

interface PokemonPageProps {
  params: Promise<{
    pokemonName: string;
  }>;
}

const PokemonPage = async (props: PokemonPageProps) => {
  const params = await props.params;
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`
  );
  const pokemon: Pokemon = await data.json();

  const sprites: [string, string][] = [];

  Object.keys(pokemon.sprites).forEach((sprite) => {
    if (
      typeof pokemon.sprites[sprite as keyof typeof pokemon.sprites] ===
      "string"
    ) {
      sprites.push([
        sprite,
        pokemon.sprites[sprite as keyof typeof pokemon.sprites],
      ]);
    }
  });

  const base_sprites = sprites
    .filter((sprite) => sprite[0].match(/_default$/))
    .reverse();

  const base_shiny_sprites = sprites
    .filter((sprite) => sprite[0].match(/_shiny$/))
    .reverse();

  return (
    <div className="w-screen flex justify-center items-center">
      <Card className="w-fit h-fit">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Pokemon: {firstLetterUppercase(pokemon.name)}</CardTitle>
            <div className="flex gap-2">
              {pokemon.types.map((type) => (
                <div key={type.type.name}>
                  <TypeBadge url={type.type.url} />
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex">
            <AutoplaySpriteCarousel
              sprites={[...base_sprites, ...base_shiny_sprites]}
            />
            <div className="flex gap-10">
              <div className="flex flex-col">
                <StatLine
                  label="Name"
                  value={firstLetterUppercase(pokemon.name)}
                />
                <StatLine label="Height" value={pokemon.height} unit="m" />
                <StatLine label="Weight" value={pokemon.weight} unit="kg" />
              </div>
              <div className="flex flex-col"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonPage;
