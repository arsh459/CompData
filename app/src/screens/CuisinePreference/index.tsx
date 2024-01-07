import { View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import { SelectedType, updateUserField } from "@modules/LifeStyleMain/utils";
import CuisineSelector from "@modules/LifeStyleMain/CuisineSelector";
import { totalDietHistory } from "@screens/DietHistoryStart";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

export const cusinePrefDisabled = (
  cusinePref?: SelectedType,
  miscText?: string
) => {
  if (miscText) {
    return false;
  }

  if (!cusinePref) {
    return true;
  }

  return !Object.values(cusinePref).includes(true);
};

const CuisinePreference = () => {
  useScreenTrack();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as GoBackParams;

  const { uid, cuisinePreferenceDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      cuisinePreferenceDB: user?.dietForm?.cuisinePreference,
    };
  }, shallow);

  const [selected, setSelected] = useState<SelectedType>();

  useEffect(() => {
    if (cuisinePreferenceDB) {
      setSelected(cuisinePreferenceDB);
    }
  }, [cuisinePreferenceDB]);

  const onProceed = async () => {
    await updateUserField(uid, {
      [`dietForm.cuisinePreference`]: selected,
    });

    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Allergies", { isGoback: false });
    }

    weEventTrack("dietFormCusinePreference_clickProceed", {});
  };

  return (
    <View className="flex-1 bg-[#232136]">
      <Header
        back={true}
        headerColor="#232136"
        tone="dark"
        titleNode={
          <DietFormOptionNode
            progress={2 / totalDietHistory}
            heading="Diet Preferences"
          />
        }
        centerTitle={true}
      />
      <OnboardLifeStyle
        onNext={onProceed}
        disabled={cusinePrefDisabled(selected)}
        heading="Please tell about your cuisine preference ? (you can select more than one)"
      >
        <CuisineSelector selected={selected} setSelected={setSelected} />
      </OnboardLifeStyle>
    </View>
  );
};

export default CuisinePreference;
