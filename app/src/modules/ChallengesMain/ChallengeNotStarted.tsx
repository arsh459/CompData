import ImageWithURL from "@components/ImageWithURL";
import { View, Text } from "react-native";

interface Props {
  startIn: string;
}

const ChallengeNotStarted: React.FC<Props> = ({ startIn }) => {
  return (
    <View className="flex-1 w-full p-6 justify-center ">
      <View className="px-6 py-4 ">
        <Text
          className="text-white/60 text-2xl leading-7 text-center"
          style={{ fontFamily: "Nunito-Light" }}
        >
          The challenge will start in{" "}
          <Text
            className="text-[#FF8B59] text-2xl leading-7"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {startIn}
          </Text>
        </Text>
      </View>
      <View className="flex items-center justify-start pt-5">
        <View className="w-[80%] h-[65%] ">
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-80,c-maintain_ratio,fo-auto/Group%201000001256_zIIDRiY60.png?updatedAt=1697015179679",
            }}
            className="w-full aspect-auto"
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

export default ChallengeNotStarted;
