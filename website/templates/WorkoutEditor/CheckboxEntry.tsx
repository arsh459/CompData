import Button from "@components/button";
// import clsx from "clsx";
import { Checkbox } from "@mui/material";

interface Props {
  heading: string;
  helperText: string;
  value: boolean;
  onChangeValue: (newVal: boolean) => void;
  buttonText: string;
  onButtonPress: () => void;
  //   multiline?: boolean;
  label: string;
  //   warning?: boolean;
  //   inputMode: "text" | "numeric" | "email";
  leftButtonText?: string;
  leftButtonOnPress?: () => void;
}

const CheckboxEntry: React.FC<Props> = ({
  heading,
  helperText,
  value,
  onChangeValue,
  buttonText,
  onButtonPress,
  label,
  //   placeholder,
  //   warning,
  children,
  //   inputMode,
  leftButtonText,
  leftButtonOnPress,
}) => {
  return (
    <div className="">
      <div className="pb-4">
        <div className="pb-4">
          <p className="text-4xl text-gray-600 font-medium">{heading}</p>
        </div>
        {children}

        <div className="flex items-center">
          <Checkbox
            color="primary"
            checked={value}
            onChange={() => onChangeValue(!value)}
          />
          <p className="text-gray-700">{label}</p>
        </div>

        <p className="text-sm text-gray-600 font-light pt-1">{helperText}</p>
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
        <Button type="button" appearance="contained" onClick={onButtonPress}>
          <div className="pl-2 pr-2">
            <p className="capitalize">{buttonText}</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default CheckboxEntry;
