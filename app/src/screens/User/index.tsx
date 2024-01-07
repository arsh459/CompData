import { useRoute } from "@react-navigation/native";
import UserMain from "@modules/UserMain";
import { ProfileProvider } from "@providers/profile/ProfileProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

export interface UserParams {
  userId: string;
}

const User = () => {
  const route = useRoute();
  const params = route.params as UserParams;

  useScreenTrack();

  return (
    <ProfileProvider userId={params.userId}>
      <UserMain />
    </ProfileProvider>
  );
};

export default User;
