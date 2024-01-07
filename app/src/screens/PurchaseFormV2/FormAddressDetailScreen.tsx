import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import AddressDetails from "@modules/ShopMain/PurchaseFormMainV2/stageModule/AddressDetail";

export interface PurchaseFormParams {
  voucherId: string;
}

const FormAddressDetailScreen = () => {
  useScreenTrack();
  return (
    <InteractionProvider>
      <AddressDetails />
    </InteractionProvider>
  );
};

export default FormAddressDetailScreen;