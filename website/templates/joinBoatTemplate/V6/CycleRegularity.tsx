import { CycleRegularityTypes } from "@models/User/User";
import clsx from "clsx";

interface Props {
  cycleRegularity?: CycleRegularityTypes;
  onNext: (val: CycleRegularityTypes) => void;
}

const CycleRegularity: React.FC<Props> = ({ cycleRegularity, onNext }) => {
  return (
    <div className="grid p-4 gap-4">
      <button
        onClick={() => onNext("CAN_PREDICT")}
        className="rounded-2xl p-4"
        style={{
          backgroundColor:
            cycleRegularity === "CAN_PREDICT" ? "#FFFFFF" : "#343150",
        }}
      >
        <p
          className={clsx(
            cycleRegularity === "CAN_PREDICT"
              ? "text-[#232136]"
              : "text-[#3EE778]",
            "text-base text-center  "
          )}
          style={{ fontFamily: "Nunito-Bold" }}
        >
          I can predict my period
        </p>
      </button>
      <button
        onClick={() => onNext("CHANGES")}
        className="rounded-2xl p-4"
        style={{
          backgroundColor:
            cycleRegularity === "CHANGES" ? "#FFFFFF" : "#343150",
        }}
      >
        <p
          className={clsx(
            cycleRegularity === "CHANGES" ? "text-[#232136]" : "text-[#E7A33E]",
            "text-base text-center"
          )}
          style={{ fontFamily: "Nunito-Bold" }}
        >
          My period date fluctuates alot
        </p>
      </button>
    </div>
  );
};

export default CycleRegularity;
