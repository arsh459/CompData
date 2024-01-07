import {
  // Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  // ScrollView,
  StatusBar,
  // TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import PhoneAuth from "./PhoneAuth/PhoneAuth";
import { PhoneAuthProvider } from "./providers/PhoneAuthProvider";

const AuthMainV2 = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View className="flex-1 bg-[#100F1A]">
      <PhoneAuthProvider>
        <KeyboardAvoidingView
          behavior={"position"}
          contentContainerStyle={{ width, height }}
        >
          <SafeAreaView
            style={{
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
          />
          <StatusBar
            backgroundColor="transparent"
            barStyle="light-content"
            translucent={true}
            animated={true}
          />

          <PhoneAuth />
        </KeyboardAvoidingView>
      </PhoneAuthProvider>
    </View>
  );
};

export default AuthMainV2;
