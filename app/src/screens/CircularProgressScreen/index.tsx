import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import CircularProgressMain from "@modules/CircularProgressMain";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";
import { useRoute } from "@react-navigation/native";

export type ScreenTypes = "fitpoint" | "nutrition";

export interface CircularProgressScreenInterface {
  type: ScreenTypes;
}

const CircularProgressScreen = () => {
  const route = useRoute();
  const params = route.params as CircularProgressScreenInterface;

  useScreenTrack();

  return (
    <InteractionProvider>
      <CircularProgressMain {...params} />
    </InteractionProvider>
  );
};

export default CircularProgressScreen;
