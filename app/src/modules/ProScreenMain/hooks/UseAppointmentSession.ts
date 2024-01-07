import { CategoryTypes } from "@modules/Appointments/constants";
import { AppointmentInterface } from "@modules/DoctorFormMain/utils";
import { setSltoInterventionObj } from "@modules/SlotIntervention/utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { shallow } from "zustand/shallow";

export const useAppointmentSession = (
  chiefComplaints: string,
  onSlotBook?: (id: string) => void
) => {
  const [appointment, setAppointmentObj] = useState<AppointmentInterface>();
  const [appId, setAppId] = useState<string>("");
  const { uid, name } = useUserStore(
    (state) => ({ uid: state.user?.uid, name: state.user?.name }),
    shallow
  );
  const [calendlyVisible, setCalendlyVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (appId) {
      firestore()
        .collection("appointments")
        .doc(appId)
        .onSnapshot((remDoc) => {
          if (remDoc.data()) {
            setAppointmentObj(remDoc.data() as AppointmentInterface);
          }
        });
    }
    // else {
    //   setCalendlyVisible(false);
    // }
  }, [appId]);

  // console.log("cal", calendlySessionId);

  // navigate out
  useEffect(() => {
    if (appointment?.status === "SCHEDULED" && appointment.id) {
      setCalendlyVisible(false);

      // if done
      if (onSlotBook) {
        setSltoInterventionObj("none", uid);
        onSlotBook(appointment.id);
      }
    } else if (appointment?.status === "FAILED") {
      setCalendlyVisible(false);
    }
  }, [appointment?.status, appointment?.id]);

  const createAppointmentSession = async (categoryType: CategoryTypes) => {
    if (uid) {
      setCalendlyVisible(true);

      const newDoc: AppointmentInterface = {
        id: uuidv4(),
        patientId: uid,
        name: name ? name : "",
        createdOn: Date.now(),
        // status: '',
        chiefComplaints: chiefComplaints,
        category: categoryType,
      };

      // console.log("newDoc", newDoc);

      await firestore().collection("appointments").doc(newDoc.id).set(newDoc);

      setAppId(newDoc.id);
      weEventTrack("slot_request", {});
    }
  };

  const cancelCalendlySession = () => {
    if (calendlyVisible) {
      setCalendlyVisible(false);
      setAppId("");
    } else {
      navigation.goBack();
    }
  };

  return {
    appointment,
    calendlyVisible,
    cancelCalendlySession,
    createAppointmentSession,
  };
};
