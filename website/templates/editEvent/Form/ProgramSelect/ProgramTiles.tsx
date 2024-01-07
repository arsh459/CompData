import { eventTypes } from "@models/Event/Event";
import clsx from "clsx";
import { programTypes } from "./constants";

interface Props {
  selected: eventTypes;
  onClick: (newValue: eventTypes) => void;
}

const ProgramTiles: React.FC<Props> = ({ selected, onClick }) => {
  return (
    <div className="flex flex-wrap space-x-4">
      {programTypes.map((pType) => {
        return (
          <div
            onClick={() => onClick(pType.value)}
            key={pType.value}
            className={clsx(
              "cursor-pointer",
              "p-4 bg-white shadow-md hover:shadow-lg rounded-xl w-36",
              selected === pType.value
                ? "border-4 border-blue-500"
                : "border-4 border-gray-400"
            )}
          >
            <p className="text-gray-700 font-semibold">{pType.heading}</p>
            <p className="text-gray-500 text-sm">{pType.helperText}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProgramTiles;
