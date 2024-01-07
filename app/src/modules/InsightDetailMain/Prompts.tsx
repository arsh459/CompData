import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import "react-native-get-random-values";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface Props {
  prompts: string[];
  textColor?: string;
}

const Prompts: React.FC<Props> = ({ prompts, textColor }) => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();

  const onNewUserPrompt = (promptMessage: string) => {
    navigation.navigate("ChatRoom", {
      initialPrompt: promptMessage,
    });
  };

  return prompts.length ? (
    <View
      className="flex-1 p-4 bg-[#756FAB]"
      style={{ paddingBottom: bottom ? bottom : 8 }}
    >
      <Text
        className=" text-center text-sm mb-2"
        style={{ fontFamily: "Nunito-Bold", color: textColor || "#FFFFFF" }}
      >
        Some questions you can ask Sakhi
      </Text>
      {prompts.map((each) => (
        <TouchableOpacity
          key={each}
          onPress={() => onNewUserPrompt(each)}
          className="p-2 bg-white rounded-xl mt-2 flex flex-row justify-between items-center"
        >
          <Text
            numberOfLines={2}
            className="flex-1 text-sm"
            style={{
              fontFamily: "Nunito-Medium",
              color: textColor || "#000000",
            }}
          >
            {each}
          </Text>
          <View className="w-3 aspect-square">
            <ArrowIcon direction="right" color={textColor || "#000000"} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  ) : null;
};

export default Prompts;
