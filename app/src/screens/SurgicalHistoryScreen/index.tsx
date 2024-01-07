import { View } from "react-native";
import { useEffect, useState } from "react";
import DoctorFormWrapper from "@modules/DoctorFormMain/DoctorFormWrapper";
import { useNavigation, useRoute } from "@react-navigation/native";
import ImageWithURL from "@components/ImageWithURL";
import { SuggicalHistoryIcon } from "@constants/imageKitURL";
import SelectBox from "@modules/DoctorFormMain/SelectBox";
import { updateUserField } from "@modules/LifeStyleMain/utils";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { ReinitParams } from "@modules/NutritionSettingMain";

const SurgicalHistoryScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const params = route.params as ReinitParams;

  const { uid, surgicalHistoryDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      surgicalHistoryDB: user?.doctorForm?.surgicalHistory,
    };
  }, shallow);

  const [selected, setSelected] = useState<boolean>();

  useEffect(() => {
    if (typeof surgicalHistoryDB !== "undefined" && !params.reinit) {
      setSelected(surgicalHistoryDB);
    }
  }, [surgicalHistoryDB, params.reinit]);

  useScreenTrack();

  const onProceed = async (val: boolean) => {
    setSelected(val);

    if (surgicalHistoryDB !== val) {
      await updateUserField(uid, {
        [`doctorForm.surgicalHistory`]: val,
        [`doctorForm.surgeryBrief`]: undefined,
      });
    }

    if (val) {
      navigation.navigate("SurgeryBriefScreen", {
        reinit: params?.reinit,
        isGoback: params?.isGoback,
      });
    } else {
      if (params?.isGoback && navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate("SexualActivityStatusScreen", {
          reinit: true,
          isGoback: false,
        });
      }
    }

    weEventTrack("medicalProfile_logSurgery", {
      surgricalHistory: val ? 1 : 0,
    });
  };
  return (
    <DoctorFormWrapper
      headingProgress="Medical Profile"
      progress={3 / 5}
      heading="Do you have any surgical history?"
    >
      <View className="flex-1 px-4">
        <View className="w-3/5 mx-auto py-8 ">
          <ImageWithURL
            source={{ uri: SuggicalHistoryIcon }}
            className="w-full aspect-[227/227] "
          />
        </View>
        <View className="flex-1 flex flex-row justify-between p-4 py-8">
          <SelectBox
            selected={typeof selected === "boolean" && selected}
            text="Yes"
            onSelect={() => onProceed(true)}
          />
          <SelectBox
            selected={typeof selected === "boolean" && !selected}
            text="No"
            onSelect={() => onProceed(false)}
          />
        </View>
      </View>
    </DoctorFormWrapper>
  );
};

export default SurgicalHistoryScreen;
