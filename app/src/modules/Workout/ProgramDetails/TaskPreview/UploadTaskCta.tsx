import { LinearGradient } from "expo-linear-gradient";
import { Text, Image } from "react-native";

const UploadTaskCta = () => {
  return (
    <LinearGradient
      colors={["#F88456", "#F29C39"]}
      start={[0.1, 0.4]}
      end={[0.5, 0.4]}
      className="flex flex-row  px-8 iphoneX:px-10 py-4  justify-center items-center  rounded-xl"
    >
      <Image
        source={{
          uri: `https://ik.imagekit.io/socialboat/Group_356_rVoCqMAyqi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656071305562`,
        }}
        className="w-4 h-4 iphoneX:w-6 iphoneX:h-6"
        resizeMode="contain"
      />
      <Text className="pl-2.5 text-lg iphoneX:text-2xl text-white">
        Start Workout
      </Text>
    </LinearGradient>
  );
};
export default UploadTaskCta;
