import MediaCard from "@components/MediaCard";
import { Badge } from "@models/Prizes/PrizeV2";

interface Props {
  badge: Badge;
}

const CourseBadge: React.FC<Props> = ({ badge }) => {
  return (
    <div className="w-screen h-screen max-w-screen-lg mx-auto flex flex-col justify-center items-center">
      <h2 className="w-full sm:text-center text-white text-3xl sm:text-4xl lg:text-5xl px-5 font-qsSB">
        Badge you can win
      </h2>
      <div className="w-12 aspect-1" />
      <div className="flex justify-center items-center gap-4 px-4">
        <div className="w-1/3 aspect-1 object-contain">
          <MediaCard media={badge.badgeImage} objectString="object-contain" />
        </div>
        <div className="w-2/3 sm:w-1/2 lg:w-1/3 flex flex-col justify-center gap-3">
          <h6 className="text-white text-xl sm:text-2xl lg:text-3xl font-medium font-nunitoB">
            {badge.name}
          </h6>
          <p className="text-white/80 text-sm md:text-xl font-popR">
            {badge.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseBadge;
