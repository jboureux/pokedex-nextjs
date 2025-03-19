import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { PokemonList } from "@/types/pokemon";
import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";
import PokedexItem from "./PokedexItem";

interface PokedexProps {
  page: number;
}

const Pokedex = async (props: PokedexProps) => {
  const limit = 20;

  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${
      limit * (props.page - 1)
    }&limit=${limit}`
  );

  const pokemons: PokemonList = await data.json();

  if (pokemons.results.length === 0) redirect("/?page=1", RedirectType.replace);

  const maxPage =
    Math.floor(pokemons.count / limit) + (pokemons.count % limit > 0 ? 1 : 0);

  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <div className="w-full grid grid-cols-5 gap-2 mb-10">
        {pokemons.results.map((pokemon) => (
          <Suspense
            key={pokemon.url}
            fallback={<Skeleton className="w-full h-full" />}
          >
            <PokedexItem pokemon={pokemon} />
          </Suspense>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem hidden={props.page - 1 === 0}>
            <PaginationPrevious href={`/?page=${props.page - 1}`} />
          </PaginationItem>
          <PaginationItem hidden={props.page - 3 < 1}>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem hidden={props.page - 2 < 1}>
            <PaginationLink href={`/?page=${props.page - 2}`}>
              {props.page - 2}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem hidden={props.page - 1 < 1}>
            <PaginationLink href={`/?page=${props.page - 1}`}>
              {props.page - 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive href={`/?page=${props.page}`}>
              {props.page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem hidden={props.page + 1 > maxPage}>
            <PaginationLink href={`/?page=${props.page + 1}`}>
              {props.page + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem hidden={props.page + 2 > maxPage}>
            <PaginationLink href={`/?page=${props.page + 2}`}>
              {props.page + 2}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem hidden={props.page + 3 > maxPage}>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem hidden={props.page + 1 > maxPage}>
            <PaginationNext href={`/?page=${props.page + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Pokedex;
