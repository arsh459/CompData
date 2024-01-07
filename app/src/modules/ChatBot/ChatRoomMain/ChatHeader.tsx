import ImageWithURL from "@components/ImageWithURL";
import { infoBtnRing, sakhiIcon } from "@constants/imageKitURL";
import { useSakhiAIStore } from "@hooks/chatbot/V2/store/useSakhiAIStore";
import Header from "@modules/Header";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { shallow } from "zustand/shallow";
import { TOKEN_LIMIT } from "../StartNewChatMain/utils";

interface Props {
  // progress: number;
  // title?: string;
}

const ChatHeader: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { progress, title } = useSakhiAIStore(
    (state) => ({
      title: state.room?.title,
      progress:
        (state.room?.usage?.total_tokens || 0) /
        (state.room?.tokenLimit || TOKEN_LIMIT),
    }),
    shallow
  );

  return (
    <View className="z-50">
      <Header
        back={true}
        tone="dark"
        headerColor="#343150"
        titleNode={
          <View className="flex-1 flex flex-row justify-center items-center">
            <ImageWithURL
              source={{ uri: sakhiIcon }}
              className="w-10 aspect-[1.75]"
              resizeMode="contain"
            />
            {title ? (
              <Text
                numberOfLines={1}
                className="flex-1 text-white text-base ml-2"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {title}
              </Text>
            ) : null}
          </View>
        }
        optionNode={
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SakhiExplainer", { goBack: true })
            }
          >
            <ImageWithURL
              source={{ uri: infoBtnRing }}
              className="w-5 aspect-square"
              resizeMode="contain"
            />
          </TouchableOpacity>
        }
      />
      <View className="w-full h-1.5 bg-[#534E83]">
        <LinearGradient
          start={{ x: 1, y: 0.5 }}
          end={{ x: 0, y: 0.5 }}
          colors={[
            "#80E7EC",
            "#6BC6F2",
            "#3F82FF",
            "#6F8AFF",
            "#9090FF",
            "#DB73FF",
          ]}
          className="h-full"
          style={{ width: width * progress }}
        />
      </View>
    </View>
  );
};

export default ChatHeader;
