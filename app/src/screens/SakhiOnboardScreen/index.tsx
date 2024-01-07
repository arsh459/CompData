import SakhiOnboard from "@modules/SakhiOnboard";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";

const SakhiOnboardScreen = () => {
  return (
    <InteractionProvider>
      <SakhiOnboard />
    </InteractionProvider>
  );
};

export default SakhiOnboardScreen;
