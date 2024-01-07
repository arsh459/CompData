import { sessionTypes } from "@models/Event/Event";
import clsx from "clsx";

interface Props {
  selectedSession?: sessionTypes;
  onClick: (newType: sessionTypes) => void;
}

const sessions = [
  {
    value: "live" as sessionTypes,
    displayValue: "Live",
    helperText: "On Zoom or Meet",
  },
  {
    value: "ondemand" as sessionTypes,
    displayValue: "Recorded video",
    helperText: "You have to add a recorded video",
  },
  {
    value: "activity" as sessionTypes,
    displayValue: "At home activity",
    helperText: "The student has to finish a task",
  },
];

const TypeSelector: React.FC<Props> = ({ selectedSession, onClick }) => {
  return (
    <div className="flex flex-wrap">
      {sessions.map((item) => {
        return (
          <div
            onClick={() => onClick(item.value)}
            key={item.value}
            className={clsx(
              "p-2 rounded-lg bg-gray-200 w-40 m-2 shadow-sm hover:shadow-md",
              selectedSession === item.value ? "border-2 border-blue-500" : ""
            )}
          >
            <p className="text-gray-700 text-center font-semibold">
              {item.displayValue}
            </p>
            <p className="text-gray-500 text-sm text-center pt-1">
              {item.helperText}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default TypeSelector;
