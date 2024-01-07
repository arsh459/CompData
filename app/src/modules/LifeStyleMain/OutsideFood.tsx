import {
  blurBgIcon,
  burgerIcon,
  donutIcon,
  friesIcon,
  milkShakeIcon,
  vegRollIcon,
} from "@constants/imageKitURL";
import { useState, useEffect, useCallback } from "react";
import { View, Image, Text, useWindowDimensions } from "react-native";
import MultiSlider from "./MultiSlide";
import FastImage from "react-native-fast-image";

const size = 200;
const symbolSize = 60;

const radius = size / 2;
const center = radius;

const angles = [0, 310, 250, 180, 90];
const foodIcons = [
  burgerIcon,
  milkShakeIcon,
  friesIcon,
  vegRollIcon,
  donutIcon,
];

export const getOutsideFoodVal = (val: number): number => {
  if (val < 0) {
    return 0;
  } else if (val > 4) {
    return 4;
  } else {
    return val;
  }
};

interface ImageCoord {
  x: number;
  y: number;
  angle: number;
  isBottom: boolean;
}

const degToRad = (deg: number) => {
  return (deg * Math.PI) / 180;
};

interface Props {
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  selected: number;
}

const OutsideFood: React.FC<Props> = ({ selected, setSelected }) => {
  const [coordinates, setCoordinates] = useState<ImageCoord[]>([]);
  const { width: Width } = useWindowDimensions();

  const setupCoordinates = useCallback(() => {
    const newCoordinates = angles.map((angle) => {
      const angleRad = degToRad(angle);
      const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
      const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
      return { x, y, angle, isBottom: angle === 90 };
    });

    setCoordinates(newCoordinates);
  }, []);

  useEffect(() => {
    setupCoordinates();
  }, [setupCoordinates]);

  const getFoodStrings = useCallback((index: number) => {
    switch (index) {
      case 0:
        return "Almost never";
      case 1:
        return "Once a week";
      case 2:
        return "Twice a week";
      case 3:
        return "Three times a week";
      case 4:
        return "Almost everyday";
      default:
        return "";
    }
  }, []);

  return (
    <View className="flex-1 justify-center items-center  relative z-0">
      <View className="relative z-0 w-full flex justify-center items-center ">
        <View className="relative z-20  h-48 w-52 rounded-full ">
          {coordinates.map((coord, index) => (
            <Image
              key={`${coord.x}_${coord.y}_${index}`}
              style={[
                {
                  width: coord.isBottom ? symbolSize * 3 : symbolSize,
                  height: coord.isBottom ? symbolSize * 3 : symbolSize,
                  borderRadius:
                    (coord.isBottom ? symbolSize * 3 : symbolSize) / 2,
                  position: "absolute",
                  left: coord.x - (coord.isBottom ? symbolSize : 0),
                  top: coord.y - (coord.isBottom ? symbolSize * 2 : 0),
                  opacity: coord.isBottom ? 1 : index < selected ? 1 : 0.2,
                },
              ]}
              source={{
                uri: coord.isBottom
                  ? foodIcons[selected]
                  : index === selected
                  ? foodIcons[foodIcons.length - 1]
                  : foodIcons[index],
              }}
            />
          ))}
        </View>
        <FastImage
          source={{
            uri: blurBgIcon,
          }}
          className="absolute aspect-[500/350] -z-400"
          style={{ width: Width }}
        />
      </View>
      <Text className="text-[#F1F1F1] text-center text-2xl mt-12 z-10 font-bold">
        {getFoodStrings(selected)}
      </Text>
      <MultiSlider
        trackMarks={[0, 1, 2, 3, 4]}
        selected={selected}
        setSelected={setSelected}
      />
    </View>
  );
};

export default OutsideFood;
