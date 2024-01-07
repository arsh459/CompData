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

const GetStartedV2: React.FC<Props> = ({ localUser }) => {
  return (
    <div className="flex-1 h-full">
      <p className="text-transparent text-2xl bg-clip-text font-baib bg-gradient-to-r from-[#48FFDE] via-[#48AFFF] to-[#9E71FF] font-black">
        {`${
          localUser?.name ? localUser.name : "User"
        }, your resolution for 2023 should be`}
      </p>

      <TransformationView user={localUser}>
        <div className="flex flex-row justify-between items-center bg-[#2B2B3A] rounded-2xl overflow-hidden p-5">
          <h5
            className="text-[#F1F1F1] text-sm w-3/5"
            style={{
              fontFamily: "BaiJamjuree-Regular",
            }}
          >
            Your daily target FitPoints
          </h5>
          <h5
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
          </h5>
        </div>
      </TransformationView>

      <div className="px-2 py-5">
        <h5
          className="text-[#F1F1F1] text-lg flex-1 px-1 mb-6"
          style={{
            fontFamily: "BaiJamjuree-Bold",
          }}
        >
          How to achieve goal
        </h5>

        {localUser?.desiredBodyType &&
        BodyTypeData[localUser.desiredBodyType].workoutNote ? (
          <div className="flex flex-row justify-between items-center mb-6">
            <img
              src={customBodyScanIcon}
              className="w-1/5 mr-4 aspect-1 object-contain"
              alt="custom body scan icon"
            />
            <h5
              className="text-[#F1F1F1] text-sm flex-1"
              style={{
                fontFamily: "BaiJamjuree-Regular",
              }}
            >
              {BodyTypeData[localUser.desiredBodyType].workoutNote}
            </h5>
          </div>
        ) : null}

        <div className="flex flex-row justify-between items-center mb-6">
          <img
            src={customWorkoutIcon}
            className="w-1/5 mr-4 aspect-1 object-contain"
            alt="custom workout icon"
          />
          <h5
            className="text-[#F1F1F1] text-sm w-4/5"
            style={{
              fontFamily: "BaiJamjuree-Regular",
            }}
          >
            Try finishing the daily FP target by tracking steps, following our
            workout programs and diet plans.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default GetStartedV2;
