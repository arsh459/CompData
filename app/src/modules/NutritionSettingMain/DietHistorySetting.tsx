import { View } from "react-native";

import DietSettingListCard from "./DietSettingListCard";
import {
  cuisinePrefIcon,
  dietPreferenceIcon,
  dishIcon,
  foodAllergiesIcon,
  mealTimeIcon,
} from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import SettingCardWrapper from "./SettingCardWrapper";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const DietHistorySetting = () => {
  const navigation = useNavigation();
  const onClickDietPreference = () => {
    navigation.navigate("DietPreference", { isGoback: true });
    weEventTrack("dietSettings_clickDietPreference", {});
  };
  const onClickCuisinePreference = () => {
    navigation.navigate("CuisinePreference", { isGoback: true });
    weEventTrack("dietSettings_clickCusinePreference", {});
  };
  const onClickAllergies = () => {
    navigation.navigate("Allergies", { isGoback: true });
    weEventTrack("dietSettings_clickAllergies", {});
  };
  const onClickSelectFoodItems = () => {
    navigation.navigate("SelectFoodItems", { isGoback: true });
    weEventTrack("dietSettings_clickSelectItems", {});
  };
  const onClickSelectFoodTimings = () => {
    navigation.navigate("SelectFoodTimings", { isGoback: true });
    weEventTrack("dietSettings_clickTimings", {});
  };

  return (
    <SettingCardWrapper primaryString="03" secondaryString="Diet Preferences">
      <>
        <DietSettingListCard
          iconString={dietPreferenceIcon}
          primaryString="Diet Preference"
          containerStyleTw="py-3"
          onPress={onClickDietPreference}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={cuisinePrefIcon}
          primaryString="Cuisine Preference"
          containerStyleTw="py-3"
          onPress={onClickCuisinePreference}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={foodAllergiesIcon}
          primaryString="Food Allergies"
          containerStyleTw="py-3"
          onPress={onClickAllergies}
        />
        <View className="  h-px ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={dishIcon}
          primaryString="Dish Preference"
          containerStyleTw="py-3"
          onPress={onClickSelectFoodItems}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={mealTimeIcon}
          primaryString="Meal Timings"
          containerStyleTw="py-3"
          onPress={onClickSelectFoodTimings}
        />
      </>
    </SettingCardWrapper>
  );
};

export default DietHistorySetting;
