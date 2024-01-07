import SvgIcons from "@components/SvgIcons";
import { DifficultyLevelsTypes } from "@components/SvgIcons/DifficultyLevelsIcon";
import { View, Text } from "react-native";

export type iconTypes =
  | "fitpoint"
  | "steps"
  | "time"
  | "dining"
  | "difficultyLevels"
  | "gramIcon";
export type detailTypes = { icon: iconTypes; text: string };

interface Props {
  color: string;
  title?: string;
  description?: string;
  details?: detailTypes[];
  level?: DifficultyLevelsTypes;
  children?: React.ReactNode;
}

const CardContent: React.FC<Props> = ({
  color,
  title,
  description,
  details,
  level,
  children,
}) => {
  return (
    <View className="w-2/3 h-full p-4 self-end flex justify-between">
      <Text
        style={{ color, fontFamily: "BaiJamjuree-BoldItalic" }}
        className="w-2/3 text-base iphoneX:text-lg  leading-5"
      >
        {title}
      </Text>
      {children ? (
        children
      ) : (
        <Text
          numberOfLines={3}
          style={{ color, fontFamily: "BaiJamjuree-Regular" }}
          className="text-xs iphoneX:text-sm"
        >
          {description}
        </Text>
      )}
      <View className="flex flex-row justify-between items-center">
        {details?.map((item) => (
          <View
            key={item.icon}
            className="flex flex-row justify-center items-center"
          >
            <View className="w-3 iphoneX:w-4 aspect-square mr-1 iphoneX:mr-2">
              <SvgIcons iconType={item.icon} color={color} level={level} />
            </View>
            <Text
              style={{ color, fontFamily: "BaiJamjuree-Bold" }}
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

export default CardContent;
