"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface AutoplaySpriteCarouselProps {
  sprites: [string, string][];
}

const AutoplaySpriteCarousel = (props: AutoplaySpriteCarouselProps) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{ loop: true }}
      className="w-[500px]"
    >
      <CarouselContent>
        {props.sprites.map((sprite) => (
          <CarouselItem key={sprite[0]} className="flex justify-center">
            <Image src={sprite[1]} alt={sprite[0]} width={300} height={300} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute top-1/2 left-2 flex items-center justify-center">
        <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0" />
      </div>
      <div className="absolute top-1/2 right-2 flex items-center justify-center">
        <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0" />
      </div>
    </Carousel>
  );
};

export default AutoplaySpriteCarousel;
