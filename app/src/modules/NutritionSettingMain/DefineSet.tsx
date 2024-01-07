// import { View } from "react-native";

// import DietSettingListCard from "./DietSettingListCard";
// import {
//   familyHistoryIcon,
//   medicalReportIcon,
//   pdfIcon,
//   supplementsIcon,
//   targetWeightIcon,
//   workHoursIcon,
// } from "@constants/imageKitURL";
// import { useNavigation } from "@react-navigation/native";
// import { useUserContext } from "@providers/user/UserProvider";
import SettingCardWrapper from "./SettingCardWrapper";
// import { weEventTrack } from "@utils/analytics/webengage/userLog";

const DefineSet = () => {
  // const navigation = useNavigation();
  // const { user } = useUserContext();
  // const onClickTarget = () => {
  //   navigation.navigate("TargetWeight", { isGoback: true });
  //   weEventTrack("dietSettings_clickTargetWeight", {});
  // };
  // const onClickFamilyHistory = () => {
  //   navigation.navigate("FamilyHistory", { isGoback: true });
  //   weEventTrack("dietSettings_clickFamilyHistory", {});
  // };
  // const onClickWorkingHours = () => {
  //   navigation.navigate("DailyWorkHours", { isGoback: true });
  //   weEventTrack("dietSettings_clickWorkingHours", {});
  // };

  return (
    <SettingCardWrapper primaryString="01" secondaryString="History">
      <></>
    </SettingCardWrapper>
  );
};

export default DefineSet;
