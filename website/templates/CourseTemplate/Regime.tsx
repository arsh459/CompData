import MediaCard from "@components/MediaCard";
import { UserInterface } from "@models/User/User";
import FlameWaveBg from "@templates/WomenTemplate/components/V2/FlameWaveBg";

interface Props {
  otherAuthors?: UserInterface[];
}

const Regime: React.FC<Props> = ({ otherAuthors }) => {
  return otherAuthors && otherAuthors.length ? (
    <div className="w-full h-screen flex flex-col justify-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-popL text-center m-4">
        Designed by Nutritionists, Trainers & Doctors
      </h2>
      <div className="w-full py-8 relative z-0 flex">
        <FlameWaveBg />
        <div className="mx-auto overflow-x-scroll scrollbar-hide grid grid-flow-col auto-cols-[250px] gap-6 px-6">
          {otherAuthors.length > 4 ? <div className="hidden lg:block" /> : null}
          {otherAuthors
            ? otherAuthors.map((author) => (
                <div
                  key={author.uid}
                  className="w-full aspect-[0.8] p-4 pb-0 rounded-3xl bg-[#553CA8B2]/50 backdrop-blur-3xl flex flex-col"
                >
                  <p className="text-2xl font-popR font-normal text-[#FFFFFF]">
                    {author.name}
                  </p>
                  <p className="text-xs font-popR font-light text-[#FFFFFFBF]">
                    {author.knownFor}
                  </p>
                  <div className="flex-1 object-contain">
                    <MediaCard
                      media={author.profileImage}
                      objectString="object-contain"
                    />
                  </div>
                </div>
              ))
            : null}
          {otherAuthors.length > 4 ? <div className="hidden lg:block" /> : null}
        </div>
      </div>
    </div>
  ) : null;
};

export default Regime;
