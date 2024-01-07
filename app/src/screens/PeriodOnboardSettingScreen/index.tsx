// import { View, Text } from "react-native";

import Header from "@modules/Header";
// import ImageWithURL from "@components/ImageWithURL";
// import { useUserContext } from "@providers/user/UserProvider";
// import { PeriodGoalTextIcon } from "@modules/PeriodStartJourney/utils";
// import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import PeriodOnboardSettingMain from "@modules/PeriodOnboardSettingMain";

const PeriodOnboardSettingScreen = () => {
  return (
    <>
      <Header back={true} headerColor="#232136" tone="dark" />
      <PeriodOnboardSettingMain />
    </>
  );
};

export default PeriodOnboardSettingScreen;
