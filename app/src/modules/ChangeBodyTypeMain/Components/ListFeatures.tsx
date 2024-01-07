import { View, Text, TouchableOpacity, Image } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
interface Props {
  startColor: string;
  endColor: string;
  imgUrl: string;
  text?: string;
}
const ListFeatures: React.FC<Props> = ({
  imgUrl,
  startColor,
  endColor,
  text,
}) => {
  return (
    <View className="flex flex-row items-center justify-around mb-4 px-2">
      <TouchableOpacity className="w-[16%]  aspect-square">
        <LinearGradient
          colors={[
            startColor ? startColor : "#0085E0",
            endColor ? endColor : "#3852AC",
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          className="flex justify-center items-center rounded-2xl flex-1 p-2 iphoneX:p-3"
        >
          <Image
            source={{ uri: imgUrl }}
            className="w-4/5 aspect-square"
            resizeMode="contain"
          />
        </LinearGradient>
      </TouchableOpacity>
      <Text className="text-[#F1F1F1CC] w-[73%]   text-xs font-sans font-normal">
        {text}
      </Text>
    </View>
  );
};

export default ListFeatures;
