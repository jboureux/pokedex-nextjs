import { Card, CardContent } from "@/components/ui/card";
import { firstLetterUppercase } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import Link from "next/link";

interface PokedexItemProps {
  pokemon: { name: string; url: string };
}

const PokedexItem = async (props: PokedexItemProps) => {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${props.pokemon.name}`
  );
  const pokemonFullData: Pokemon = await data.json();

  const baseSprite = pokemonFullData.sprites.front_default;

  return (
    <Link href={`/pokemon/${props.pokemon.name}`} className="w-full h-full">
      <Card>
        <CardContent>
          <div className="flex gap-2 items-center">
            <Image
              src={baseSprite}
              height={75}
              width={75}
              alt={`sprite ${props.pokemon.name}`}
            />
            <p>{firstLetterUppercase(props.pokemon.name)}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PokedexItem;
