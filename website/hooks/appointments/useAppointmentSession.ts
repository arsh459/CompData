import { db } from "@config/firebase";
import { AppointmentInterface } from "@models/Appintment";
import { CategoryTypes } from "@templates/CalendlyTemplate/CalendlyTemplateV2";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

export const useAppointmentSession = (uid?: string, name?: string) => {
  // const [appointment, setAppointmentObj] = useState<AppointmentInterface>();

  // const [appId, setAppId] = useState<string>("");

  const [calendlyVisible, setCalendlyVisible] = useState<boolean>(false);

  // useEffect(() => {
  //   if (appId) {
  //     firestore()
  //       .collection("appointments")
  //       .doc(appId)
  //       .onSnapshot((remDoc) => {
  //         if (remDoc.data()) {
  //           setAppointmentObj(remDoc.data() as AppointmentInterface);
  //         }
  //       });
  //   }
  //   // else {
  //   //   setCalendlyVisible(false);
  //   // }
  // }, [appId]);

  // console.log("cal", calendlySessionId);

  // navigate out
  // useEffect(() => {
  //   if (appointment?.status === "SCHEDULED") {
  //     setCalendlyVisible(false);

  //     // if done
  //     if (onSlotBook) {
  //       onSlotBook();
  //     }
  //   } else if (appointment?.status === "FAILED") {
  //     setCalendlyVisible(false);
  //   }
  // }, [appointment?.status]);

  const router = useRouter();

  const createAppointmentSession = async (categoryType: CategoryTypes) => {
    if (uid) {
      setCalendlyVisible(true);
      console.log("hi", categoryType);
      const newDoc: AppointmentInterface = {
        id: uuidv4(),
        patientId: uid,
        name: name ? name : "",
        createdOn: Date.now(),
        // status: '',
        chiefComplaints: "",
        category: categoryType,
      };

      console.log("newDoc", newDoc);

      await setDoc(doc(db, "appointments", newDoc.id), newDoc);

      if (categoryType === "sales") {
        router.push("/consultation?appType=sales&navBack=1");
      } else {
        router.push(
          `/calendlyV2?appointmentId=${newDoc.id}&height=800&appType=${categoryType}`
        );
      }

      // setAppId(newDoc.id);
    }
  };

  const cancelCalendlySession = () => {
    if (calendlyVisible) {
      setCalendlyVisible(false);
      // setAppId("");
    }
  };

  return {
    // appointment,
    calendlyVisible,
    cancelCalendlySession,
    createAppointmentSession,
  };
};
