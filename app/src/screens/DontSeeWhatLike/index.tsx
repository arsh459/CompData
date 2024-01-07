import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "@providers/user/UserProvider";
import Header from "@modules/Header";
import clsx from "clsx";
import { TextInput } from "react-native";
import { updateUserField } from "@modules/LifeStyleMain/utils";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DontSeeWhatLike = () => {
  useScreenTrack();
  const navigation = useNavigation();

  const { user } = useUserContext();
  const { bottom } = useSafeAreaInsets();

  const [text, setText] = useState(user?.dietForm?.userLikesToSee || "");
  //   // const [isChanged, setIsChanged] = useState(false);
  // const [textInputHeight, setTextInputHeight] = useState<number>(0);

  const onProceed = async () => {
    await updateUserField(user?.uid, {
      [`dietForm.userLikesToSee`]: text,
    });

    weEventTrack("dietFormFootItemsDesc_clickProceed", {});

    navigation.navigate("SelectFoodTimings", { isGoback: false });
  };

  return (
    <View className="flex-1 bg-[#232136]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1 ">
          <Header back={true} headerColor="#232136" tone="dark" />
          <View className="flex-1">
            <View className="p-4 flex-1">
              <Text
                className={clsx("text-[#F1F1F1] text-xl self-center   pb-5")}
                style={{ fontFamily: "Nunito-SemiBold" }}
              >
                Tell us briefly what food items you like to eat in the day
              </Text>
              <View className="">
                <TextInput
                  style={{
                    height: Math.max(200),
                    textAlignVertical: "top",
                    color: "#D0CFE4",
                  }}
                  className="flex-1 text-base px-4 pt-2 bg-[#D4CFFF2E] rounded-[20px]"
                  placeholder="Type something"
                  placeholderTextColor="#C5C4D9"
                  onChangeText={(newText) => setText(newText)}
                  // onContentSizeChange={(event) => {
                  //   setTextInputHeight(event.nativeEvent.contentSize.height);
                  // }}
                  value={text}
                  multiline={true}
                />
              </View>
            </View>
            <View className="px-4" style={{ paddingBottom: bottom || 16 }}>
              <StartButton
                title={"Proceed"}
                bgColor="bg-[#6D55D1]"
                textColor="text-[#fff] "
                roundedStr="rounded-2xl"
                textStyle="py-3 text-center text-xl "
                onPress={onProceed}
                fontFamily="Nunito-Bold"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default DontSeeWhatLike;
