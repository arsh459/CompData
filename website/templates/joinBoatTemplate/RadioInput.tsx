import Button from "@components/button";
// import clsx from "clsx";
// import { useEffect, useState } from "react";
// import { TextField } from "@mui/material";
import ImgButton from "./ImgButton";

export interface SelectItem {
  key: string;
  text: string;
  heading: string;
  img?: string;
}

interface Props {
  heading: string;
  helperText: string;
  value?: string | undefined;
  values?: { [key: string]: boolean };
  onValueChange: (newVal: string) => void;
  buttonText: string;
  onButtonPress: () => void;
  items: SelectItem[];
  //   multiline?: boolean;
  //   placeholder: string;
  //   warning?: boolean;
  //   inputMode: "text" | "numeric" | "email";
  leftButtonText?: string;
  leftButtonOnPress?: () => void;
}

const RadioInput: React.FC<Props> = ({
  heading,
  helperText,
  value,
  onValueChange,
  buttonText,
  items,
  onButtonPress,
  values,
  //   multiline,
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
        <div className="flex flex-wrap justify-start pb-2">
          {items.map((item) => {
            return (
              <div
                key={item.key}
                onClick={() => onValueChange(item.key)}
                className="pr-2 pb-2 cursor-pointer"
              >
                <ImgButton
                  heading={item.heading}
                  selected={
                    value
                      ? value === item.key
                      : values
                      ? values[item.key]
                      : false
                  }
                  text={item.text}
                  img={item.img}
                />
              </div>
            );
          })}
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

export default RadioInput;
