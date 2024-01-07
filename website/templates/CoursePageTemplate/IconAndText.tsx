import LevelsIcon, { LevelsTypes } from "@constants/icons/LevelsIcon";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";

interface Props {
  imgUrl?: CloudinaryMedia | AWSMedia | string;
  resizeModeCover?: boolean;
  text?: string;
  level?: LevelsTypes;
}

const IconAndText: React.FC<Props> = ({
  imgUrl,
  text,
  resizeModeCover,
  level,
}) => {
  return (
    <div className="flex flex-row justify-center items-center p-2">
      {level ? (
        <div className="w-4 aspect-1">
          <LevelsIcon level={level} />
        </div>
      ) : imgUrl ? (
        <>
          {typeof imgUrl === "string" ? (
            <img
              src={imgUrl}
              className="w-4 aspect-1 object-contain"
              alt="icon image"
            />
          ) : (
            <div className="w-4 sm:w-5 aspect-1">
              <MediaTile
                media={imgUrl}
                alt="icon image"
                width={16}
                height={16}
              />
            </div>
          )}
        </>
      ) : null}

      <p
        className="text-[#FFFFFF] text-xs sm:text-base pl-2 w-full lg:w-max"
        style={{ fontFamily: "BaiJamjuree-Regular" }}
      >
        {text}
      </p>
    </div>
  );
};

export default IconAndText;
