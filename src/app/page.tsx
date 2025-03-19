import { Skeleton } from "@/components/ui/skeleton";
import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";
import Pokedex from "./_components/Pokedex";

interface HomeProps {
  searchParams: Promise<{
    page: number;
  }>;
}

const Home = async (props: HomeProps) => {
  const searchedPage = (await props.searchParams).page;
  const page: number = searchedPage ? parseInt(searchedPage.toString()) : 1;

  if (isNaN(page) || page < 1) {
    redirect("/?page=1", RedirectType.replace);
  }
  return (
    <div>
      <Suspense fallback={<Skeleton className="h-full w-full" />}>
        <Pokedex page={page} />
      </Suspense>
    </div>
  );
};

export default Home;
