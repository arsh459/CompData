import clsx from "clsx";
import { timeLabel } from "@models/slots/Slot";
import MoonIcon from "@components/SvgIcons/MoonIcon";
import SunIcon from "@components/SvgIcons/SunIcon";

interface Props {
  timePeriod: timeLabel;
  setTimePeriod: (val: timeLabel) => void;
}

const TimeOfTheDay: React.FC<Props> = ({ timePeriod, setTimePeriod }) => {
  return (
    <div
      className={clsx(
        "w-3/4 flex flex-row rounded-xl mx-4 my-5 border border-white"
      )}
    >
      <div
        className="flex-1 rounded-md flex justify-center items-center"
        style={{
          backgroundColor: timePeriod === "Morning" ? "#FFFFFF" : "transparent",
        }}
      >
        <button onClick={() => setTimePeriod("Morning")}>
          <div className="flex flex-row justify-center items-center p-2">
            <div className="w-3.5 aspect-1 mr-3">
              <SunIcon
                color={timePeriod === "Morning" ? "#333333" : "#F1F1F1"}
                opacity={timePeriod === "Morning" ? 1 : 0.7}
              />
            </div>
            <p
              className={clsx(
                "font-bold  capitalize text-sm",
                timePeriod === "Morning" ? "text-[#333333]" : "text-[#F1F1F1B2]"
              )}
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Morning slot
            </p>
          </div>
        </button>
      </div>
      <div
        className={clsx("flex-1 rounded-md flex justify-center items-center")}
        style={{
          backgroundColor: timePeriod === "Evening" ? "#FFFFFF" : "transparent",
        }}
      >
        <button onClick={() => setTimePeriod("Evening")}>
          <div className="flex flex-row justify-center items-center p-2">
            <div className="w-3.5 aspect-1 mr-3">
              <MoonIcon
                color={timePeriod === "Evening" ? "#333333" : "#F1F1F1"}
                opacity={timePeriod === "Evening" ? 1 : 0.7}
              />
            </div>
            <p
              className={clsx(
                "font-bold  capitalize text-sm",
                timePeriod === "Evening" ? "text-[#333333]" : "text-[#F1F1F1B2]"
              )}
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Evening slot
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TimeOfTheDay;
