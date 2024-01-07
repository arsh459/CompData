import { Badge } from "@models/Prizes/PrizeV2";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";

interface Props {
  badge: Badge;
}

const BadgesYouCanWin: React.FC<Props> = ({ badge }) => {
  return (
    <div className="bg-black/30 p-4 rounded-2xl flex items-center">
      <div className="w-1/4 sm:w-1/4 lg:w-1/6 aspect-[79/83]">
        {badge?.badgeImage ? (
          <MediaTile
            media={badge.badgeImage}
            alt="badge image"
            width={80}
            height={80}
          />
        ) : null}
      </div>
      <div className="w-3/4 pl-4 grid gap-2">
        <p
          className="text-xs iphoneX:text-sm text-white"
          style={{
            fontFamily: "BaiJamjuree-SemiBold",
          }}
        >
          {badge?.name}
        </p>
        <p className="text-white/60 text-xs font-sans line-clamp-4">
          {badge?.description}
        </p>
      </div>
    </div>
  );
};

export default BadgesYouCanWin;
