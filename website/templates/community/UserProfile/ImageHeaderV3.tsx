import {
  AWSMedia,
  // cloudinaryBaseURL,
  CloudinaryMedia,
} from "@models/Media/cloudinaryUpload";
import { formatWithCommas } from "@utils/number";
import LevelModal from "@templates/community/UserProfile/LevelModal";
import CirclePercent from "@components/CirclePercent";
import { getAspriant } from "@utils/aspriant";
import { useState } from "react";
import { getURLToFetch } from "@templates/listing/HeaderImage/utils";
import { getFitPointsLeft, getLevelIcon } from "./utils";

interface Props {
  img?: CloudinaryMedia | AWSMedia;
  name?: string;
  description?: string;
  // isCoach?: boolean;
  // canEdit?: boolean;
  //   editUID: string;
  // phone?: string;
  // viewerIsCoach?: boolean;
  //   communityKey?: string;
  // totalCalories?: number;
  // regularityScore?: number;
  //   userLev?: userLevel;
  //   progress?: number;
  fitPoints?: number;
  level?: number;
  progress?: number;
  activeFitPointsV2?: number;
  //   userKey
}

const ImageHeaderV3: React.FC<Props> = ({
  img,
  name,
  //   canEdit,
  //   editUID,
  //   phone,
  //   isCoach,
  //   viewerIsCoach,
  //   communityKey,
  //   totalCalories,
  //   regularityScore,
  description,
  activeFitPointsV2,
  //   userLev,
  //   progress,
  fitPoints,
  level,
  progress,
}) => {
  const userLavelData = getAspriant(level ? level : 0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <>
      <LevelModal
        isOpen={isVisible}
        onBackdrop={() => setIsVisible(false)}
        onButtonPress={() => setIsVisible(false)}
        onCloseModal={() => setIsVisible(false)}
        percent={Math.round(progress ? progress * 100 : 0)}
        level={level}
        fitPoints={getFitPointsLeft(activeFitPointsV2)}
      />

      <div className="p-4 bg-gradient-to-t from-[#E6E6F1]">
        <div className="grid grid-cols-2 place-items-center">
          <CirclePercent
            circleSize={80}
            percent={progress ? progress * 100 : 0}
            color={{
              colorPrimary: userLavelData.colorPrimary,
              colorSecondary: userLavelData.colorSecondary,
            }}
          >
            <img
              className="w-full h-full object-cover rounded-full p-[10%]"
              src={
                img
                  ? getURLToFetch(img, 400, 400, false)
                  : `https://avatars.dicebear.com/api/initials/${name}.svg`
                // img
                //   ? `${cloudinaryBaseURL}/${img.resource_type}/upload/w_400,h_400,c_fill/${img.public_id}.jpg`
                //   : `https://avatars.dicebear.com/api/initials/${name}.svg`
              }
            />
          </CirclePercent>
          <div
            className="w-40 h-14 flex flex-col justify-center items-center text-white rounded-lg cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${userLavelData.colorPrimary}, ${userLavelData.colorAdditional}, ${userLavelData.colorSecondary})`,
            }}
            onClick={() => setIsVisible(true)}
          >
            <p className="text-sm leading-none">Lvl {level ? level : 0}</p>
            <p className=" text-lg leading-none">{userLavelData.aspirant}</p>
          </div>
          <div className="flex flex-wrap justify-center opacity-[.76] text-3xl capitalize max-w-max p-2">
            {name?.split(" ").map((ele, index) => {
              let tmp = ele;
              if (ele.length > 12) {
                tmp = `${ele[0]}.`;
              }
              if (index) {
                return <span key={index}>{tmp}&nbsp;</span>;
              }
              return (
                <span key={index} className="font-bold">
                  {tmp}&nbsp;
                </span>
              );
            })}
          </div>
          <div className="flex justify-center items-center font-bold max-w-max text-3xl p-2">
            <img
              className="pr-2 opacity-[.76] pb-0.5"
              src={getLevelIcon(level ? level : 0, "w-20")}
              // src="https://img.icons8.com/small/16/000000/share-2.png"
            />
            <p
              className="bg-clip-text text-transparent"
              style={{
                background: `-webkit-linear-gradient(left, ${userLavelData.colorPrimary}, ${userLavelData.colorSecondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {`${
                activeFitPointsV2
                  ? formatWithCommas(Math.round(activeFitPointsV2))
                  : "0"
              } FP`}
            </p>
          </div>
        </div>
        {description ? (
          <div className="opacity-[.76] p-4">
            {description.length < 100 ? (
              description
            ) : (
              <>
                {showMore ? description : `${description.substring(0, 75)}...`}
                <button
                  className="text-blue-500"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Show less" : "Show more"}
                </button>
              </>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ImageHeaderV3;
