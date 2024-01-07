import ImageWithURL from "@components/ImageWithURL";
import { View, Text } from "react-native";

const data: { img: string; text: string }[] = [
  {
    img: "https://ik.imagekit.io/socialboat/Union_jVpB9-3U3R.png?updatedAt=1694702166929",
    text: "75% Have reduced medication",
  },
  {
    img: "https://ik.imagekit.io/socialboat/Union-2_KzzRHKPCJb.png?updatedAt=1694702167845",
    text: "95% goal achievement",
  },
  {
    img: "https://ik.imagekit.io/socialboat/Union-1_WqZcMKtK98.png?updatedAt=1694702167735",
    text: "80% Regularise periods",
  },
  {
    img: "https://ik.imagekit.io/socialboat/Vector_M5lVzaifE.png?updatedAt=1694702168624",
    text: "4+ KG Weight loss",
  },
];

const Achieved = () => {
  return (
    <View className="w-full p-4">
      {data.map((each) => (
        <View key={each.text} className="flex flex-row items-center pt-4">
          <ImageWithURL
            className="w-4 iphoneX:w-5 aspect-square mr-4"
            source={{ uri: each.img }}
            resizeMode="contain"
          />
          <Text className="flex-1 text-[#F5F1FF] text-sm iphoneX:text-base">
            {each.text}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Achieved;
