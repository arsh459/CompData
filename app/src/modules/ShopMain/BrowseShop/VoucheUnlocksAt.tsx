import { View, Text, Image } from "react-native";
import { baseImageKit, springIconWhite } from "@constants/imageKitURL";

interface Props {
  fpString: string;
}

const VoucheUnlocksAt: React.FC<Props> = ({ fpString }) => {
  return (
    <View className="flex flex-row items-center bg-[#FF6069D1] py-2 justify-center rounded-b-xl mt-1.5">
      <Text
        className="text-[#F1F1F1] text-[8px] iphoneX:text-xs"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        Unlocks at
      </Text>
      <Image
        // className="w-[7px] h-2 mx-1"
        className="mx-1 h-3 w-2.5"
        source={{
          uri: `${baseImageKit}/tr:w-40,c-maintain_ratio,fo-auto/${springIconWhite}`,
        }}
      />
      <Text
        className="text-[#F1F1F1] text-[8px] iphoneX:text-xs"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        {fpString}
      </Text>
    </View>
  );
};

export default VoucheUnlocksAt;
