import { View, Text, Image } from "react-native";
import clsx from "clsx";
interface Props {
  imgUrl?: string;
  footerMainText?: string;
  footerSubText?: string;
  type?: "mood" | "energy";
  children: React.ReactNode;
}
export const DayTrack: React.FC<Props> = ({
  imgUrl,

  footerMainText,
  footerSubText,
  type,
  children,
}) => {
  return (
    <View className="bg-[#343150] rounded-xl mx-4 p-8">
      <View className="flex flex-row items-center  justify-between">
        {children}
        <Image
          source={{
            uri: imgUrl,
          }}
          className={clsx(
            "w-1/2   ",
            type === "mood"
              ? "max-w-[91px] aspect-[91/83]"
              : type === "energy"
              ? "max-w-[50px] aspect-[38/76]"
              : "aspect-square"
          )}
        />
      </View>
      <Text className="text-white pt-8 iphoneX:text-base text-sm">
        {footerMainText} <Text className="text-[#51FF8C]">{footerSubText}</Text>
      </Text>
    </View>
  );
};
