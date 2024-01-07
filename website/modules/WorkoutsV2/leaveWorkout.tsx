import FireIcon from "../../public/icons/FireIcon";
// import CloseIcon from "../../public/icons/CloseIcon";
// import { SelectedWorkout } from "pages/workoutV2";
import TopClose from "@templates/community/Program/Feed/TopClose";
import Divider from "@components/divider/Divider";

interface Props {
  // selectedWorkout: SelectedWorkout;
  // onLeaveWorkoutFn: any;
  onBack: () => void;
  points: number;
  onLeave: () => void;
}

const LeaveWorkout: React.FC<Props> = ({
  // selectedWorkout,
  // onLeaveWorkoutFn,
  onLeave,
  onBack,
  points,
}) => {
  return (
    <div className="px-4 py-4">
      <div className="pb-2 cursor-pointer">
        <TopClose onCloseModal={onBack} />
      </div>
      <div>
        <Divider />
      </div>

      {/* <div className="font-bold text-right p-4 pb-0">
        <span
          className="inline-block"
          onClick={() => onBack("inprogress_workout")}
        >
          <CloseIcon style={{}} />
        </span>
      </div> */}

      <div className="font-bold text-center text-2xl px-6 py-2">
        Are you sure you want to leave ?
      </div>
      <div className="text-center">
        <span className="inline-block animate-pulse">
          <FireIcon style={null} />
        </span>
      </div>
      <div className="font-normal text-gray-600 text-center text-xl mb-4 px-6">
        You will miss the opportunity to burn {points} points.
      </div>
      <div className="flex justify-center pb-2 text-xl">
        <button
          className="border border-orange-600 py-2 px-4 mr-4 text-orange-600 font-bold"
          onClick={onLeave}
        >
          Leave Live
        </button>
        <button
          className="border border-orange-600 py-2 px-4 bg-orange-600 text-white font-bold"
          onClick={onBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default LeaveWorkout;
