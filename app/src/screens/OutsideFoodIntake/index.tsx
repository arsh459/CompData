import { View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import OutsideFood, {
  getOutsideFoodVal,
} from "@modules/LifeStyleMain/OutsideFood";
import { updateUserField } from "@modules/LifeStyleMain/utils";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { totalLifeStyle } from "@screens/DailyLifeStyleStart";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const OutsideFoodIntake = () => {
  useScreenTrack();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as GoBackParams;

  const { uid, outsideFoodInWeekDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      outsideFoodInWeekDB: user?.dietForm?.outsideFoodInWeek,
    };
  }, shallow);

  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    if (outsideFoodInWeekDB) {
      setSelected(getOutsideFoodVal(outsideFoodInWeekDB));
    }
  }, [outsideFoodInWeekDB]);

  const onProceed = async () => {
    await updateUserField(uid, {
      [`dietForm.outsideFoodInWeek`]: selected,
    });

    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("DailyExercise", { isGoback: false });
    }

    weEventTrack("dietFormOutsideFood_clickNext", {});
  };

  return (
    <View className="flex-1 bg-[#232136]">
      <Header
        back={true}
        headerColor="#232136"
        tone="dark"
        titleNode={
          <DietFormOptionNode
            progress={2 / totalLifeStyle}
            heading="Daily LifeStyle"
          />
        }
        centerTitle={true}
      />
      <OnboardLifeStyle
        onNext={onProceed}
        disabled={false}
        heading="How frequently do you indulge in outside food?"
      >
        <OutsideFood selected={selected} setSelected={setSelected} />
      </OnboardLifeStyle>
    </View>
  );
};

export default OutsideFoodIntake;
