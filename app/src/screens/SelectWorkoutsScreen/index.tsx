// import { UserProvider } from "@providers/user/UserProvider";
// import { useRoute } from "@react-navigation/native";
import { ProfileProvider } from "@providers/profile/ProfileProvider";
import SelectWorkoutsMain from "@modules/SelectWorkoutsMain";
import { useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

export interface WorkoutUserParams {
  userId: string;
}

const SelectWorkoutsScreen = () => {
  const route = useRoute();
  const params = route.params as WorkoutUserParams;
  useScreenTrack();

  return (
    // <GameProvider selectedGameId={state.gameId}>
    // <UserProvider>
    <ProfileProvider userId={params.userId}>
      <Header
        back={true}
        headerColor={"transparent"}
        tone="dark"
        headerType="transparent"
        // setHeaderHeight={setHeaderHeight}
      />
      <SelectWorkoutsMain />
    </ProfileProvider>
    // </UserProvider>
    // </GameProvider>
  );
};

export default SelectWorkoutsScreen;
