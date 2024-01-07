import CloseBtn from "@components/Buttons/CloseBtn";
import SvgIcons from "@components/SvgIcons";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  text?: string;
  onCancel: () => void;
  onReport: () => void;
  onBlockRequest: () => void;

  target?: string;
}

const SelectorView: React.FC<Props> = ({
  text,
  onCancel,
  onReport,
  onBlockRequest,

  target,
}) => {
  return (
    <>
      <View className="rounded-lg w-full border-b border-white/30">
        <View className="flex flex-row justify-between items-center px-4 py-3">
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            className="text-white text-2xl text-center capitalize"
          >
            Report / Block
          </Text>
          <TouchableOpacity>
            <CloseBtn classStr="w-5 h-5" color="white" onClose={onCancel} />
          </TouchableOpacity>
        </View>
        {text ? (
          <>
            <View className="h-px bg-[#100F1A]" />
            <Text className="text-white px-4 py-3">{text}</Text>
          </>
        ) : null}
      </View>

      <View className="h-4" />

      {target === "Post" ? (
        <TouchableOpacity
          onPress={onReport}
          className="bg-[#D15555] rounded-lg w-full flex flex-row justify-center items-center px-4 py-3"
        >
          <View className="w-5 aspect-square flex justify-center items-center mr-3">
            <SvgIcons iconType="report" color="#FFFFFF" />
          </View>
          <Text
            className="text-[#FFFFFF] text-2xl text-center capitalize"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Report Post
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onBlockRequest}
          className="bg-[#D15555] rounded-lg w-full flex flex-row justify-center items-center px-4 py-3"
        >
          <View className="w-5 aspect-square flex justify-center items-center mr-3">
            <SvgIcons iconType="block" color="#FFFFFF" />
          </View>
          <Text
            className="text-[#FFFFFF] text-2xl text-center capitalize"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Block User
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default SelectorView;
