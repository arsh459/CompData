import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import OnBoardingMain from "@modules/OnBoarding";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import { View } from "react-native";

const Onboarding = () => {
  useScreenTrack();
  return (
    <View className="flex-1 ">
      <OnBoardingMain />
      {/* <Button title="GO to Auth" onPress={() => signInRequest()}></Button> */}
    </View>
  );
};

export default Onboarding;
