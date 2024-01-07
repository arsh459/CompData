import { userLevel } from "@models/LeaderBoard/Leaderboard";
import {
  AWSMedia,
  // cloudinaryBaseURL,
  CloudinaryMedia,
} from "@models/Media/cloudinaryUpload";
import { getURLToFetch } from "@templates/listing/HeaderImage/utils";
// import { capitalize } from "@mui/material";
import ProfileImg from "@templates/profile/ProfileHeader/ProfileImg";
import { formatWithCommas } from "@utils/number";
import KPIText from "./KPIText";
// import LinearProgress from "@mui/material/LinearProgress";
// import LinearProgressWithLabel from "./LinearProgressBar";
import ProfileButtons from "./ProfileButtons/ProfileButtons";

interface Props {
  img?: CloudinaryMedia | AWSMedia;
  name?: string;
  isCoach?: boolean;
  canEdit?: boolean;
  editUID: string;
  phone?: string;
  viewerIsCoach?: boolean;
  communityKey?: string;
  totalCalories?: number;
  regularityScore?: number;
  userLev?: userLevel;
  progress?: number;
  //   userKey
}

const ImageHeader: React.FC<Props> = ({
  img,
  name,
  canEdit,
  editUID,
  phone,
  isCoach,
  viewerIsCoach,
  communityKey,
  totalCalories,
  regularityScore,
  userLev,
  progress,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex">
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
        <div className="px-4 w-full">
          <p className="text-2xl font-semibold text-gray-700">{name}</p>
          <div className="flex pt-2">
            <div className="pr-10">
              <KPIText
                label="Cals"
                value={`${
                  totalCalories
                    ? formatWithCommas(Math.round(totalCalories))
                    : "-"
                }`}
              />
            </div>
            <KPIText
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

      <div className="pt-4">
        <ProfileButtons
          number={phone}
          isCoach={isCoach}
          canEdit={canEdit}
          editUID={editUID}
          viewerIsCoach={viewerIsCoach}
          communityKey={communityKey}
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

export default ImageHeader;
