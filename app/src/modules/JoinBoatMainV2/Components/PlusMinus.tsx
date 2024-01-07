import { iPhoneX } from "@constants/screen";
import clsx from "clsx";
// import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

interface Props {
  current: number;
  onChange: (val: number) => void;
  currStr?: string;
  step?: number;
  min?: number;
  max?: number;
  unit?: string;
  vertical?: boolean;
  btnRounded?: string;
}

const PlusMinus: React.FC<Props> = ({
  current,
  onChange,
  currStr,
  step,
  min,
  max,
  unit,
  vertical,
  btnRounded,
}) => {
  const { width } = useWindowDimensions();
  const text = currStr ? currStr : `${current} ${unit}`;
  // const [holdStartTime, setHoldStartTime] = useState<number>(0);

  return (
    <View
      className={clsx(
        "flex justify-center items-center",
        vertical ? "flex-col-reverse" : "flex-row"
      )}
    >
      <TouchableOpacity
        className={clsx(
          "bg-[#343150] p-2.5",
          btnRounded ? btnRounded : "rounded-full"
        )}
        // onPressIn={() => setHoldStartTime(Date.now())}
        // onPressOut={() => {
        //   const holdToAction = Math.round((Date.now() - holdStartTime) / 100);
        //   onChange(
        //     current - (holdToAction ? holdToAction : 1) * (step ? step : 1)
        //   );
        // }}
        onPress={() => onChange(current - (step ? step : 1))}
        disabled={current <= (min ? min : 0)}
      >
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Vector_JkTHqMX5j.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666006052058",
          }}
          className="w-4 iphoneX:w-6 aspect-square"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View className="w-4" />
      <View
        className="bg-[#343150] rounded-2xl flex flex-row justify-center items-center my-2 py-2"
        style={{
          width: (currStr ? 4 : text.length) * (width >= iPhoneX ? 24 : 20),
        }}
      >
        <Text
          className="text-white text-xl iphoneX:text-2xl"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {text}
        </Text>
      </View>
      <View className="w-4" />
      <TouchableOpacity
        className={clsx(
          "bg-[#343150] p-2.5",
          btnRounded ? btnRounded : "rounded-full"
        )}
        // onPressIn={() => setHoldStartTime(Date.now())}
        // onPressOut={() => {
        //   const holdToAction = Math.round((Date.now() - holdStartTime) / 100);
        //   onChange(
        //     current + (holdToAction ? holdToAction : 1) * (step ? step : 1)
        //   );
        // }}
        onPress={() => onChange(current + (step ? step : 1))}
        disabled={current >= (max ? max : 100)}
      >
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Vector_4LJpdloPxm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666006035966",
          }}
          className="w-4 iphoneX:w-6 aspect-square"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlusMinus;
