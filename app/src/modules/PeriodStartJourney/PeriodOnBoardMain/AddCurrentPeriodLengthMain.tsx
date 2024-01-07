import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import PeriodOnboardWrapper from "../PeriodOnboardWrapper";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "@providers/user/UserProvider";
import { savePeriodTrackerObj } from "../utils";
import { DEFAULT_PERIOD_LENGTH } from "@hooks/chatbot/insights/constants";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
interface Props {
  isGoback?: boolean;
}
const AddCurrentPeriodLengthMain: React.FC<Props> = ({ isGoback }) => {
  const { navigate } = useNavigation();
  const { user } = useUserContext();
  const periodLength = user?.periodTrackerObj?.inputPeriodLength;

  const [value, setValue] = useState(periodLength || DEFAULT_PERIOD_LENGTH);
  const handleNext = async () => {
    weEventTrack("periodPeriodLength_clickNext", {});

    if (periodLength !== value) {
      await savePeriodTrackerObj(
        { ...user?.periodTrackerObj, inputPeriodLength: value },
        user?.uid
      );
    }
    if (isGoback) {
      navigate("PeriodOnboardSettingScreen");
    } else {
      navigate("PeriodCalenderLogScreen", {
        title: "Add your last period",
        isEditable: true,
      });
    }
  };
  return (
    <PeriodOnboardWrapper
      title={`What is your current Period Length?`}
      onNext={handleNext}
      progress={3 / 3}
      disabled={value === 0}
      nextBtnText={isGoback ? "Save" : "Next"}
    >
      <View className="flex flex-row items-center justify-center">
        <TextInput
          // style={{ marginVertical: 10, fontSize: 17 }}
          style={{ fontFamily: "Nunito-Bold" }}
          placeholder="7"
          className="bg-[#343150] text-white p-2.5   flex-[.25] rounded-2xl text-lg text-center"
          cursorColor={"#fff"}
          keyboardType="numeric"
          placeholderTextColor={"#FDFDFD80"}
          autoFocus
          inputMode="numeric"
          onChangeText={(val) => setValue(+val)}
          value={`${value || ""}`}
        />
        <Text
          className="text-white pl-1.5 text-base"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Days
        </Text>
      </View>
      <Text
        className="text-white/80 mx-auto pt-5 w-3/5 text-sm"
        style={{ fontFamily: "Nunito-Medium" }}
      >
        Note: This is the starting value we use to understand your cycle
      </Text>
    </PeriodOnboardWrapper>
  );
};

export default AddCurrentPeriodLengthMain;
