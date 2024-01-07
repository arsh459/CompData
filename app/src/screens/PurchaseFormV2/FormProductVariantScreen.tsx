import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import ProdVariant from "@modules/ShopMain/PurchaseFormMainV2/stageModule/ProdVariantDetail";

const FormProductVariantScreen = () => {
  useScreenTrack();
  return (
    <InteractionProvider>
      <ProdVariant />
    </InteractionProvider>
  );
};

export default FormProductVariantScreen;
