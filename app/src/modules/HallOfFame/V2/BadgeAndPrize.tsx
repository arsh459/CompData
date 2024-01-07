import { View, Text } from "react-native";
interface Props {
  heading: string;
  priceStr: string;
  playerWon: number;
}

const BadgeAndPrize: React.FC<Props> = ({ heading, priceStr, playerWon }) => {
  return (
    <>
      <View className="flex-1 flex justify-center items-center pl-2 ">
        <Text
          className="text-white text-center text-sm iphoneX:text-lg"
          style={{ fontFamily: "BaiJamjuree-Semibold" }}
        >
          {heading}
        </Text>
        <Text
          className="text-[#FF556C] text-xl iphoneX:text-2xl py-1 text-center"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {priceStr}
        </Text>
        <Text
          className="text-white font-medium text-sm iphoneX:text-base text-center"
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          {playerWon < 2
            ? `${playerWon} Player won`
            : `${playerWon} Players won`}
        </Text>
      </View>
    </>
  );
};

export default BadgeAndPrize;
