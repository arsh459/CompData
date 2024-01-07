import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import AddNewJourney from "@modules/Joureny/AddNewJourney";
// import { UserProvider } from "@providers/user/UserProvider";
import { useRoute } from "@react-navigation/native";

export interface NewJourneyProps {
  JourneyId: string;
}

const NewJourney = () => {
  useScreenTrack();
  const route = useRoute();
  const params = route.params ? (route.params as NewJourneyProps) : undefined;

  return (
    <>
      <AddNewJourney JourneyId={params?.JourneyId} />
    </>
  );
};

export default NewJourney;
