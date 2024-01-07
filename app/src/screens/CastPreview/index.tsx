import ImageWithURL from "@components/ImageWithURL";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import Header from "@modules/Header";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { Linking } from "react-native";
import { View, Text, SafeAreaView } from "react-native";

const CastPreview = () => {
  useScreenTrack();

  const handleClick = () => {
    Linking.openURL("https://socialboat.live/myProgram");
  };

  return (
    <>
      <Header
        back={true}
        tone="dark"
        headerType="transparent"
        headerColor="#232136"
      />
      <SafeAreaView className="flex-1 bg-[#232136]">
        <View className="flex-1 flex justify-evenly items-center p-4">
          <Text
            className="w-4/5 text-white text-center text-3xl"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Now workout on your <Text className="text-[#8A6DFF]">TV</Text> or{" "}
            <Text className="text-[#8A6DFF]">Laptop</Text>
          </Text>
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/Group%201000001036%20(1)__NdiKXjeK.png?updatedAt=1690790975699",
            }}
            className="w-full aspect-[339/257]"
            resizeMode="contain"
          />
          <View className="w-3/4">
            <Text
              className="text-white/60 text-sm"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              Step 1 : Go To{" "}
              <Text
                onPress={handleClick}
                className="text-white/80 underline"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                Socialboat.live/myProgram
              </Text>
            </Text>
            <Text
              className="text-white/60 text-sm my-2"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              Step 2 : Authenticate your Phone number
            </Text>
            <Text
              className="text-white/60 text-sm"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              Step 3 : You are set to workout
            </Text>
          </View>
        </View>
        <StartButton
          title="Go To link"
          bgColor="bg-[#6D55D1]"
          textColor="text-white"
          roundedStr="rounded-xl flex-1 mx-4"
          textStyle="py-3 text-center text-lg"
          onPress={handleClick}
          fontFamily="Nunito-SemiBold"
        />
      </SafeAreaView>
    </>
  );
};

export default CastPreview;
