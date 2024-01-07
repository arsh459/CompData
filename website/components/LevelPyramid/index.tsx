import {
  POINTS_LEVEL_FIVE,
  POINTS_LEVEL_FOUR,
  POINTS_LEVEL_ONE,
  POINTS_LEVEL_THREE,
  POINTS_LEVEL_TWO,
} from "@constants/gameStats";
import { baseImageKit, fPointsBlack } from "@constants/icons/iconURLs";
import { formatWithCommas } from "@utils/number";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

interface Props {
  level: number;
}

const LevelPyramid: React.FC<Props> = ({ level }) => {
  const [active, setActive] = useState<number>(level);
  const [aspirant, setAspirant] = useState<string>("Beginner");
  const [fitpoints, setFitpoints] = useState<number>(0);
  const activeClass =
    "flex-1 flex flex-col justify-center items-center max-h-40";

  const getData = (lvl: number) => {
    switch (lvl) {
      case 1:
        return {
          aspirant: "Enthusiast",
          fitpoints: POINTS_LEVEL_ONE,
        };
      case 2:
        return {
          aspirant: "Aspirant",
          fitpoints: POINTS_LEVEL_TWO,
        };
      case 3:
        return {
          aspirant: "Local Athlete",
          fitpoints: POINTS_LEVEL_THREE,
        };
      case 4:
        return {
          aspirant: "Athlete",
          fitpoints: POINTS_LEVEL_FOUR,
        };
      case 5:
        return {
          aspirant: "Olympian",
          fitpoints: POINTS_LEVEL_FIVE,
        };
      default:
        return {
          aspirant: "Beginner",
          fitpoints: 0,
        };
    }
  };

  const toolTip = () => (
    <div
      className={clsx(
        "text-center whitespace-nowrap leading-tight",
        "flex flex-col justify-center items-center"
      )}
    >
      <div className="text-sm leading-none">Lvl {active}</div>
      <div>{aspirant}</div>
      <div className="flex justify-center items-center">
        <img
          className="pr-2"
          src={`${baseImageKit}/tr:w-16,c-maintain_ratio/${fPointsBlack}`}
        />
        <p className="tracking-wide font-bold opacity-[.76]">
          {formatWithCommas(Math.round(fitpoints))}FP
        </p>
      </div>
    </div>
  );

  useEffect(() => {
    const data = getData(active);
    setAspirant(data.aspirant);
    setFitpoints(data.fitpoints);
  }, [active]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div
        className={clsx("opacity-0", active === 5 && activeClass)}
        onClick={() => setActive(5)}
        style={{ animation: "stack 250ms linear 500ms forwards" }}
      >
        {active === 5 && toolTip()}
        <svg
          width="63"
          height="50"
          viewBox="0 0 85 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-1 cursor-pointer"
        >
          <path
            d="M39.6395 2.23744C41.2263 -0.209886 44.8145 -0.190717 46.3751 2.27343L84.1115 61.8598C85.7981 64.5231 83.8846 68 80.7322 68H4.36083C1.18913 68 -0.720932 64.4851 1.00458 61.8239L39.6395 2.23744Z"
            fill="#8745FF"
          />
        </svg>
      </div>
      <div
        className={clsx("opacity-0", active === 4 && activeClass)}
        onClick={() => setActive(4)}
        style={{ animation: "stack 250ms linear 750ms forwards" }}
      >
        {active === 4 && toolTip()}
        <svg
          width="83"
          height="14"
          viewBox="0 0 118 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-1 cursor-pointer"
        >
          <path
            d="M7.2956 2.46807C8.19349 0.939084 9.834 0 11.6071 0H106.655C108.373 0 109.971 0.882632 110.887 2.33725L117.179 12.3373C119.274 15.6669 116.881 20 112.947 20H5.73465C1.86921 20 -0.534295 15.8013 1.42312 12.4681L7.2956 2.46807Z"
            fill="#D74559"
          />
        </svg>
      </div>
      <div
        className={clsx("opacity-0", active === 3 && activeClass)}
        onClick={() => setActive(3)}
        style={{ animation: "stack 250ms linear 1000ms forwards" }}
      >
        {active === 3 && toolTip()}
        <svg
          width="113"
          height="18"
          viewBox="0 0 152 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-1 cursor-pointer"
        >
          <path
            d="M10.472 2.35769C11.3847 0.891398 12.9896 0 14.7168 0H137.318C138.989 0 140.55 0.835165 141.478 2.22569L150.815 16.2257C153.031 19.5484 150.649 24 146.655 24H6.002C2.07889 24 -0.316005 19.6882 1.75721 16.3577L10.472 2.35769Z"
            fill="#F19B38"
          />
        </svg>
      </div>
      <div
        className={clsx("opacity-0", active === 2 && activeClass)}
        onClick={() => setActive(2)}
        style={{ animation: "stack 250ms linear 1250ms forwards" }}
      >
        {active === 2 && toolTip()}
        <svg
          width="149"
          height="26"
          viewBox="0 0 200 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-1 cursor-pointer"
        >
          <path
            d="M16.6285 2.33049C17.5445 0.879742 19.1404 0 20.8562 0H178.334C180.019 0 181.59 0.848378 182.514 2.25689L198.919 27.2569C201.101 30.5819 198.716 35 194.739 35H5.07048C1.13295 35 -1.25951 30.6599 0.842748 27.3305L16.6285 2.33049Z"
            fill="#CCDB2C"
          />
        </svg>
      </div>
      <div
        className={clsx("opacity-0", active === 1 && activeClass)}
        onClick={() => setActive(1)}
        style={{ animation: "stack 250ms linear 1500ms forwards" }}
      >
        {active === 1 && toolTip()}
        <svg
          width="193"
          height="36"
          viewBox="0 0 258 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-1 cursor-pointer"
        >
          <path
            d="M20.8211 3.48758C22.0734 1.32877 24.3803 0 26.876 0H231.124C233.62 0 235.927 1.32877 237.179 3.48758L256.902 37.4876C259.609 42.1542 256.242 48 250.847 48H7.1531C1.75812 48 -1.60895 42.1542 1.09811 37.4876L20.8211 3.48758Z"
            fill="#61C5D9"
          />
        </svg>
      </div>
      {/* <div
                className={clsx("opacity-0", active === 0 && activeClass)}
                onClick={() => setActive(0)}
                 style={{ animation: "stack 250ms linear 1750ms forwards" }}
            >
                {active === 0 && toolTip()}
                <svg
                    width="242"
                    height="42"
                    viewBox="0 0 325 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-1 cursor-pointer"
                >
                    <path
                        d="M27.7511 3.30489C29.0285 1.24973 31.2766 0 33.6964 0H291.304C293.723 0 295.972 1.24973 297.249 3.30489L323.353 45.3049C326.251 49.9678 322.898 56 317.407 56H7.5925C2.10232 56 -1.25088 49.9678 1.64724 45.3049L27.7511 3.30489Z"
                        fill="#61D9B1"
                    />
                </svg>
            </div> */}
    </div>
  );
};

export default LevelPyramid;
