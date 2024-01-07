// import { UserProvider } from "@providers/user/UserProvider";
import { ProfileProvider } from "@providers/profile/ProfileProvider";
import NutritionWorkoutsMain from "@modules/NutritionWorkoutsMain";
import { useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

export interface NutritionUserParams {
  userId: string;
}

const NutritionWorkoutsScreen = () => {
  const route = useRoute();
  const params = route.params as NutritionUserParams;
  useScreenTrack();

  return (
    // <UserProvider>
    <ProfileProvider userId={params.userId}>
      <Header
        back={true}
        headerColor={"transparent"}
        tone="dark"
        headerType="transparent"
      />

      <NutritionWorkoutsMain />
    </ProfileProvider>
    // </UserProvider>
  );
};

export default NutritionWorkoutsScreen;
