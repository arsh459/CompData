import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import DoctorFormWrapper from "@modules/DoctorFormMain/DoctorFormWrapper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import DateTimePickerModal from "@modules/WorkoutOnboardingMain/DateTimePickerModal";
import { backTwoTimes, updateUserField } from "@modules/LifeStyleMain/utils";
import { ReinitParams } from "@modules/NutritionSettingMain";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const PregnantDateLogScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as ReinitParams;

  const { uid, pregnancyDateDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      pregnancyDateDB: user?.doctorForm?.pregnancyDate,
    };
  }, shallow);

  const [selectedDate, setDate] = useState<Date>(new Date());

  useEffect(() => {
    if (pregnancyDateDB && !params.reinit) {
      setDate(new Date(pregnancyDateDB));
    }
  }, [pregnancyDateDB, params.reinit]);

  const onProceed = async () => {
    const formattedSelected = format(selectedDate, "yyyy-MM-dd");

    await updateUserField(uid, {
      [`doctorForm.pregnancyDate`]: formattedSelected,
    });

    if (params?.isGoback && navigation.canGoBack()) {
      backTwoTimes(navigation);
    } else {
      navigation.navigate("SurgicalHistoryScreen", {
        reinit: true,
        isGoback: false,
      });
    }
  };

  return (
    <DoctorFormWrapper
      headingProgress="Medical Profile"
      progress={2 / 5}
      heading="Your last Delivery Date?"
      btnText="Proceed"
      onNext={onProceed}
      disabled={false}
    >
      <View className="flex-1">
        <View className="flex-1 pt-10">
          <DateTimePickerModal
            value={selectedDate}
            onChange={setDate}
            mode="date"
            containerColor="mx-0"
            textToShow={`Date of your last birth`}
          >
            <View className="flex flex-1 flex-row justify-between bg-[#343150] p-4 px-6 rounded-full">
              <Text className="text-white">
                {format(selectedDate, "do LLL yyyy")}
              </Text>
              <View className="w-3 aspect-square ">
                <ArrowIcon direction="bottom" color="#FFFFFF" />
              </View>
            </View>
          </DateTimePickerModal>
        </View>
      </View>
    </DoctorFormWrapper>
  );
};

export default PregnantDateLogScreen;
