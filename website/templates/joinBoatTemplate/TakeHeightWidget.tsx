import Button from "@components/button";
// import clsx from "clsx";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

interface Props {
  heading: string;
  helperText: string;
  value: number | undefined;
  // onValueChange: (newVal: number) => void;
  buttonText: string;
  onButtonPress: () => void;
  onUpdateHeight: (ht: number, inch: number) => void;
  //   multiline?: boolean;
  //   placeholder: string;
  //   warning?: boolean;
  //   inputMode: "text" | "numeric" | "email";
  leftButtonText?: string;
  leftButtonOnPress?: () => void;
}

const TakeHeightWidget: React.FC<Props> = ({
  heading,
  helperText,
  value,
  // onValueChange,
  buttonText,
  onButtonPress,
  //   multiline,
  //   placeholder,
  //   warning,
  children,
  //   inputMode,
  leftButtonText,
  onUpdateHeight,
  leftButtonOnPress,
}) => {
  const [initialised, setInitialised] = useState<boolean>(false);
  const [heightInFeet, setHeightInFeet] = useState<number>(5);
  const [heightInInch, setHeightInch] = useState<number>(11);

  useEffect(() => {
    // console.log("here");
    onUpdateHeight(heightInFeet, heightInInch);
  }, [heightInFeet, heightInInch, onUpdateHeight]);

  useEffect(() => {
    if (value && !initialised) {
      const dInTotal = value / 2.54;
      const dFt = Math.floor(dInTotal / 12);
      const dIn = dInTotal - dFt * 12;

      setHeightInFeet(dFt);
      setHeightInch(dIn);
      setInitialised(true);
    }
  }, [value, initialised]);

  return (
    <div className="">
      <div className="pb-4">
        <div className="pb-4">
          <p className="text-4xl text-gray-600 font-medium">{heading}</p>
        </div>
        {children}
        <div className="flex justify-start pb-2">
          <div className="w-1/3 flex">
            {/* <input
              inputMode="numeric"
              value={heightInFeet ? heightInFeet : 0}
              onChange={(e) =>
                setHeightInFeet(Number.parseFloat(e.target.value))
              }
              autoFocus={true}
              placeholder={"ft"}
              className={clsx(
                "focus:outline-none  rounded-lg placeholder-gray-400",
                "text-gray-600 text-3xl font-light",
                "bg-transparent",
                "w-full"
              )}
            /> */}
            <TextField
              style={{ width: "100%" }}
              inputProps={{ style: { fontSize: 22 } }} // font size of input text
              variant="standard"
              label={"feet"}
              onChange={(e) =>
                setHeightInFeet(Number.parseFloat(e.target.value))
              }
              value={heightInFeet ? heightInFeet : 0}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="w-1/3 pl-4">
            <TextField
              style={{ width: "100%" }}
              inputProps={{ style: { fontSize: 22 } }} // font size of input text
              variant="standard"
              label={"inches"}
              value={heightInInch ? heightInInch : 0}
              onChange={(e) => setHeightInch(Number.parseFloat(e.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
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

export default TakeHeightWidget;
