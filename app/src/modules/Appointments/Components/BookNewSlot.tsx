import { View } from "react-native";
import { useState } from "react";
import ClickButton from "@modules/JoinBoatMainV3/components/ClickButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CategoryTypes } from "../constants";
import BooSlotModal from "./BooSlotModal";

interface Props {
  createCalendlySession: (appType: CategoryTypes) => Promise<void>;
  initOpen?: boolean;
}

const BookNewSlot: React.FC<Props> = ({ createCalendlySession, initOpen }) => {
  const { bottom } = useSafeAreaInsets();
  const [visible, setVisible] = useState<boolean>(initOpen ? true : false);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <View className="px-4 pt-4" style={{ paddingBottom: bottom || 16 }}>
        <ClickButton
          nextBtnText="Book a new slot"
          onNext={() => setVisible(true)}
        />
      </View>

      <BooSlotModal
        visible={visible}
        handleClose={handleClose}
        source="manageAppointments"
        createCalendlySession={createCalendlySession}
      />
    </>
  );
};

export default BookNewSlot;
