import { BodyTypeData } from "@constants/Avatar/BodyTypeData";
import { getEvolutionFitpoints } from "@constants/Avatar/utils";
import {
  customBodyScanIcon,
  customWorkoutIcon,
} from "@constants/icons/iconURLs";
import { LocalUser } from "@models/User/User";
import TransformationView from "./TransformationView";

interface Props {
  localUser: LocalUser | undefined;
}

const ResolutionDetail: React.FC<Props> = ({ localUser }) => {
  return (
    <div className="flex-1 p-4">
      <p className="text-transparent bg-clip-text font-baib bg-gradient-to-r from-[#48FFDE] via-[#48AFFF] to-[#9E71FF] text-base iphoneX:text-xl">
        {`${
          localUser?.name ? localUser.name : "User"
        }, your resolution for 2023 should be`}
      </p>

      <TransformationView user={localUser}>
        <div className="flex flex-row justify-between items-center bg-[#2B2B3A] rounded-2xl overflow-hidden p-5">
          <p
            className="text-[#F1F1F1] text-sm w-3/5"
            style={{
              fontFamily: "BaiJamjuree-Regular",
            }}
          >
            Your daily target FitPoints
          </p>
          <p
            className="text-white text-center text-xl w-1/3"
            style={{
              fontFamily: "BaiJamjuree-Bold",
            }}
          >
            {`${
              localUser?.difficulty
                ? getEvolutionFitpoints(localUser.difficulty)
                : 0
            }FP`}
          </p>
        </div>
      </TransformationView>

      <div className="px-2 py-5">
        <p
          className="text-[#F1F1F1] text-lg flex-1 px-1 mb-6"
          style={{
            fontFamily: "BaiJamjuree-Bold",
          }}
        >
          How to achieve goal
        </p>

        {localUser?.desiredBodyType &&
        BodyTypeData[localUser.desiredBodyType].workoutNote ? (
          <div className="flex flex-row justify-between items-center mb-6">
            <img
              src={customBodyScanIcon}
              className="w-1/5 mr-4 aspect-1 object-contain"
              alt="body scan icon"
            />
            <p
              className="text-[#F1F1F1] text-sm flex-1"
              style={{
                fontFamily: "BaiJamjuree-Regular",
              }}
            >
              {BodyTypeData[localUser.desiredBodyType].workoutNote}
            </p>
          </div>
        ) : null}

        <div className="flex flex-row justify-between items-center mb-6">
          <img
            src={customWorkoutIcon}
            className="w-1/5 mr-4 aspect-1 object-contain"
            alt="workout icon"
          />
          <p
            className="text-[#F1F1F1] text-sm w-4/5"
            style={{
              fontFamily: "BaiJamjuree-Regular",
            }}
          >
            Try finishing the daily FP target by tracking steps, following our
            workout programs and diet plans.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResolutionDetail;
