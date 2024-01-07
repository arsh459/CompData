import ImageWithURL from "@components/ImageWithURL";
import { Text, View } from "react-native";
import Achieved from "./Achieved";

const ManagePCOS = () => {
  return (
    <>
      <ImageWithURL
        className="absolute left-0 right-0 top-0 bottom-0"
        source={{
          uri: "https://ik.imagekit.io/socialboat/Group%201000001230_vLsxBSWWl.png?updatedAt=1694704277451",
        }}
        resizeMode="cover"
      />
      <View className="flex-1 flex justify-center items-center px-8 py-4">
        <Text className="text-[#FEFDFF] text-3xl iphoneX:text-4xl font-medium">
          Over{" "}
          <Text className="text-[#C7FF26]">25K women have managed PCOS</Text>,
          you can too!
        </Text>

        <Achieved />
      </View>
    </>
  );
};

export default ManagePCOS;
