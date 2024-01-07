import ImageWithURL from "@components/ImageWithURL";
import { chatAiIconHelp } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { TouchableOpacity, View } from "react-native";

interface Props {
  offsetBottom?: number;
  unseenMsg?: boolean;
}

const BotFloatingCta: React.FC<Props> = ({ offsetBottom, unseenMsg }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        weEventTrack("home_sakhiClick", {});
        navigation.navigate("StartNewChat");
      }}
      style={{
        position: "absolute",
        right: 20,
        bottom: 15 + (offsetBottom || 0),
      }}
    >
      <View className="relative z-0">
        <ImageWithURL
          className="w-12 aspect-square"
          source={{
            uri: chatAiIconHelp,
          }}
        />
        {unseenMsg ? (
          <View className="w-2.5 aspect-square rounded-full bg-[#FF33A1] absolute top-0.5 right-0.5" />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default BotFloatingCta;
