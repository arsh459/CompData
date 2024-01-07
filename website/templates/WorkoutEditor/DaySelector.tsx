// import Button from "@components/button";
import { capitalize } from "@mui/material";
import Tile from "@templates/community/Program/RedirectSection/Tile";
import { days } from "@templates/community/Program/WorkoutSeriesHolder/constants";
import clsx from "clsx";
import EditorLayout from "./EditorLayout";

// import clsx from "clsx";

interface Props {
  heading: string;
  leftButtonText?: string;
  leftButtonOnPress?: () => void;
  buttonText: string;
  onButtonPress: () => void;
  helperText: string;
  selDays: number[];
  onDaysUpdate: (newD: number) => void;
  // onDayRemove: (newD: number) => void;
}

const DaySelector: React.FC<Props> = ({
  heading,
  leftButtonText,
  leftButtonOnPress,
  buttonText,
  onButtonPress,
  helperText,
  selDays,
  onDaysUpdate,
  // onDayRemove,
}) => {
  // console.log("sel", selDays);
  return (
    <EditorLayout
      heading={heading}
      leftButtonOnPress={leftButtonOnPress}
      helperText={helperText}
      buttonText={buttonText}
      onButtonPress={onButtonPress}
      leftButtonText={leftButtonText}
    >
      <div className="flex flex-wrap bg-gray-100">
        {days.map((item) => {
          return (
            <div
              onClick={() => onDaysUpdate(item.dN)}
              key={item.key}
              className={clsx(
                selDays.includes(item.dN)
                  ? "border-2 border-blue-500 rounded-lg"
                  : "border rounded-lg",
                "w-1/3 mr-4 mb-4 cursor-pointer"
              )}
            >
              <Tile text={capitalize(item.key)} subtitle="" key={item.key} />
            </div>
          );
        })}
      </div>
    </EditorLayout>
  );
};

export default DaySelector;
