import CloseBtn from "@components/Buttons/CloseBtn";
import UseModal from "@components/UseModal";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import AddImageModalCard from "./AddImages/AddImageModalCard";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LetsDoItPopup: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <UseModal
      visible={isOpen}
      onClose={onClose}
      width="w-full"
      height="h-full"
      fallbackColor="#13121E"
      blurAmount={35}
      tone="dark"
      hasHeader={true}
    >
      <LinearGradient
        colors={["#859EFF3D", "#C285FF70"]}
        className="flex-1 flex justify-center px-4"
      >
        <View className="flex flex-row justify-between items-center">
          <Text
            className="text-white text-xl iphoneX:text-2xl"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          ></Text>
          <CloseBtn onClose={onClose} color="#FFFFFF" />
        </View>
        <View className="  pt-5">
          <AddImageModalCard />
        </View>
      </LinearGradient>
    </UseModal>
  );
};

export default LetsDoItPopup;
