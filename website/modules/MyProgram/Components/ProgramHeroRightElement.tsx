import { exploreAllWorkoutImg } from "@constants/icons/iconURLs";
import Link from "next/link";

const ProgramHeroRightElement = () => {
  return (
    <Link
      href={`/explore`}
      className="group flex-1 h-full shadow border-4 rounded-[28px] overflow-hidden border-white border-opacity-30 cursor-pointer"
    >
      <div className="relative z-0 w-full h-full bg-gradient-to-b from-[#946FFF] via-[#C556FF] to-[#FF53CF] flex flex-col">
        <div className="flex-1 flex justify-center items-center p-6">
          <p className="font-canelaL text-2xl sm:text-3xl lg:text-5xl text-white/70 leading-[1.15em]">
            Want to
            <span className="font-popSB text-white"> Explore </span>
            All our
            <span className="font-popSB text-white"> Workouts </span>
          </p>
        </div>
        <img
          src={exploreAllWorkoutImg}
          className="w-full object-contain"
          alt="want to explore all"
        />
        <div className="absolute left-0 right-0 bottom-2 lg:bottom-8 h-12 lg:h-16 flex justify-center items-center">
          <div className="w-2/3 bg-white/80 rounded-full p-4 backdrop-blur shadow relative z-0 scale-75 lg:scale-100">
            <div className="bg-white absolute inset-0 -z-10 rounded-full group-hover:blur" />
            <p className="text-center text-black/80 font-popM text-base">
              Explore All Workout
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProgramHeroRightElement;
