import ImageWithURL from "@components/ImageWithURL";
import { View, Text } from "react-native";
import SvgIcons from "@components/SvgIcons";
import { AchievementPathData } from "../utils/interface";

interface Props {
  item: AchievementPathData;
  dark?: boolean;
}

const Goals: React.FC<Props> = ({ item, dark }) => {
  const doneColor = dark ? "#51FF8C" : "#1FAF20";

  return (
    <View className="flex-1 flex flex-row flex-wrap px-4">
      {item.items?.map((each, index) => (
        <View
          key={`each-${index}`}
          className="w-1/2 flex flex-row justify-evenly items-center py-2"
          style={{ paddingRight: index % 2 === 0 ? 8 : 0 }}
        >
          <ImageWithURL
            source={{ uri: each.icon }}
            className="w-5 aspect-square"
            resizeMode="contain"
          />
          <Text
            numberOfLines={2}
            className="flex-1 text-xs iphoneX:text-sm mx-1"
            style={{
              fontFamily: "Nunito-Medium",
              color:
                each.status === "DONE"
                  ? doneColor
                  : dark
                  ? "#FFFFFFB3"
                  : "#242424",
            }}
          >
            {each.text}
          </Text>
          {each.status === "DONE" ? (
            <View className="w-4 aspect-square">
              <SvgIcons iconType="DoubleTick" color={doneColor} />
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
};

export default Goals;
