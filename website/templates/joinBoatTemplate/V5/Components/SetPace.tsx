import { LocalUser } from "@models/User/User";
import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
interface Props {
  localUser?: LocalUser | undefined;
  onNumberFieldsUpdate: (val: number, level: difficulty) => void;
}

const SetPace: React.FC<Props> = ({ localUser, onNumberFieldsUpdate }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    getIntialValue(localUser)
  );

  const { sliderData, diff } = getPaceTime(
    localUser?.weight,
    localUser?.desiredWeight
  );

  useEffect(() => {
    if (sliderData[selectedIndex]) {
      onNumberFieldsUpdate(
        sliderData[selectedIndex].time,
        sliderData[selectedIndex].label
      );
      const thimb = document.querySelector(
        ".MuiSlider-thumb"
      ) as HTMLDivElement;
      if (thimb) {
        thimb.style.backgroundColor = sliderData[selectedIndex].color;
      }
    }
  }, [selectedIndex]);

  const onValueChange = (valueList: number | number[]) => {
    let elem: number = 0;
    if (typeof valueList === "number") {
      elem = valueList;
    } else if (valueList.length) {
      elem = valueList[0];
    }

    const sliderComp = sliderData[elem];
    if (sliderComp) {
      // onNumberFieldsUpdate(sliderData[elem].time, sliderData[elem].label);
      setSelectedIndex(elem);
    }

    const test = document.querySelector(".MuiSlider-thumb") as HTMLDivElement;
    if (test) {
      test.style.backgroundColor = sliderData[elem].color;
    }
  };

  // console.log("sli", sliderData, selectedIndex, getIntialValue(localUser));

  return (
    <div className="h-full flex flex-col justify-around items-center">
      <div className="w-3/4 flex flex-row justify-between items-center">
        <div className="flex flex-col justify-center items-center">
          <p
            className="text-[#F1F1F1] text-[10px] iphoneX:text-xs"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            Current weight
          </p>
          <p
            className="text-[#F1F1F1] text-xl iphoneX:text-2xl"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {localUser?.weight}
          </p>
        </div>

        <img
          src="https://ik.imagekit.io/socialboat/Component_48_z2qabrZ-x.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666093402160"
          alt=""
          className="w-6 iphoneX:w-8 aspect-1 object-contain"
        />
        <div className="flex flex-col justify-center items-center">
          <p
            className="text-[#F1F1F1] text-[10px] iphoneX:text-xs"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            Desired weight
          </p>
          <p
            className="text-[#F1F1F1] text-xl iphoneX:text-2xl"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {localUser?.desiredWeight}
          </p>
        </div>
      </div>
      {diff === 0 ? (
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-transparent bg-clip-text text-xl text-center font-baib bg-gradient-to-r from-[#72FFA2] to-[#66BEFF]">
            You are all Set. Maintain your fitness with us
          </p>
          <div className="h-20" />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <p
            className="text-[#737373] text-base iphoneX:text-lg"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            My Goal will be completed in
          </p>
          {sliderData[selectedIndex] ? (
            <div className="w-4/5 font-baib flex flex-col justify-center items-center bg-[#262630] rounded-full py-2.5 my-2">
              <p
                className="text-xl iphoneX:text-2xl"
                style={{
                  color: sliderData[selectedIndex]
                    ? sliderData[selectedIndex].color
                    : "#51FF8C",
                }}
              >
                {diff === 1
                  ? "less than 1 Month"
                  : `${sliderData[selectedIndex].time} ${
                      sliderData[selectedIndex].time <= 1 ? "Month" : "Months"
                    }`}
              </p>
            </div>
          ) : null}
        </div>
      )}
      {diff > 1 ? (
        <div className="w-4/5 relative z-0 paceSlider">
          <Slider
            aria-label="Temperature"
            defaultValue={selectedIndex}
            step={1}
            marks
            min={0}
            max={sliderData.length - 1}
            value={selectedIndex}
            onChange={(_, value) => onValueChange(value)}
          />
          <span
            className="text-base font-baib absolute top-full left-0 -translate-x-1/2"
            style={{
              color: sliderData[0].color,
            }}
          >
            {sliderData[0].label}
          </span>
          <span
            className="text-base font-baib absolute top-full right-0 translate-x-1/2"
            style={{
              color: sliderData[sliderData.length - 1].color,
            }}
          >
            {sliderData[sliderData.length - 1].label}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default SetPace;

const getIntialValue = (localUser?: LocalUser) => {
  const current = localUser?.weight ? localUser.weight : 0;
  const desired = localUser?.desiredWeight ? localUser.desiredWeight : 0;

  const diff =
    current - desired >= 0 ? current - desired : (current - desired) * -1;

  // console.log("diff", diff, localUser.paceOfAchievementInMonth);

  if (localUser?.paceOfAchievementInMonth) {
    switch (Math.round(diff / localUser.paceOfAchievementInMonth)) {
      case 4:
        return 3;
      case 3:
        return 2;
      case 2:
        return 1;
      default:
        return 0;
    }
  } else {
    return 0;
  }
};

const getColor = (i: number) => {
  return i === 1
    ? "#51FF8C"
    : i === 2
    ? "#E7FF51"
    : i === 3
    ? "#FF8F51"
    : "#FF5970";
};

export type difficulty = "Easy" | "Medium" | "Not Easy" | "Hard";

const getLabel = (i: number) => {
  return i === 1 ? "Easy" : i === 2 ? "Medium" : i === 3 ? "Not Easy" : "Hard";
};

const getPaceTime = (currentU?: number, desiredU?: number) => {
  const current = currentU ? currentU : 0;
  const desired = desiredU ? desiredU : 0;

  const diff =
    current - desired >= 0 ? current - desired : (current - desired) * -1;

  const sliderDataTmp: {
    index: number;
    color: string;
    time: number;
    label: difficulty;
  }[] = [];

  for (let i: number = 1; i <= 4; i++) {
    sliderDataTmp.push({
      index: i,
      color: getColor(i),
      time: Math.floor(diff / i),
      label: getLabel(i),
    });

    if (Math.floor(diff / i) <= 1) {
      break;
    }
  }

  return {
    diff,
    sliderData: sliderDataTmp,
  };
};
