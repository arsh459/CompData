import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import ExerciseTime, {
  getExerciseTimeVal,
} from "@modules/LifeStyleMain/ExerciseTime";
import { useEffect, useState } from "react";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { totalLifeStyle } from "@screens/DailyLifeStyleStart";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { updateUserField } from "@modules/LifeStyleMain/utils";

const DailyExercise = () => {
  useScreenTrack();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as GoBackParams;

  const { uid, exerciseDayInWeekDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      exerciseDayInWeekDB: user?.dietForm?.exerciseDayInWeek,
    };
  }, shallow);

  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    if (exerciseDayInWeekDB) {
      setSelected(getExerciseTimeVal(exerciseDayInWeekDB));
    }
  }, [exerciseDayInWeekDB]);

  const onProceed = async () => {
    await updateUserField(uid, {
      [`dietForm.exerciseDayInWeek`]: selected,
    });

    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("DailyAddiction", { isGoback: false });
    }

    weEventTrack("dietFormExercise_clickNext", {});
  };
  return (
    <View className="flex-1 bg-[#232136]">
      <Header
        back={true}
        headerColor="#232136"
        tone="dark"
        titleNode={
          <DietFormOptionNode
            progress={3 / totalLifeStyle}
            heading="Daily LifeStyle"
          />
        }
        centerTitle={true}
      />
      <OnboardLifeStyle
        disabled={false}
        onNext={onProceed}
        heading="How often do you exercise?"
      >
        <ExerciseTime ringNumber={selected} setRingNumber={setSelected} />
      </OnboardLifeStyle>
    </View>
  );
};

export default DailyExercise;
