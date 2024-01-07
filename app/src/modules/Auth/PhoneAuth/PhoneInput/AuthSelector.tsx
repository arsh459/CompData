import { usePhoneAuthContext } from "@modules/Auth/providers/PhoneAuthProvider";
import {
  View,
  Text,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
// import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import PhoneInputUI from "./PhoneInputUI";
import Policy from "./Policy";

const AuthSelector = () => {
  //   const navigation = useNavigation();
  const { width } = useWindowDimensions();
  //   const [show, setShow] = useState(false);

  const {
    onAppleButtonPress,
    // onGoogleSignInPress,
    // countryCode,

    setAuthProvider,
  } = usePhoneAuthContext();

  const onSelectApple = () => setAuthProvider("phone");

  return (
    <View className="px-6 flex-1  flex ">
      <Text
        style={{ fontFamily: "BaiJamjuree-Bold" }}
        className="text-white font-bold text-center text-2xl iphoneX:text-3xl"
      >
        But first let's Sign up!
      </Text>
      <View className="pt-8">
        <Text
          className="text-white font-normal text-sm iphoneX:text-base text-center"
          style={{ fontFamily: "BaiJamjuree-Light" }}
        >
          Enter your phone no.
        </Text>

        <TouchableOpacity onPress={onSelectApple}>
          <PhoneInputUI onPress={onSelectApple} />
        </TouchableOpacity>

        <Text
          className="text-white font-normal py-8 text-sm iphoneX:text-base text-center"
          style={{ fontFamily: "BaiJamjuree-Light" }}
        >
          Or
        </Text>
        {
          Platform.OS === "ios" ? (
            <AppleButton
              buttonStyle={AppleButton.Style.DEFAULT}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                width: width - 40, // You must specify a width
                height: 45, // You must specify a height
              }}
              onPress={onAppleButtonPress}
            />
          ) : null
          // <View className="flex items-center">
          //   <GoogleSigninButton
          //     size={GoogleSigninButton.Size.Wide}
          //     color={GoogleSigninButton.Color.Dark}
          //     onPress={onGoogleSignInPress}
          //   />
          // </View>
        }
      </View>

      <View className="pt-8">
        <Policy />
      </View>
    </View>
  );
};

export default AuthSelector;
