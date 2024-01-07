import SlotCategory from "./SlotCategory";
import Modal from "react-native-modal";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { CategoryTypes } from "../constants";

interface Props {
  visible: boolean;
  handleClose: () => void;
  createCalendlySession: (appType: CategoryTypes) => Promise<void>;
  source: string;
}

const BooSlotModal: React.FC<Props> = ({
  visible,
  handleClose,
  createCalendlySession,
  source,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const onClose = () => {
    bottomSheetRef.current?.close();
    setTimeout(handleClose, 50);
  };

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={visible}
      avoidKeyboard={true}
      supportedOrientations={["portrait"]}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      statusBarTranslucent={true}
      hideModalContentWhileAnimating={true}
      style={{ margin: 0, padding: 0 }}
      backdropColor="transparent"
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      animationInTiming={100}
    >
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={["75%"]}
        backgroundStyle={{
          backgroundColor: "#FFFFFF",
        }}
        enablePanDownToClose
        onClose={onClose}
      >
        <SlotCategory
          handleClose={onClose}
          source={source}
          createCalendlySession={createCalendlySession}
        />
      </BottomSheet>
    </Modal>
  );
};

export default BooSlotModal;
