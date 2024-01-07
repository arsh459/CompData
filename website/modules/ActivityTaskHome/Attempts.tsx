import HexaPercentIcon from "@components/SvgIcons/HexaPercentIcon";
import { Activity } from "@models/Activities/Activity";
import { format } from "date-fns";
import { calculateFPFromCalories } from "./utils";

interface Props {
  activity: Activity;
  taskFP: number;
  index: number;
  total: number;
}
const Attempts: React.FC<Props> = ({ activity, taskFP, index, total }) => {
  const fpAward = calculateFPFromCalories(activity.calories);

  return (
    <div className="flex-1 flex flex-row  justify-between max-w-xs font-nunitoB items-center bg-[#FFFFFF40] rounded-2xl p-4">
      <div className="flex flex-col justify-center items-center">
        <p className="text-sm text-white">
          {format(activity.updatedOn, "do LLLL")}
        </p>
        <p className="text-xs text-white/80 font-popR">{`${
          total - index
        } attempt`}</p>
      </div>

      <div className="flex flex-row justify-between items-center">
        <div className="w-8 h-8 relative">
          <HexaPercentIcon />
          <div className="w-full h-full absolute inset-0 flex justify-center items-center">
            <img
              src={`https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,f-auto/Frame_1432_mILSIgxCi.png?updatedAt=1680331692444`}
              className="w-1/2 aspect-1"
            />
          </div>
        </div>

        <p className="text-3xl text-white ml-3">{`${fpAward}/${taskFP}`}</p>
      </div>
    </div>
  );
};

export default Attempts;
