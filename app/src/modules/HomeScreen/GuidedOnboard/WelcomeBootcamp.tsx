import ImageWithURL from "@components/ImageWithURL";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  onClose: () => void;
}

const WelcomeBootcamp: React.FC<Props> = ({ onClose }) => {
  const [remoteState, setRemoteState] = useState<"welcome" | "start">(
    "welcome"
  );

  useEffect(() => {
    setTimeout(() => {
      setRemoteState("start");
    }, 2000);
  }, []);

  return (
    <View className="flex-1 flex justify-center items-center">
      <View className="m-8 relative z-0">
        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/Group_1804_6cEaTQdR5.png?updatedAt=1686666964267",
          }}
          resizeMode="contain"
          className="w-full aspect-[389/422] my-4"
        />
        <View className="h-1/5" />
        <View className="absolute top-3/4 left-0 right-0">
          {remoteState === "welcome" ? (
            <Text
              className="text-white text-center text-4xl leading-10"
              style={{ fontFamily: "Canela-Light" }}
            >
              Welcome to
              <Text
                style={{ fontFamily: "BaiJamjuree-Bold", color: "#C5FF49" }}
              >
                {" "}
                Socialboat Bootcamp
              </Text>
            </Text>
          ) : (
            <>
              <Text
                className="text-white text-center text-4xl leading-10"
                style={{ fontFamily: "Canela-Light" }}
              >
                Let's give you a
                <Text
                  style={{ fontFamily: "BaiJamjuree-Bold", color: "#C5FF49" }}
                >
                  {" "}
                  go through
                </Text>
              </Text>
              <Text className="text-white/80 text-sm text-center font-extralight my-3">
                Tap anywhere to get started
              </Text>
            </>
          )}
        </View>
      </View>
      {remoteState === "start" ? (
        <TouchableOpacity
          className="absolute left-0 right-0 top-0 bottom-0"
          onPress={onClose}
        />
      ) : null}
    </View>
  );
};

export default WelcomeBootcamp;
