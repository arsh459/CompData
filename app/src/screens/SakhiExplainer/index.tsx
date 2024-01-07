import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
// import SakhiOnboard from "@modules/SakhiOnboard";
import SakhiOnboardV2 from "@modules/SakhiOnboard/V2";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";
import { useRoute } from "@react-navigation/native";

export interface SakhiExplainerProps {
  goBack?: boolean;
}

const SakhiExplainer = () => {
  const route = useRoute();
  const params = route.params as SakhiExplainerProps;
  useScreenTrack();

  return (
    <InteractionProvider>
      <SakhiOnboardV2 {...params} goBack={true} />
    </InteractionProvider>
  );
};

export default SakhiExplainer;
