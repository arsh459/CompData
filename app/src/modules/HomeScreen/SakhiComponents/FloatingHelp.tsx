import ImageWithURL from "@components/ImageWithURL";
import { encryptedHelp } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import FloatingContainer from "./FloatingContainer";
import { onKnowMoreSakhiDone } from "../utills/guidedOnboardUtils";
import { useAuthContext } from "@providers/auth/AuthProvider";

interface FloatingProps {
  offsetBottom?: number;
  onHide: () => void;
}
const FloatingHelp: React.FC<FloatingProps> = ({ offsetBottom, onHide }) => {
  const navigation = useNavigation();
  const { state } = useAuthContext();

  const onKnowMore = () => {
    if (state.uid) {
      onKnowMoreSakhiDone(state?.uid);
    }
    navigation.navigate("SakhiExplainer", { goBack: false });
  };

  const onStartChat = () => {
    if (state.uid) {
      onKnowMoreSakhiDone(state?.uid);
    }

    navigation.navigate("ChatRoom");
  };

  return (
    <FloatingContainer
      cta1Text="Know more"
      cta2Text="Start Chat"
      cta1Press={onKnowMore}
      cta2Press={onStartChat}
      offsetBottom={offsetBottom}
      onHide={onHide}
    >
      <Text
        className="text-[#654AD1] text-base"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Need any help? Talk to our Sakhi AI
      </Text>
      <View className="flex flex-row items-center">
        <ImageWithURL source={{ uri: encryptedHelp }} className="w-2.5 h-3" />
        <Text
          className="text-[#00000099] text-xs pl-1"
          style={{
            fontFamily: "Nunito-Regular",
          }}
        >
          Encrypted and Private chat
        </Text>
      </View>
    </FloatingContainer>
  );
};
export default FloatingHelp;
