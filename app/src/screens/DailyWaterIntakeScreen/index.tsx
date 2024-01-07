import { View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import GlassesOfWater from "@modules/LifeStyleMain/GlassesOfWater";
import { updateUserField } from "@modules/LifeStyleMain/utils";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { totalLifeStyle } from "@screens/DailyLifeStyleStart";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const DailyWaterIntakeScreen = () => {
  useScreenTrack();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as GoBackParams;

  const { uid, waterIntakeDailyDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      waterIntakeDailyDB: user?.dietForm?.waterIntakeDaily,
    };
  }, shallow);

  const [selected, setSelected] = useState<number>(3);

  useEffect(() => {
    if (waterIntakeDailyDB) {
      setSelected(waterIntakeDailyDB);
    }
  }, [waterIntakeDailyDB]);

  const onProceed = async () => {
    await updateUserField(uid, {
      [`dietForm.waterIntakeDaily`]: selected,
    });

    weEventTrack("dietFormWaterIntake_clickProceed", {});

    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("OutsideFoodIntake", { isGoback: false });
    }
  };

  const handleOnChange = (key: "add" | "remove") => {
    setSelected((p) => (key === "add" ? p + 1 : key === "remove" ? p - 1 : p));
  };

  return (
    <View className="flex-1 bg-[#232136]">
      <Header
        back={true}
        headerColor="#232136"
        tone="dark"
        titleNode={
          <DietFormOptionNode
            progress={1 / totalLifeStyle}
            heading="Daily LifeStyle"
          />
        }
        centerTitle={true}
      />
      <OnboardLifeStyle
        disabled={false}
        heading="How many glasses of water you drink everyday?"
        onNext={onProceed}
      >
        <GlassesOfWater target={selected} onChange={handleOnChange} />
      </OnboardLifeStyle>
    </View>
  );
};

export default DailyWaterIntakeScreen;
