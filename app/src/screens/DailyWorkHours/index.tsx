import { View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import SetWorkingHours from "@modules/LifeStyleMain/SetWorkingHours";
import { updateUserField } from "@modules/LifeStyleMain/utils";
import { totalDailyFocus } from "@screens/DailyFocusStart";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const DailyWorkHours = () => {
  useScreenTrack();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as GoBackParams;

  const { uid, workingHourDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      workingHourDB: user?.dietForm?.workingHour,
    };
  }, shallow);

  const [selected, setSelected] = useState<number>(8);

  useEffect(() => {
    if (workingHourDB) {
      setSelected(workingHourDB);
    }
  }, [workingHourDB]);

  const onProceed = async () => {
    await updateUserField(uid, {
      [`dietForm.workingHour`]: selected,
    });

    weEventTrack("dietFormWorkingHours", {});

    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("TakingSupplements", { isGoback: false });
    }
  };
  return (
    <View className="flex-1 bg-[#232136]">
      <Header
        back={true}
        headerColor="#232136"
        tone="dark"
        titleNode={
          <DietFormOptionNode
            progress={3 / totalDailyFocus}
            heading="Daily Focus"
          />
        }
        centerTitle={true}
      />
      <OnboardLifeStyle
        onNext={onProceed}
        disabled={false}
        heading="What are your working hours?"
      >
        <View className="flex-1 pt-10">
          <SetWorkingHours target={selected} onChange={setSelected} />
        </View>
      </OnboardLifeStyle>
    </View>
  );
};

export default DailyWorkHours;
