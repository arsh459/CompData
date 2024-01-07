import { useUserStore } from "@providers/user/store/useUserStore";
import { View, Text } from "react-native";
import { shallow } from "zustand/shallow";
import ImageWithURL from "@components/ImageWithURL";
import { icons } from "./AchievementPath/utils/constants";

interface Props {
  bgColor?: string;
  textColor?: string;
}

const ThingsToWorkOn: React.FC<Props> = ({ bgColor, textColor }) => {
  const remoteTextColor = textColor || "#232136";

  const data = useUserStore(({ user }) => user?.thingsToWorkOn, shallow);

  return (
    <View
      className="rounded-3xl py-4"
      style={{ backgroundColor: bgColor || "#F3E8FF" }}
    >
      <Text
        className="text-center text-base px-4"
        style={{ fontFamily: "Nunito-Medium", color: remoteTextColor }}
      >
        Things we will work on together 🌼
      </Text>

      {data &&
        data.map((item) => (
          <View
            key={item.text}
            className="flex flex-row justify-between items-center px-4 pt-4 border-t mt-4"
            style={{ borderColor: `${remoteTextColor}26` }}
          >
            <Text
              className="capitalize text-sm"
              style={{
                fontFamily: "Nunito-Regular",
                color: remoteTextColor,
              }}
            >
              {item.text}
            </Text>
            <ImageWithURL
              source={{ uri: icons[item.type] }}
              className="w-8 aspect-square ml-4"
            />
          </View>
        ))}
    </View>
  );
};

export default ThingsToWorkOn;
