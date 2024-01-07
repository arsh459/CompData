import { View, Text, Image } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { useEffect, useState } from "react";
import GradientText from "@components/GradientText";
import { LocalUser } from "@hooks/user/useLocalUserV2";

interface Props {
  localUser?: LocalUser | undefined;
  onNumberFieldsUpdate: (val: number, level: difficulty) => void;
}

const SetPace: React.FC<Props> = ({ localUser, onNumberFieldsUpdate }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    getIntialValue(localUser)
  );
  // const [init, setInit] = useState<boolean>(false);

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
      // setInit(true);
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
  };

  return (
    <View className="flex-1 flex justify-around items-center p-4">
      <View className="w-3/4 flex flex-row justify-between items-center">
        <View className="flex justify-center items-center">
          <Text
            className="text-[#F1F1F1] text-[10px] iphoneX:text-xs"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            Current weight
          </Text>
          <Text
            className="text-[#F1F1F1] text-xl iphoneX:text-2xl"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {localUser?.weight}
          </Text>
        </View>
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/Component_48_z2qabrZ-x.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666093402160",
          }}
          className="w-6 iphoneX:w-8 aspect-square"
          resizeMode="contain"
        />
        <View className="flex justify-center items-center">
          <Text
            className="text-[#F1F1F1] text-[10px] iphoneX:text-xs"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            Desired weight
          </Text>
          <Text
            className="text-[#F1F1F1] text-xl iphoneX:text-2xl"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {localUser?.desiredWeight}
          </Text>
        </View>
      </View>
      {diff === 0 ? (
        <View className="w-full flex justify-center items-center">
          <GradientText
            textStyle={{
              fontFamily: "BaiJamjuree-Bold",
              fontSize: 20,
              textAlign: "center",
            }}
            colors={["#72FFA2", "#66BEFF"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            text="You are all Set. Maintain your fitness with us"
          />
          <View className="h-20" />
        </View>
      ) : sliderData[selectedIndex] ? (
        <View className="w-full flex justify-center items-center">
          <Text
            className="text-[#737373] text-base iphoneX:text-lg"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            My Goal will be completed in
          </Text>
          <View className="w-4/5 flex justify-center items-center bg-[#262630] rounded-full py-2.5 my-2">
            <Text
              className="text-xl iphoneX:text-2xl"
              style={{
                fontFamily: "BaiJamjuree-Bold",
                color: sliderData[selectedIndex].color,
              }}
            >
              {diff === 1
                ? "less than 1 Month"
                : `${sliderData[selectedIndex].time} ${
                    sliderData[selectedIndex].time <= 1 ? "Month" : "Months"
                  }`}
            </Text>
          </View>
        </View>
      ) : null}
      {diff > 1 ? (
        <View className="w-4/5">
          <Slider
            value={selectedIndex}
            minimumValue={0}
            maximumValue={sliderData.length - 1}
            onValueChange={onValueChange}
            step={1}
            trackMarks={[0, 1, 2, 3]}
            trackClickable={true}
            trackStyle={{ backgroundColor: "#4D4D5B" }}
            thumbStyle={{
              width: 10,
              height: 40,
              backgroundColor: sliderData[selectedIndex]
                ? sliderData[selectedIndex].color
                : "#4D4D5B",
            }}
            renderTrackMarkComponent={(index) => (
              <View className="relative">
                <View
                  key={index}
                  className="w-2 aspect-square rounded-full bg-[#4D4D5B]"
                />
                {index === 0 ? (
                  <Text
                    className=" text-center text-base absolute top-[300%] left-1/2 w-10"
                    style={{
                      color: sliderData[0].color,
                      fontFamily: "BaiJamjuree-Bold",
                      transform: [{ translateX: -20 }],
                    }}
                  >
                    {sliderData[index].label}
                  </Text>
                ) : null}
                {index === sliderData.length - 1 ? (
                  <Text
                    className="text-right text-base absolute top-[300%] right-1/2 w-20"
                    style={{
                      color: sliderData[sliderData.length - 1].color,
                      fontFamily: "BaiJamjuree-Bold",
                      transform: [{ translateX: 20 }],
                    }}
                  >
                    {sliderData[index].label}
                  </Text>
                ) : null}
              </View>
            )}
          />
        </View>
      ) : null}
    </View>
  );
};

export default SetPace;

const getIntialValue = (localUser?: LocalUser) => {
  const current = localUser?.weight ? localUser.weight : 0;
  const desired = localUser?.desiredWeight ? localUser.desiredWeight : 0;

  const diff =
    current - desired >= 0 ? current - desired : (current - desired) * -1;

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

  // let ct: number = diff;
  // let i: number = 1;
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

  // while (ct > 0) {

  //   ct--;
  //   i++;
  // }

  return {
    diff,
    sliderData: sliderDataTmp,
  };
};
