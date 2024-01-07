import { symptomId } from "@models/User/symptoms";
import PeriodOnboardWrapper from "@modules/PeriodStartJourney/PeriodOnboardWrapper";
import { savePeriodTrackerObj } from "@modules/PeriodStartJourney/utils";
import SymptomCard from "@modules/PeriodTrackerMain/SymptomCard";
import { symptomsList } from "@modules/PeriodTrackerMain/constants";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";

interface Props {
  isGoback?: boolean;
  duringPeriod?: boolean;
}

const PeriodSymptoms: React.FC<Props> = ({ isGoback, duringPeriod }) => {
  const { user } = useUserContext();
  const { navigate } = useNavigation();
  const intialVal = duringPeriod
    ? user?.periodTrackerObj?.symptomsDuringPeriod
    : user?.periodTrackerObj?.symptomsBeforePeriod;
  const [symptoms, setSymptoms] = useState<symptomId[] | undefined>(intialVal);

  const toggleSymptom = (id: symptomId) => {
    setSymptoms((prev) => {
      if (prev) {
        if (prev.includes(id)) {
          return prev.filter((each) => each !== id);
        } else {
          return [...prev, id];
        }
      } else {
        return [id];
      }
    });
  };

  const handleNext = async () => {
    weEventTrack("periodflow_clickSet", {});

    if (symptoms && symptoms.length) {
      await savePeriodTrackerObj(
        duringPeriod
          ? { ...user?.periodTrackerObj, symptomsDuringPeriod: symptoms }
          : { ...user?.periodTrackerObj, symptomsBeforePeriod: symptoms },
        user?.uid
      );
    }

    isGoback
      ? navigate("PeriodOnboardSettingScreen")
      : duringPeriod
      ? navigate("AddCurrentPeriodLength")
      : navigate("PeriodCalenderLogScreen", {
          title: "Add your last period",
          isEditable: true,
        });
  };

  return (
    <PeriodOnboardWrapper
      onNext={symptoms && symptoms.length ? handleNext : undefined}
      progress={(duringPeriod ? 2 : 3) / 3}
      nextBtnText={isGoback ? "Save" : "Next"}
    >
      {duringPeriod ? (
        <Text
          className="text-white text-xl p-4"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Are there any particular{" "}
          <Text className="text-[#19C8FF]">
            symptoms you face during your period?
          </Text>
        </Text>
      ) : (
        <Text
          className="text-white text-xl p-4"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Do you face any of the following{" "}
          <Text className="text-[#C79BFF]">
            symptom just before your period?
          </Text>
        </Text>
      )}
      <View className="flex flex-row flex-wrap">
        {symptomsList.map((item) => {
          const isSelected = symptoms?.includes(item.id) ? true : false;
          return (
            <View key={item.text} className="relative z-0">
              <SymptomCard
                onPress={() => toggleSymptom(item.id)}
                item={item.text}
                image={item.image}
                isSelected={isSelected}
                textColor="#FFFFFF"
                tagColor={duringPeriod ? "#19C8FF" : "#C79BFF"}
              />
            </View>
          );
        })}
      </View>
    </PeriodOnboardWrapper>
  );
};

export default PeriodSymptoms;
