import { usePhoneAuthContext } from "@modules/Auth/providers/PhoneAuthProvider";
// import { CountryPicker } from "react-native-country-codes-picker";

import {
  View,
  Text,
  //   TextInput,
  useWindowDimensions,
  //   Platform,
  //   TouchableOpacity,
} from "react-native";
// import { AppleButton } from "@invertase/react-native-apple-authentication";
// import { useNavigation } from "@react-navigation/native";
// import PhoneInputUI from "./PhoneInputUI";
// import Policy from "./Policy";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
// import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import { useAuthContext } from "@providers/auth/AuthProvider";

const CELL_COUNT = 6;

const CodeInputUI = () => {
  // const navigation = useNavigation();
  // const { width } = useWindowDimensions();
  // const [show, setShow] = useState(false);

  const {
    verificationCode: value,
    onUpdateVerificationCode: setValue,
    // onAppleButtonPress,
    // countryCode,
  } = usePhoneAuthContext();

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
    <View className="mt-4 px-4 py-2">
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
    </View>
  );
};

export default CodeInputUI;
