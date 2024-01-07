import { useState } from "react";
import Header from "@modules/Header";
import { useUserContext } from "@providers/user/UserProvider";
import { saveMoodToFirebase } from "./utils";
import { useNavigation } from "@react-navigation/native";
import MoodEmojiToAdd from "./MoodViews/MoodEmojiToAdd";
import SaveDetailsButton from "./SaveDetailsButton";
import { useProgressStore } from "@providers/progress/progressStore";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useAchieverForKPI } from "@modules/Awards/hook/useAchieverForKPI";
interface Props {
  todaysMood: number;
}

const AddMoodMain: React.FC<Props> = ({ todaysMood }) => {
  const initialMood = todaysMood ? todaysMood : 0;
  const { user } = useUserContext();
  const [selectedMood, setSelectedMood] = useState(initialMood);
  const navigation = useNavigation();
  const handleMoodSelect = (mood: number) => {
    setSelectedMood(mood);
  };

  const toggleUpdate = useProgressStore((state) => state.toggleUpdate);
  const { achiever } = useAchieverForKPI("mood");

  const handleSaveDetails = async () => {
    await saveMoodToFirebase("mood", "dailyMood", selectedMood, user?.uid);
    toggleUpdate();

    if (achiever) {
      navigation.navigate("AwardWon", { achivementId: achiever.id });
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }

    weEventTrack("addMood_clickSave", {});
  };
  return (
    <>
      <Header headerColor="#232136" tone="dark" back={true} />

      <MoodEmojiToAdd
        handleMoodSelect={handleMoodSelect}
        selectedMood={selectedMood}
      />
      {initialMood === selectedMood ? null : (
        <SaveDetailsButton handleSaveDetails={handleSaveDetails} />
      )}
    </>
  );
};

export default AddMoodMain;
