import { View, Text, TextInput, Platform } from "react-native";

// import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import clsx from "clsx";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import ClickButton from "@modules/JoinBoatMainV3/components/ClickButton";
interface Props {
  heading: string;
  children?: React.ReactNode;
  onNext: () => void;
  textStyleTw?: string;
  btnText?: string;
  text?: string;
  setText?: (val: string) => void;
  showInput?: boolean;
  disabled: boolean;
}
const OnboardLifeStyle: React.FC<Props> = ({
  children,
  heading,
  onNext,
  textStyleTw,
  btnText,
  setText,
  text,
  showInput,
  disabled,
}) => {
  const focus = useIsFocused();

  const { bottom } = useSafeAreaInsets();
  return (
    <View className="flex-1 flex justify-between bg-[#232136]">
      <Text
        className={clsx(
          "text-[#F1F1F1] text-xl self-center  px-4 pt-2",
          textStyleTw
        )}
        style={{ fontFamily: "Nunito-SemiBold" }}
      >
        {heading}
      </Text>
      {focus && children}
      {showInput && setText ? (
        <View
          className={clsx(
            Platform.OS === "ios"
              ? "flex-1 flex justify-end mx-4 pb-8"
              : "flex-1 flex justify-center mx-4 pb-4"
          )}
        >
          <TextInput
            style={{
              height: Platform.OS === "android" ? 100 : undefined,
              textAlignVertical: "bottom",
              color: "#F1F1F1",
            }}
            className={clsx(
              Platform.OS === "ios"
                ? "pb-2 text-base border-[#FFFFFF]/10 border-b-2"
                : "flex-1 pb-2 text-base  border-[#FFFFFF]/10 border-b-2"
            )}
            placeholder="Mention if any"
            placeholderTextColor="#F1F1F1"
            onChangeText={(newText) => setText(newText)}
            value={text}
            // multiline={true}
          />
          {/* <Text
            className=" text-white text-center"
            onPress={() =>
              navigation.navigate("MentionAnyScreen", { initialValue: text })
            }
          >
            Mention if any
          </Text> */}
        </View>
      ) : null}

      <View
        style={{ paddingBottom: bottom || 16 }}
        className="px-4  flex justify-center "
      >
        <ClickButton
          disabled={disabled}
          nextBtnText={btnText ? btnText : "Proceed"}
          onNext={onNext}
        />
        {/* <StartButton
          title={btnText ? btnText : "Proceed"}
          bgColor="bg-[#6D55D1]"
          textColor="text-[#fff] "
          roundedStr="rounded-2xl"
          textStyle="py-3 text-center text-xl  "
          onPress={onNext}
          fontFamily="Nunito-Bold"
        /> */}
      </View>
    </View>
  );
};

export default OnboardLifeStyle;
