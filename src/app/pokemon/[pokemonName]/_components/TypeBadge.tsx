import { PokemonType } from "@/types/pokemonType";
import Image from "next/image";

interface TypeBadgeProps {
  url: string;
}

const TypeBadge = async (props: TypeBadgeProps) => {
  const data = await fetch(props.url);
  const type: PokemonType = await data.json();

  return (
    <Image
      src={type.sprites["generation-viii"]["legends-arceus"].name_icon}
      alt="type icon"
      height={100}
      width={100}
    />
  );
};

export default TypeBadge;
