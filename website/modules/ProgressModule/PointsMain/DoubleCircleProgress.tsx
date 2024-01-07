import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface DoubleCircleProgressProps {
  progress1?: number;
  progress2?: number;
  progress3?: number;
  color1: string;
  color2: string;
  color3: string;
  inactiveColor1: string;
  inactiveColor2: string;
  inactiveColor3: string;
  centerText?: string;
}

const DoubleCircleProgress: React.FC<DoubleCircleProgressProps> = ({
  progress1,
  progress2,
  progress3,
  color1,
  color2,
  color3,
  inactiveColor1,
  inactiveColor2,
  inactiveColor3,
  centerText,
}) => {
  return (
    <div className="relative w-full h-full">
      {progress1 ? (
        <CircularProgressbar
          value={progress1 ? progress1 * 100 : 0}
          text={progress2 || progress3 ? "" : centerText}
          styles={buildStyles({
            pathColor: color1,
            trailColor: inactiveColor1,
            textColor: "#343434",
          })}
        />
      ) : null}
      <div className="absolute inset-0 m-2   ">
        {progress2 ? (
          <CircularProgressbar
            value={progress2 ? progress2 * 100 : 0}
            text={progress3 ? "" : centerText}
            styles={buildStyles({
              pathColor: color2,
              trailColor: inactiveColor2,
              textColor: "#343434",
              // textSize: 50,
            })}
          />
        ) : null}
        {/* {!progress1 && !progress2 ? (
          <p className="text-xl sm:text-2xl text-center text-[#343434]">
            {centerText}
          </p>
        ) : null} */}
      </div>
      <div className="absolute inset-0 m-4">
        {progress3 ? (
          <CircularProgressbar
            value={progress3 ? progress3 * 100 : 0}
            text={centerText}
            styles={buildStyles({
              pathColor: color3,
              trailColor: inactiveColor3,
              textColor: "#343434",
              textSize: 50,
            })}
          />
        ) : null}
        {!progress1 && !progress2 && !progress3 ? (
          <p className="text-xl sm:text-2xl text-center text-[#343434]">
            {centerText}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default DoubleCircleProgress;
