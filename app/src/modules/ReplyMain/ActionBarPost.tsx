import ImageWithURL from "@components/ImageWithURL";
import SvgIcons from "@components/SvgIcons";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { View, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  //   progress: number;
  //   sakhiState: sakhiStateTypes;
  //   setVisible: (val: boolean) => void;
  messageTyped: string;
  setMessageTyped: (newMessage: string) => void;
  leftImg?: string;
  leftOnPress?: () => void;
  onSend: () => void;
}

const ActionBarPost: React.FC<Props> = ({
  //   progress,
  //   setVisible,
  //   sakhiState,
  leftImg,
  leftOnPress,
  onSend,
  messageTyped,
  setMessageTyped,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [padding, setPadding] = useState<number>(bottom);
  //   const [newMessageTyped, setNewMessageTyped] = useState<string>("");

  useEffect(() => {
    if (Platform.OS === "android") {
      setPadding(8);
    } else if (bottom) {
      const listener = Keyboard.addListener("keyboardWillShow", () => {
        setPadding(8);
      });

      const listener2 = Keyboard.addListener("keyboardWillHide", () => {
        setPadding(bottom);
      });

      return () => {
        listener.remove();
        listener2.remove();
      };
    }
  }, [bottom]);

  const onSendFinal = () => {
    setMessageTyped("");
    onSend();

    weEventTrack("sakhi_sendMessage", {});
  };

  return (
    <View style={{ paddingBottom: padding }} className="bg-[#343150] px-4 pt-2">
      <View className="flex flex-row items-end">
        {leftImg && leftOnPress ? (
          <TouchableOpacity onPress={leftOnPress}>
            <ImageWithURL
              source={{
                uri: leftImg,
              }}
              className="w-8 aspect-square"
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}

        <>
          <TextInput
            multiline={true}
            scrollEnabled={true}
            value={messageTyped}
            cursorColor="#C9C2F2"
            onChangeText={setMessageTyped}
            placeholder="Send a message"
            placeholderTextColor="#67648A"
            className="flex-1 h-full text-white mx-3 px-3 border border-[#C9C2F2] rounded-2xl"
            style={{
              fontSize: 16,
              textAlignVertical: "center",
              paddingVertical: 0,
              marginVertical: 0,
              maxHeight: height * 0.2,
            }}
          />

          <TouchableOpacity onPress={onSendFinal}>
            <View className="w-10 aspect-square p-2.5 bg-[#454454] rounded-full">
              <SvgIcons iconType="send" />
            </View>
            {/* <ImageWithURL
              source={{
                uri: "https://ik.imagekit.io/socialboat/Group_1624_uaPMNGfbn.png?updatedAt=1681307126817",
              }}
              style={{
                opacity: 1,
              }}
              className="w-8 aspect-square"
              resizeMode="contain"
            /> */}
          </TouchableOpacity>
        </>
      </View>
    </View>
  );
};

export default ActionBarPost;
