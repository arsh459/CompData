import { View, Text, useWindowDimensions, Pressable } from "react-native";
import CirclePercent from "@components/CirclePercent";
import FastImage from "react-native-fast-image";
import PlusIcon from "@components/SvgIcons/PlusIcon";
import MinusIcon from "@components/SvgIcons/MinusIcon";

interface Props {
  target: number;
  onChange: (key: "add" | "remove") => void;
}

const GlassesOfWater: React.FC<Props> = ({ onChange, target }) => {
  const { width } = useWindowDimensions();

  return (
    <View className=" flex items-center">
      <CirclePercent
        circleSize={width * 0.56}
        percent={target / 12}
        showInactive={true}
        strokeWidth={15}
        activeColor={`#51F1FF`}
        inActiveColor={`#00B2FF` ? `#00B2FF33` : undefined}
        noAnimation={true}
      >
        <View className="w-full h-full flex justify-center items-center">
          <FastImage
            source={{
              uri: "https://ik.imagekit.io/socialboat/Component_132_lnjm9aiyR.png?updatedAt=1687864164379",
            }}
            className="w-2/5 aspect-[61/84]"
          />
        </View>
      </CirclePercent>
      <View className="flex flex-row gap-4 items-center pt-8">
        <Pressable
          onPress={() => onChange("remove")}
          className="bg-[#343150] w-10 p-3 flex justify-center items-center  aspect-square rounded-full"
          disabled={target === 1}
        >
          <MinusIcon color="#FF5970" />
        </Pressable>
        <View className="bg-[#343150] w-20 flex justify-center rounded-2xl aspect-[74/39]">
          <Text
            className="text-[#f1f1f1] text-center text-[24px] "
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {target}
          </Text>
        </View>
        <Pressable
          onPress={() => onChange("add")}
          className="bg-[#343150] w-10 p-3 flex justify-center items-center  aspect-square rounded-full"
          // disabled={target === 5}
        >
          <PlusIcon color="#51FF8C" />
        </Pressable>
      </View>
      <Text
        className="text-[#f1f1f1]/70 text-center  text-sm  py-1"
        style={{ fontFamily: "Nunito-Medium" }}
      >
        Glasses of water
      </Text>
    </View>
  );
};

export default GlassesOfWater;
