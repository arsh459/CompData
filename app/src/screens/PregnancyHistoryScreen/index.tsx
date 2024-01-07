import { View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateUserField } from "@modules/LifeStyleMain/utils";
import ImageWithURL from "@components/ImageWithURL";
import { BeenPregnantIcon } from "@constants/imageKitURL";
import SelectBox from "@modules/DoctorFormMain/SelectBox";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { ReinitParams } from "@modules/NutritionSettingMain";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import DoctorFormWrapper from "@modules/DoctorFormMain/DoctorFormWrapper";

const PregnancyHistoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as ReinitParams;

  const { uid, pregnantHistoryDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      pregnantHistoryDB: user?.doctorForm?.pregnantHistory,
    };
  }, shallow);

  const [selected, setSelected] = useState<boolean>();

  useEffect(() => {
    if (typeof pregnantHistoryDB !== "undefined" && !params.reinit) {
      setSelected(pregnantHistoryDB);
    }
  }, [pregnantHistoryDB]);

  const onProceed = async (val: boolean) => {
    setSelected(val);

    if (pregnantHistoryDB !== val) {
      await updateUserField(uid, {
        [`doctorForm.pregnantHistory`]: val,
        [`doctorForm.pregnancyDate`]: undefined,
      });
    }

    if (val) {
      navigation.navigate("PregnantDateLogScreen", {
        reinit: params?.reinit,
        isGoback: params?.isGoback,
      });
    } else {
      if (params?.isGoback && navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate("SurgicalHistoryScreen", {
          reinit: true,
          isGoback: false,
        });
      }
    }
    weEventTrack("medicalProfile_logPregnancy", {
      pregnancyHistory: val ? 1 : 0,
    });
  };

  return (
    <DoctorFormWrapper
      headingProgress="Medical Profile"
      progress={1 / 5}
      heading="Have you been pregnant before?"
    >
      <View className="flex-1 px-4">
        <View className="w-3/5 mx-auto py-8 ">
          <ImageWithURL
            source={{ uri: BeenPregnantIcon }}
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

export default PregnancyHistoryScreen;
