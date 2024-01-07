import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import "react-native-get-random-values";
// import { v4 as uuidv4 } from "uuid";

interface Props {
  textColor?: string;
}

const Prompt: React.FC<Props> = ({ textColor }) => {
  const { user } = useUserContext();
  const navigation = useNavigation();

  const onNewUserPrompt = (promptMessage: string) => {
    // chat room
    navigation.navigate("ChatRoom", {
      initialPrompt: promptMessage,
      // roomId: uuidv4(),
    });
  };

  return user?.gptPrompts?.length ? (
    <View className="flex-1 py-4">
      <Text
        className=" text-center text-sm mb-2"
        style={{ fontFamily: "Nunito-Bold", color: textColor || "#FFFFFF" }}
      >
        ✏️ Some Suggested Prompts
      </Text>
      {user.gptPrompts.map((each) => (
        <TouchableOpacity
          key={each}
          onPress={() => onNewUserPrompt(each)}
          className="p-2 bg-white/20 rounded-xl mt-2 flex flex-row justify-between items-center"
        >
          <Text
            numberOfLines={1}
            className="flex-1 text-sm"
            style={{
              fontFamily: "Nunito-Regular",
              color: textColor || "#FFFFFF",
            }}
          >
            {each}
          </Text>
          <View className="w-3 aspect-square">
            <ArrowIcon direction="right" color={textColor || "#FFFFFF"} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  ) : null;
};

export default Prompt;
