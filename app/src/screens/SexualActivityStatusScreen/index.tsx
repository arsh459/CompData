import { View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import DoctorFormWrapper from "@modules/DoctorFormMain/DoctorFormWrapper";
import ImageWithURL from "@components/ImageWithURL";
import { SexualStatusIcon } from "@constants/imageKitURL";
import SelectBox from "@modules/DoctorFormMain/SelectBox";
import { updateUserField } from "@modules/LifeStyleMain/utils";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { ReinitParams } from "@modules/NutritionSettingMain";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const SexualActivityStatusScreen = () => {
  useScreenTrack();
  const route = useRoute();
  const params = route.params as ReinitParams;
  const navigation = useNavigation();

  const { uid, sexuallyActiveDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      sexuallyActiveDB: user?.doctorForm?.sexuallyActive,
    };
  }, shallow);

  const [selected, setSelected] = useState<boolean>();

  useEffect(() => {
    if (typeof sexuallyActiveDB !== "undefined" && !params.reinit) {
      setSelected(sexuallyActiveDB);
    }
  }, [sexuallyActiveDB, params.reinit]);

  const onProceed = async (val: boolean) => {
    setSelected(val);

    await updateUserField(uid, {
      [`doctorForm.sexuallyActive`]: val,
    });

    weEventTrack("medicalProfile_addSurgerHistoryText", {});

    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("ChiefComplaintLogScreen");
    }
  };
  return (
    <DoctorFormWrapper
      headingProgress="Medical Profile"
      progress={4 / 5}
      heading="Were you sexually active in the previous month?"
    >
      <View className="flex-1 px-4">
        <View className="w-3/5 mx-auto py-8 ">
          <ImageWithURL
            source={{ uri: SexualStatusIcon }}
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

export default SexualActivityStatusScreen;
