import { View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import { updateUserField } from "@modules/LifeStyleMain/utils";
import SelectFoodCard from "@modules/LifeStyleMain/SelectFoodCard";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { totalDietHistory } from "@screens/DietHistoryStart";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import { MealTypes } from "@models/User/User";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { MealTypesDietForm } from "@models/User/User";

const SelectFoodItems = () => {
  useScreenTrack();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as GoBackParams;

  const { uid, foodItemsDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      foodItemsDB: user?.dietForm?.foodItems,
    };
  }, shallow);

  const [selected, setSelected] =
    useState<Partial<Record<MealTypesDietForm, Record<string, boolean>>>>();

  useEffect(() => {
    if (foodItemsDB) {
      setSelected(foodItemsDB);
    }
  }, [foodItemsDB]);

  const onProceed = async () => {
    await updateUserField(uid, {
      [`dietForm.foodItems`]: selected,
    });
    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("SelectFoodTimings", { isGoback: false });
    }

    weEventTrack("dietFormMealOptions_clickProceed", {});
  };

  const onNewEntry = async () => {
    await updateUserField(uid, {
      [`dietForm.foodItems`]: selected,
    });

    weEventTrack("dietFormMealOptions_clickAddNew", {});

    navigation.navigate("DontSeeWhatLike");
  };

  return (
    <View className="flex-1 bg-[#232136]">
      <Header
        back={true}
        headerColor="#232136"
        tone="dark"
        titleNode={
          <DietFormOptionNode
            progress={4 / totalDietHistory}
            heading="Diet Preferences"
          />
        }
        centerTitle={true}
      />
      <OnboardLifeStyle
        onNext={onProceed}
        disabled={false}
        heading="Select 1 or 2 items from breakfast lunch and dinner respectively."
      >
        <SelectFoodCard selected={selected} setSelected={setSelected} />
        <View className="w-11/12 mx-auto pb-2">
          <StartButton
            title="Don't see what I like"
            textColor="text-white"
            roundedStr="rounded-2xl border border-white"
            textStyle="py-3 text-center text-base"
            onPress={onNewEntry}
            fontFamily="Nunito-Regular"
          />
        </View>
      </OnboardLifeStyle>
    </View>
  );
};

export default SelectFoodItems;
