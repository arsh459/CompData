import ImageWithURL from "@components/ImageWithURL";
import { View } from "react-native";
import { AchievementPathData } from "../utils/interface";

interface Props {
  item: AchievementPathData;
  itemsLength: number;
  dark?: boolean;
}

const Icon: React.FC<Props> = ({ item, itemsLength, dark }) => {
  const doneColor = dark ? "#51FF8C" : "#1FAF20";

  return (
    <>
      <View className="flex-1 flex flex-row flex-wrap justify-center mx-4 my-2">
        {item.items?.map((each, index) => (
          <View
            key={`each-${index}`}
            className="w-1/4 aspect-square p-2"
            style={
              itemsLength > 2
                ? { transform: [{ translateY: index % 2 === 0 ? -8 : 8 }] }
                : undefined
            }
          >
            <View
              key={`each-${index}`}
              className="w-full h-full rounded-full p-4 border"
              style={{
                backgroundColor:
                  each.status === "DONE" // && dark
                    ? `${doneColor}33`
                    : dark
                    ? "#56508F"
                    : "#6D55D126",
                borderColor: each.status === "DONE" ? doneColor : "transparent",
              }}
            >
              <ImageWithURL
                source={{ uri: each.icon }}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
          </View>
        ))}
      </View>

      <View
        className="w-full h-px my-2"
        style={{ backgroundColor: dark ? "#FFFFFF1A" : "#2626261A" }}
      />
    </>
  );
};

export default Icon;
