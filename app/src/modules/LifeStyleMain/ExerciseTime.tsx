import { View, Text } from "react-native";
import RingTextSvgIcon from "./RingTextSvg";
import FastImage from "react-native-fast-image";
import MultiSlider from "./MultiSlide";

export const getExerciseTimeVal = (val: number): number => {
  if (val < 0) {
    return 0;
  } else if (val > 5) {
    return 5;
  } else {
    return val;
  }
};

interface Props {
  setRingNumber: React.Dispatch<React.SetStateAction<number>>;
  ringNumber: number;
}

const ExerciseTime: React.FC<Props> = ({ ringNumber, setRingNumber }) => {
  return (
    <View className="flex-1 justify-center">
      <View className="w-full relative z-0">
        <View className="w-3/4 aspect-[258/258] flex mx-auto relative z-0 ">
          <RingTextSvgIcon ringCount={ringNumber} />
          <FastImage
            source={{
              uri: "https://ik.imagekit.io/socialboat/running_fF_2TZ943.png?updatedAt=1687858819767",
            }}
            className="absolute left-0 right-0 bottom-4 aspect-[304/115]"
            resizeMode="contain"
          />
        </View>
        <Text className="text-[#F1F1F1] text-center text-2xl pt-2 z-10 font-bold">
          {ringNumber === 5 ? `>5` : `${ringNumber}`} Time
          {ringNumber > 1 ? "s" : ""} / Week
        </Text>
      </View>
      <View className="w-4/5 mx-auto">
        <MultiSlider
          trackMarks={[0, 1, 2, 3, 4, 5]}
          selected={ringNumber}
          setSelected={setRingNumber}
          thumbColor="#7352FF"
          borderWidthDot={4}
        />
      </View>
    </View>
  );
};

export default ExerciseTime;
