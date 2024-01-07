import clsx from "clsx";
import GridGifs from "./GridGifs";
import HeroDetails from "./HeroDetails";

const Hero = () => {
  return (
    <div className="w-screen h-screen md:h-max relative">
      <div
        className={clsx(
          "w-full h-full max-w-screen-xl mx-auto py-8 md:px-8",
          "flex md:justify-center items-center flex-wrap-reverse md:flex-nowrap"
        )}
      >
        <div
          className={clsx(
            "absolute inset-0 z-10 py-8 md:hidden",
            "bg-gradient-to-t from-[#111111] via-[#111111]/90"
          )}
        />
        <div
          className={clsx(
            "flex-1 md:flex-[0.5] flex-col items-center justify-center",
            "absolute left-0 right-0 bottom-0 z-20 py-8 md:static"
            // "bg-gradient-to-t from-[#111111] via-[#111111] md:bg-none"
          )}
        >
          <HeroDetails />
        </div>
        <div className="md:w-8" />
        <GridGifs />
      </div>
    </div>
  );
};

export default Hero;
