import CirclePercentV2 from "@components/CirclePercent/CirclePercentV2";
import clsx from "clsx";
import { calculateFPFromProgress } from "./hooks/useTaskStream";

interface Props {
  taskFp: number;
  fpProgress: number;
  tone: "light" | "dark";
}

const FPProgress: React.FC<Props> = ({ taskFp, fpProgress, tone }) => {
  const color = tone === "light" ? "#7756FF" : "#9980FF";

  const { fpAward, visibleProgress } = calculateFPFromProgress(
    fpProgress,
    taskFp
  );

  // console.log("fpAward", fpAward, taskFp, visibleProgress);

  return (
    <div
      className={clsx(
        tone === "light"
          ? "bg-white border-[#261D4F]/5"
          : "bg-[#261D4F] border-white/5",
        "absolute z-10 top-8 right-8",
        "border rounded-2xl p-3"
      )}
    >
      <CirclePercentV2
        circleSize={80}
        strokeWidthNum={10}
        percent={visibleProgress}
        inactiveColor={`${color}4D`}
        activeColor={color}
      >
        <div className="flex-1 flex justify-center items-center">
          <p
            style={{
              color: color,
              fontSize: 20,
              fontFamily: "Nunito-Bold",
            }}
          >{`${fpAward}/${taskFp}`}</p>
        </div>
      </CirclePercentV2>
      <div className="flex flex-row justify-center items-center pt-1">
        <img
          src="https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,f-auto/Component_114_vWfhpwTJP.png?updatedAt=1680251638361"
          className="w-5 aspect-1"
          alt="fitpoints icon"
        />
        <div className="flex-1 flex justify-center items-center pl-1">
          <p
            style={{
              color: color,
              fontSize: 14,
              fontFamily: "Nunito-Bold",
            }}
          >
            Fitpoints
          </p>
        </div>
      </div>
    </div>
  );
};

export default FPProgress;
