import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import UserImage from "@templates/listing/Header/UserImage";
import clsx from "clsx";

interface Props {
  media?: CloudinaryMedia | AWSMedia;
  createdByString: string;
  primaryText?: string;
  secondaryText?: string;
  primarySubText?: string;
  goalOrEquipment?: string;
}

const CreatedByCoach: React.FC<Props> = ({
  createdByString,
  media,
  primaryText,
  secondaryText,
  primarySubText,
  goalOrEquipment,
}) => {
  return (
    <div className="bg-black/30 p-4 rounded-2xl">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div
            className={clsx("w-8 aspect-1 bg-[#FF5970] p-px rounded-full mr-4")}
          >
            <UserImage image={media} boxWidth="w-full" boxHeight="h-full" />
          </div>
          <p className="text-[#E2E2E2] text-xs iphoneX:text-sm font-sans">
            {createdByString}
          </p>
        </div>
        <p className="text-[#21A5FF] text-xs  font-sans">{primarySubText}</p>
      </div>
      {primaryText ? (
        <p className="text-white/60 text-xs  font-sans pt-3">{primaryText}</p>
      ) : null}

      {secondaryText ? (
        <p className="text-[#E2E2E2] text-sm font-sans pt-4 pb-2.5">
          <p className="font-bold">
            {goalOrEquipment ? goalOrEquipment : "Goal: "}
          </p>
          {secondaryText}
        </p>
      ) : null}
    </div>
  );
};

export default CreatedByCoach;
