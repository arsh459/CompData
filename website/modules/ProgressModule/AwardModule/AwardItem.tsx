import { Achiever, Award } from "@models/awards/interface";
// import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { format } from "date-fns";

interface Props {
  award: Award;
  achiever: Achiever;
}

const AwardItem: React.FC<Props> = ({ award, achiever }) => {
  //   const now = Date.now();
  const {
    // id,
    title: achieverTitle,
    // unlockOn: wonOn,
    awardStatus,
    // startTime: unlockedOn,
    // endTime: expiresOn,
  } = achiever;

  //   const isExpired = expiresOn && expiresOn <= now && !wonOn ? true : false;

  // console.log("wonOn", wonOn, achieverTitle);
  //   const isUnlocked = wonOn || (unlockedOn && unlockedOn <= now) ? true : false;
  const media = awardStatus === "WON" ? award?.img : award?.lockedImg;
  const currentProgress = achiever.progress;

  let hits: number = 0;
  if (awardStatus === "WON") {
  } else if (awardStatus === "EXPIRED") {
  } else if (currentProgress) {
    hits = Object.values(currentProgress).filter(
      (item) => item.tickStatus === "HIT"
    ).length;
  }

  return (
    <div className="p-4">
      {media ? (
        <MediaTile
          alt={award.name ? award.name : "award"}
          width={400}
          height={400}
          objectString="contain"
          widthString="w-full"
          media={media}
        />
      ) : null}
      <p className="text-center text-sm font-medium pt-2">{achieverTitle}</p>
      <p className="text-center text-xs">
        {achiever.subtitle}
        {hits ? ` | ${hits} done` : ""}
      </p>
      {achiever.targetMonth ? (
        <p className="text-xs text-gray-500 text-center">
          {format(new Date(achiever.targetMonth), "dd MMM yy")}
        </p>
      ) : null}
    </div>
  );
};

export default AwardItem;
