import BasicCTA from "@components/Buttons/BasicCTA";
// import { getUser } from "@models/User/createUtils";
import { usePhoneAuthContext } from "@modules/Auth/providers/PhoneAuthProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { useNavigation } from "@react-navigation/native";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { useNavigation } from "@react-navigation/native";
import { View, Text, useWindowDimensions } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

const CodeInputV2 = () => {
  const {
    phoneNumber,
    countryCode,
    onUpdateVerificationCode: setValue,
    onSignIn,
    verificationCode: value,
    message,
  } = usePhoneAuthContext();

  // const { state, onToggleStatus } = useAuthContext();

  // const { state } = useAuthContext();
  // const navigation = useNavigation();

  const onSignInSubmit = async () => {
    await onSignIn();
    weEventTrack("auth_clickVerifyCode", {});

    // if (uid) {
    //   const userObj = await getUser(uid);

    //   const userTeamObj =
    //     userObj?.participatingInGameWithTeam &&
    //     userObj.participatingInGameWithTeam[state.gameId];

    //   // if user has a team
    //   if (userTeamObj) {
    //     onToggleStatus("SUCCESS");
    //   } else {
    //     onToggleStatus("TEAM_SELECT");
    //   }
    // }

    // select team post auth

    // if (state.navToScreen) {
    //   navigation.navigate(state.navToScreen);
    // } else {
    //   navigation.navigate("Home");
    // }
  };

  const ref = useBlurOnFulfill({
    value,
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { width } = useWindowDimensions();

  return (
    <View
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="px-6 pt-8"
      style={{ flex: 1 }}
    >
      <Text
        className="text-white font-bold text-center text-2xl iphoneX:text-3xl py-4"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        Verify Phone
      </Text>
      <Text
        className="text-white font-normal text-sm iphoneX:text-lg text-center py-4"
        style={{ fontFamily: "BaiJamjuree-Light" }}
      >
        Code send to +{countryCode}
        XXXXXXXX{phoneNumber.slice(-2)}
      </Text>

      <View className="px-4">
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              className="bg-white/10 border border-white rounded-lg w-10 flex justify-center items-center"
              style={{ aspectRatio: 0.8 }}
              key={index}
            >
              <Text
                className="text-white"
                style={{
                  fontSize: width > 376 ? 20 : 16,
                  textAlignVertical: "center",
                }}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        <Text
          className="text-[#FF556C] text-center py-2 text-xs iphoneX:text-sm"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          {message.text}
        </Text>
      </View>

      <View className="w-3/5 min-w-max self-center pt-12">
        <BasicCTA
          text="Continue"
          onPress={onSignInSubmit}
          disabled={value.length !== 6}
          color="bg-white"
          disableColor="bg-stone-400"
          textColor="text-[#100F1A]"
          roundStr="rounded-full"
          paddingStr="py-2"
        />
      </View>
    </View>
  );
};

export default CodeInputV2;
