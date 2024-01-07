import { View, Text, TouchableOpacity } from "react-native";

import OnSaveLoadingModal from "@modules/PeriodTrackerMain/OnSaveLoading";
import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { savePeriodInRemote } from "./utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StackActions } from "@react-navigation/native";
import { shallow } from "zustand/shallow";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import crashlytics from "@react-native-firebase/crashlytics";

interface Props {}

const SaveElement: React.FC<Props> = ({}) => {
  // const periodDatesFromRemote = user?.periodDates;

  const [loading, setLoading] = useState<boolean>(false);
  // const [minimumEntryNotMet, setMinimumEntryState] = useState<boolean>(false);
  const { state } = useAuthContext();
  const navigation = useNavigation();
  // const [toggled, setToggled] = useState<boolean>(false);

  const [savePending, onChangeSavePending] = useCurrentPeriodStore((state) => [
    state.savePending,
    state.onChangeSavePending,
  ]);
  const selectedDates = useCurrentPeriodStore(
    (state) => state.selectedState,
    shallow
  );
  const onSave = useCurrentPeriodStore((state) => state.onSave);

  const onClose = () => setLoading(false);

  const saveHandler = async () => {
    try {
      if (state.uid) {
        const savedPeriods: string[] = [];
        Object.keys(selectedDates).map((item) => {
          if (selectedDates[item] === "PERIOD") {
            savedPeriods.push(item);
          }
        });

        if (savedPeriods.length > 0) {
          setLoading(true);
          await onSave();
          await savePeriodInRemote(state.uid, savedPeriods);

          setLoading(false);
          navigation.dispatch(StackActions.popToTop());
        } else {
          onChangeSavePending("NEED_ONE_VALUE");
        }

        weEventTrack("calendar_savePeriods", {});
      }

      // navigation.navigate("PeriodTrackerScreen");
    } catch (error: any) {
      console.log("error", error);
      setLoading(false);
      crashlytics().recordError(error);
    }
  };

  return (
    <>
      {savePending !== "NONE" ? (
        <View className="absolute bottom-4 left-0 right-0  bg-transparent">
          <TouchableOpacity
            onPress={saveHandler}
            className="text-white bg-[#6D55D1] w-1/2 mx-auto py-2 rounded-lg"
          >
            <Text className="text-white text-center">
              {savePending === "NEED_ONE_VALUE"
                ? "Select at least 1 date"
                : "Save Dates"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <OnSaveLoadingModal isOpen={loading} onCloseModal={onClose} />
    </>
  );
};

export default SaveElement;
