import BooSlotModal from "@modules/Appointments/Components/BooSlotModal";
import { BackHandler, Text, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { CategoryTypes } from "@modules/Appointments/constants";

interface Props {
  createCalendlySession: (appType: CategoryTypes) => Promise<void>;
  cancelCalendlySession: () => void;
  source: string;
}

const Cta: React.FC<Props> = ({
  createCalendlySession,
  cancelCalendlySession,
  source,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleClose = () => {
    setVisible(false);
  };

  const onNativeBack = useCallback(() => {
    const onBackPress = () => {
      cancelCalendlySession();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, [cancelCalendlySession]);

  useFocusEffect(onNativeBack);

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        className="bg-[#C7FF26] p-4 rounded-xl"
      >
        <Text
          className="text-[#6D55D1] text-base text-center"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Book a free consultatation
        </Text>
      </TouchableOpacity>

      <BooSlotModal
        visible={visible}
        source={source}
        handleClose={handleClose}
        createCalendlySession={createCalendlySession}
      />
    </>
  );
};

export default Cta;
