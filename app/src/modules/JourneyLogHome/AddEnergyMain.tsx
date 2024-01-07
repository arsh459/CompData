import { useState } from "react";
import Header from "@modules/Header";
import { useUserContext } from "@providers/user/UserProvider";
import { saveMoodToFirebase } from "./utils";
import { useNavigation } from "@react-navigation/native";
import SaveDetailsButton from "./SaveDetailsButton";
import EnergyIconToAdd from "./EnergyViews/EnergyIconToAdd";
import { useProgressStore } from "@providers/progress/progressStore";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useAchieverForKPI } from "@modules/Awards/hook/useAchieverForKPI";

interface Props {
  todaysValue: number;
}

const AddEnergyMain: React.FC<Props> = ({ todaysValue }) => {
  const initialValue = todaysValue ? todaysValue : 0;
  const navigation = useNavigation();
  const { user } = useUserContext();
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleValueSelect = (value: number) => {
    setSelectedValue(value);
  };

  const toggleUpdate = useProgressStore((state) => state.toggleUpdate);
  const { achiever } = useAchieverForKPI("energy");

  const handleSaveDetails = async () => {
    weEventTrack("addEnergy_clickAdd", {});
    await saveMoodToFirebase("energy", "dailyEnergy", selectedValue, user?.uid);
    toggleUpdate();
    if (achiever) {
      navigation.navigate("AwardWon", { achivementId: achiever.id });
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <>
      <Header headerColor="#232136" tone="dark" back={true} />

      <EnergyIconToAdd
        handleValueSelect={handleValueSelect}
        selectedValue={selectedValue}
      />
      {initialValue === selectedValue ? null : (
        <SaveDetailsButton handleSaveDetails={handleSaveDetails} />
      )}
    </>
  );
};

export default AddEnergyMain;
