import MoreText from "@components/MoreText/MoreText";
import {
  AWSMedia,
  // cloudinaryBaseURL,
  CloudinaryMedia,
} from "@models/Media/cloudinaryUpload";
import { getURLToFetch } from "@templates/listing/HeaderImage/utils";
import ProfileImg from "@templates/profile/ProfileHeader/ProfileImg";
import { formatWithCommas } from "@utils/number";
import KPITextV2 from "./KPITextV2";
import NameLabel from "./NameLabel";
import ProfileButtonsV2 from "./ProfileButtons/ProfileButtonsV2";

interface Props {
  img?: CloudinaryMedia | AWSMedia;
  name?: string;
  description?: string;
  isCoach?: boolean;
  canEdit?: boolean;
  //   editUID: string;
  phone?: string;
  viewerIsCoach?: boolean;
  //   communityKey?: string;
  totalCalories?: number;
  regularityScore?: number;
  //   userLev?: userLevel;
  //   progress?: number;

  fitPoints?: number;
  level?: number;
  isAdmin?: boolean;
  //   userKey
}

const ImageHeaderV2: React.FC<Props> = ({
  img,
  name,
  canEdit,
  //   editUID,
  phone,
  isCoach,
  viewerIsCoach,
  //   communityKey,
  totalCalories,
  regularityScore,
  description,
  isAdmin,
  //   userLev,
  //   progress,

  fitPoints,
  level,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex items-center">
        {img ? (
          <div className="flex-none">
            <ProfileImg
              live={true}
              size="lg"
              onClickURL=""
              imgUrl={getURLToFetch(img, 400, 400)}
              // imgUrl={`${cloudinaryBaseURL}/${img.resource_type}/upload/w_400,h_400,c_fill/${img.path}`}
              selected={true}
            />
          </div>
        ) : (
          <div className="flex-none">
            <ProfileImg
              live={true}
              size="lg"
              onClickURL=""
              imgUrl={`https://avatars.dicebear.com/api/initials/${name}.svg`}
              selected={false}
            />
          </div>
        )}

        <div className="flex justify-between w-full">
          <div className="pl-4">
            <KPITextV2
              label="Points"
              value={`${
                fitPoints ? formatWithCommas(Math.round(fitPoints)) : "0"
              }`}
            />
          </div>
          <div className="">
            <KPITextV2
              label="Cals"
              value={`${
                totalCalories
                  ? formatWithCommas(Math.round(totalCalories))
                  : "0"
              }`}
            />
          </div>
          <div className="">
            <KPITextV2
              label="Streak"
              value={`${
                regularityScore
                  ? `${Math.round(regularityScore * 1000) / 10}%`
                  : "-"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="pt-2">
        <div className="pb-2">
          <NameLabel name={name} level={level ? level : 0} />
        </div>
        {description ? <MoreText text={description} numChars={120} /> : null}
      </div>
      <div className="flex">
        <div className="px-4 w-full"></div>
      </div>

      <div className="pt-4">
        <ProfileButtonsV2
          number={phone}
          isCoach={isCoach}
          canEdit={canEdit}
          isAdmin={isAdmin}
          viewerIsCoach={viewerIsCoach}
        />
      </div>

      {/* <div className="pt-2">
        <div className="w-full">
          <LinearProgressWithLabel
            variant="determinate"
            value={
              progress && progress > 0 ? Math.round(progress * 1000) / 10 : 0
            }
            label={capitalize(userLev ? userLev : "")}
          />
        </div>
      </div> */}
    </div>
  );
};

export default ImageHeaderV2;
