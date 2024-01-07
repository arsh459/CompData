import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  ctaText1?: string;
  ctaText2?: string;
  ctaPress1: () => void;
  ctaPress2: () => void;
}
const PermissionButton: React.FC<Props> = ({
  ctaText1,
  ctaText2,
  ctaPress1,
  ctaPress2,
}) => {
  return (
    <View className="    flex ">
      {ctaText1 ? (
        <TouchableOpacity
          onPress={ctaPress1}
          className="w-full border border-white  rounded-full py-2 iphoneX:py-3 mt-4"
        >
          <Text
            className="text-sm iphoneX:text-base text-white text-center"
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            {ctaText1}
          </Text>
        </TouchableOpacity>
      ) : null}

      {ctaText2 ? (
        <TouchableOpacity
          onPress={ctaPress2}
          className="w-full bg-white rounded-full py-2 iphoneX:py-3 my-4"
        >
          <Text
            className="text-[#100F1A] text-sm iphoneX:text-base text-center"
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            {ctaText2}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default PermissionButton;
