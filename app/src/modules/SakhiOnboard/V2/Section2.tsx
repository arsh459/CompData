import ImageWithURL from "@components/ImageWithURL";
import { View, Text, useWindowDimensions } from "react-native";

const Section2 = () => {
  const { height } = useWindowDimensions();

  return (
    <View
      className="flex justify-center items-center relative z-0"
      style={{ height }}
    >
      <View className="absolute left-0 right-0 top-0 bottom-0">
        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/Group_1649_m5N9xuTEY.png?updatedAt=1684322342198",
          }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      <View className="relative z-0">
        <Text
          className="text-white text-center text-4xl leading-9 p-4 iphoneX:p-8"
          style={{ fontFamily: "Canela-Light" }}
        >
          Get Curated
          <Text style={{ fontFamily: "BaiJamjuree-Bold" }}> Workout </Text>and
          <Text style={{ fontFamily: "BaiJamjuree-Bold" }}> Diet </Text>
          Plan according to your period cycle
        </Text>
        <View className="absolute left-0 bottom-full">
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/unsplash_BKSntHf8oiU__1__N_aCmfH57A.png?updatedAt=1684322342190",
            }}
            className="w-48 aspect-[200/160]"
            resizeMode="contain"
          />
        </View>
      </View>
      <View className="absolute left-0 right-0 bottom-0 flex items-end">
        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/walter-lee-olivares-de-la-cruz-9S44Zk3pZyc-unsplash_1_2VIQMVoFiq.png?updatedAt=1684322342194",
          }}
          className="w-5/12 aspect-[209/369]"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default Section2;
