import clsx from "clsx";
import React from "react";
interface Props {
  width: number;
  backGround: string;
  bgEmptyColor: string;
  height?: string;
  padding?: string;
  pill?: string;
}

const ProgressBarDynamic: React.FC<Props> = ({
  width,
  backGround,
  bgEmptyColor,
  height,
  padding,
  pill,
}) => {
  return (
    <div
      className={clsx(
        "rounded-full  flex items-center ",
        height ? height : "h-2",
        padding ? padding : "p-px ",
        pill && "pt-0 pb-0 pl-0"
      )}
      style={{ backgroundColor: bgEmptyColor }}
    >
      <div
        className="rounded-full h-full"
        style={{
          width: `${width}%`,
          backgroundColor: backGround,
        }}
      />
    </div>
  );
};

export default ProgressBarDynamic;
