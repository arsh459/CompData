import { View } from "react-native";

import DietSettingListCard from "./DietSettingListCard";
import {
  familyDiseaseIcon,
  medicalReportIcon,
  pdfIcon,
  pregnancyIcon,
  supplementsIcon,
  surgeryIcon,
} from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import SettingCardWrapper from "./SettingCardWrapper";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const DoctorSettings = () => {
  const navigation = useNavigation();
  const onClickPregnancy = () => {
    navigation.navigate("PregnancyHistoryScreen", {
      isGoback: true,
      reinit: false,
    });
    weEventTrack("dietSettings_clickDietPreference", {});
  };
  const onClickSurgery = () => {
    navigation.navigate("SurgicalHistoryScreen", {
      isGoback: true,
      reinit: false,
    });
    weEventTrack("dietSettings_clickSurgery", {});
  };

  const onClickFamilyHistory = () => {
    navigation.navigate("FamilyHistory", { isGoback: true });
    weEventTrack("dietSettings_clickFamilyHistory", {});
  };

  const onClickSupplements = () => {
    navigation.navigate("TakingSupplements", { isGoback: true });
    weEventTrack("dietSettings_clickSupplements", {});
  };

  const onClickMedicalReports = () => {
    navigation.navigate("UploadReports", { isGoback: true });
    weEventTrack("dietSettings_clickReports", {});
  };

  return (
    <SettingCardWrapper primaryString="04" secondaryString="Medical History">
      <>
        <DietSettingListCard
          iconString={familyDiseaseIcon}
          primaryString="Family History"
          containerStyleTw="py-3"
          secondaryString=""
          onPress={onClickFamilyHistory}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={surgeryIcon}
          primaryString="Surgical History"
          containerStyleTw="py-3"
          onPress={onClickSurgery}
        />
        <View className="  h-px ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={supplementsIcon}
          containerStyleTw="py-3"
          primaryString="Supplements and medications"
          onPress={onClickSupplements}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={pregnancyIcon}
          primaryString="Pregnancy History"
          containerStyleTw="py-3"
          onPress={onClickPregnancy}
        />

        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={medicalReportIcon}
          primaryString="Medical reports"
          containerStyleTw="py-3"
          showImg={true}
          showImgIcon={pdfIcon}
          onPress={onClickMedicalReports}
        />
      </>
    </SettingCardWrapper>
  );
};

export default DoctorSettings;
