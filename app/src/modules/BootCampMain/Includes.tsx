import MediaTile from "@components/MediaCard/MediaTile";
import { Bootcamp } from "@models/BootCamp";
import { View, Text } from "react-native";

interface Props {
  bootcamp: Bootcamp;
}

const Includes: React.FC<Props> = ({ bootcamp }) => {
  return (
    <>
      <Text
        className="text-white text-4xl leading-10 text-center pb-5"
        style={{ fontFamily: "Canela-Light" }}
      >
        What will i get in my
        <Text style={{ fontFamily: "BaiJamjuree-Bold", color: "#C5FF49" }}>
          {" "}
          BootCamp
        </Text>
      </Text>

      {bootcamp.includes.map((item, index) => (
        <View
          key={item.text}
          className="my-5 w-full aspect-[326/446] overflow-hidden"
        >
          <View className="absolute left-4 right-4 top-0 bottom-0 bg-black/30 rounded-3xl" />
          <Text className="text-white text-2xl font-medium px-10 py-6">
            {`${index + 1}. ${item.text}`}
          </Text>
          <View className="flex-1">
            <MediaTile media={item.img} fluid={true} />
          </View>
        </View>
      ))}
    </>
  );
};

export default Includes;
