import { Text, Image, View } from "react-native";

interface Props {
  imgUrl?: string;
  text?: string;
}
const ChampCard: React.FC<Props> = ({ imgUrl, text }) => {
  return (
    <View className="flex items-center   ">
      <Image
        source={{
          uri: imgUrl,
        }}
        className="w-4/5 iphoneX:w-full max-h-[240px] aspect-[327/240]"
        resizeMode="contain"
      />
      <Text
        className="text-[#473E24] w-4/5 py-3 text-base iphoneX:text-lg font-bold font-sans"
        style={{ lineHeight: 19 }}
      >
        {text}
      </Text>
    </View>
  );
};

export default ChampCard;
