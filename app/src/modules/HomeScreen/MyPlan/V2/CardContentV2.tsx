import SvgIcons, { iconTypes } from "@components/SvgIcons";
import { DifficultyLevelsTypes } from "@components/SvgIcons/DifficultyLevelsIcon";
import { View, Text } from "react-native";
import { getTaskIconV2, statusTypes } from "../utils";

// export type iconTypes =
//   | "fitpoint"
//   | "steps"
//   | "time"
//   | "dining"
//   | "difficultyLevels";
export type detailTypes = { icon: iconTypes; text: string };

interface Props {
  color: string;
  title?: string;
  description?: string;
  details?: detailTypes[];
  level?: DifficultyLevelsTypes;
  status?: statusTypes;
}

const CardContentV2: React.FC<Props> = ({
  color,
  title,
  description,
  details,
  level,
  status,
}) => {
  const data = getTaskIconV2(status);

  return (
    <View
      className="flex-1 flex justify-end rounded-b-3xl mr-4"
      style={{ backgroundColor: data?.bgColor }}
    >
      <Text
        numberOfLines={1}
        style={{ color, fontFamily: "BaiJamjuree-Bold" }}
        className="w-full text-xs iphoneX:text-sm pb-2"
      >
        {title}
      </Text>

      <View className="flex flex-row items-center pb-2">
        {details?.map((item) => (
          <View
            key={item.icon}
            className="flex flex-row justify-center items-center mr-4"
          >
            <View className="w-3 iphoneX:w-4 aspect-square mr-1 iphoneX:mr-2">
              <SvgIcons iconType={item.icon} color={color} level={level} />
            </View>
            <Text
              style={{ color, fontFamily: "BaiJamjuree-Regular" }}
              className="text-xs "
            >
              {item.text}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CardContentV2;
