import Button from "@components/button";
import { eventTypes } from "@models/Event/Event";
// import clsx from "clsx";
import ProgramTiles from "./ProgramTiles";

interface Props {
  heading: string;
  helperText: string;
  eventType: eventTypes;
  onSelect: (eType: eventTypes) => void;
  //   value: string | number | undefined;
  //   onChangeText: (newVal: string) => void;
  buttonText: string;
  onButtonPress: () => void;
  //   multiline?: boolean;
  //   placeholder: string;
  //   warning?: boolean;
  //   inputMode: "text" | "numeric" | "email";
  leftButtonText?: string;
  leftButtonOnPress?: () => void;
}

const ProgramSelect: React.FC<Props> = ({
  heading,
  helperText,
  eventType,
  onSelect,
  //   value,
  //   onChangeText,
  buttonText,
  onButtonPress,
  //   multiline,
  //   placeholder,
  //   warning,
  children,
  //   inputMode,
  leftButtonText,
  leftButtonOnPress,
}) => {
  return (
    <div>
      <div className="pb-4">
        <div className="pb-4">
          <p className="text-4xl text-gray-600 font-medium">{heading}</p>
        </div>
        <p className="text-sm text-gray-600 font-light pt-1">{helperText}</p>

        <ProgramTiles selected={eventType} onClick={onSelect} />
      </div>
      <div className="flex">
        {leftButtonOnPress && leftButtonText ? (
          <div className="pr-2">
            <Button appearance="control" onClick={leftButtonOnPress}>
              <div className="pl-2 pr-2">
                <p className="capitalize text-gray-700 font-medium">
                  {leftButtonText}
                </p>
              </div>
            </Button>
          </div>
        ) : null}
        <Button appearance="contained" onClick={onButtonPress}>
          <div className="pl-2 pr-2">
            <p className="capitalize">{buttonText}</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ProgramSelect;
