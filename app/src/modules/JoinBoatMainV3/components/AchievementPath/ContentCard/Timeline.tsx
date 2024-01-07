import { View, Text } from "react-native";
import ImageWithURL from "@components/ImageWithURL";
import { TimelineInterface } from "../utils/interface";

interface Props {
  timeline: TimelineInterface;
  dark?: boolean;
}

const Timeline: React.FC<Props> = ({ timeline, dark }) => {
  const doneColor = dark ? "#51FF8C" : "#1FAF20";

  return (
    <View
      className="w-1/2 flex items-center"
      style={{
        alignSelf: timeline?.align === "end" ? "flex-end" : "flex-start",
        flexDirection: timeline?.align === "end" ? "row-reverse" : "row",
        transform: [{ translateX: timeline?.align === "end" ? -1 : 1 }],
      }}
    >
      <View
        className="flex-1 flex flex-row items-center px-4 py-2 rounded-xl border"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          backgroundColor:
            timeline.status === "DONE" ? `${doneColor}33` : "#EFDFFF33",
          borderColor: timeline.status === "DONE" ? doneColor : "#EFDFFF",
        }}
      >
        <ImageWithURL
          source={{ uri: timeline?.icon }}
          className="w-5 aspect-square mr-2"
          resizeMode="contain"
        />
        <Text
          numberOfLines={2}
          className="flex-1 text-white text-xs leading-3"
          style={{ fontFamily: "Nunito-Regular" }}
        >
          {timeline?.text}
        </Text>
      </View>
      <View className="w-1/4 flex flex-row items-center">
        <View
          style={{
            width: "100%",
            borderColor: "#F3E8FF",
            borderWidth: 1,
            borderStyle: "dotted",
          }}
        />
      </View>
      <View
        style={{
          height: 70,
          borderColor: "#F3E8FF",
          borderWidth: 1,
          borderStyle: "dotted",
        }}
      />
    </View>
  );
};

export default Timeline;
