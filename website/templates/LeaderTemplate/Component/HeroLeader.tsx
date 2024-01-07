import Link from "next/link";
import GridImages from "./GridImages";

const HeroLeader = () => {
  return (
    <div className="w-full h-screen max-w-screen-xl mx-auto flex flex-col lg:flex-row-reverse relative z-0 justify-center items-center">
      <div className="h-1/2 lg:h-full flex justify-center items-center w-3/4 md:w-3/4 lg:w-1/2">
        <GridImages />
      </div>

      <div className="w-full sm:w-2/3 lg:w-1/2 flex flex-col items-center justify-center px-4">
        <div className="rounded-xl p-4 backdrop-blur-sm md:bg-inherit md:filter-none">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-popR font-extralight text-center">
            Inviting
            <span className="text-[#FF4266] font-baiSb"> Top 1% </span>
            <br className="hidden lg:block" />
            fitness influencers
          </h1>
          <p className="text-white/60  text-base md:text-xl lg:text-2xl font-popR text-center my-4">
            to make 100M women fitter in India
          </p>
        </div>

        <div className="w-full max-w-[280px] mx-auto my-6">
          <Link passHref href={`https://jyd2yygo.paperform.co/`}>
            <div className="flex justify-center w-full bg-white border font-baiSb text-center border-white/10 rounded-full px-4 py-3 text-black">
              Apply Now
            </div>
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-[#212C4A] lg:hidden" />
    </div>
  );
};

export default HeroLeader;
