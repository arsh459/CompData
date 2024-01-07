import MediaCard from "@components/MediaCard";
import { Badge } from "@models/Prizes/PrizeV2";
import Link from "next/link";

interface Props {
  badges: Badge[];
}

const ProgramWeOffer: React.FC<Props> = ({ badges }) => {
  return (
    <div className="w-screen py-28 flex flex-col justify-center items-center">
      <p className="sm:text-center text-3xl sm:text-4xl lg:text-5xl px-8 py-2 font-popM text-center text-transparent bg-clip-text bg-gradient-to-br from-[#B269FF] via-[#E3C6FF] to-[#D45FFF]">
        Fitness Programs <span className="font-popL">we offer</span>
      </p>
      <div className="w-screen overflow-y-hidden overflow-x-scroll scrollbar-hide grid grid-flow-col gap-8 my-12">
        <div className="w-[calc(calc(100vw-1024px)/2)] inline-block" />
        {badges.map((each) => (
          <Link key={each.id} href={`/course/${each.slug}`}>
            <div className="w-80 sm:w-72 lg:w-96 flex flex-col bg-[#00000045] backdrop-blur-xl border border-white/30 rounded-3xl overflow-hidden ">
              <div className="w-full aspect-2 overflow-hidden rounded-t-[20px] rounded-b">
                <MediaCard
                  media={each.bgImageFemale}
                  HWClassStr="w-full h-full"
                />
              </div>
              <div className="p-3">
                <h3 className=" text-base sm:text-lg font-qsB">{each.name}</h3>
                <p className="text-white/80 text-xs sm:text-sm lg:text-base line-clamp-1 font-popL">
                  {each.description ? each.description : " "}
                </p>
              </div>
            </div>
          </Link>
        ))}
        <div className="w-[calc(calc(100vw-1024px)/2)] inline-block" />
      </div>
    </div>
  );
};

export default ProgramWeOffer;
