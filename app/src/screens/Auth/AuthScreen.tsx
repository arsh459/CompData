import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@routes/MainStack";
import AuthMainV2 from "@modules/Auth/AuthMainV2";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Auth">;

const AuthScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  useScreenTrack();
  return <AuthMainV2 />;
};

export default AuthScreen;
