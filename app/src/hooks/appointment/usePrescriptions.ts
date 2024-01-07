import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useUserStore } from "@providers/user/store/useUserStore";
import { AppointmentInterface } from "@modules/DoctorFormMain/utils";

export const usePrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<AppointmentInterface[]>(
    []
  );
  const [lastPrescriptionDoc, setLastPrescriptionDoc] =
    useState<FirebaseFirestoreTypes.DocumentData>();
  const { userId } = useUserStore(({ user }) => {
    return {
      userId: user?.uid,
    };
  });

  useEffect(() => {
    const getPrescriptions = async () => {
      let query: FirebaseFirestoreTypes.Query = firestore()
        .collection("appointments")
        .where("patientId", "==", userId)
        .where("category", "==", "gynaecologist")
        .where("status", "==", "DONE")
        .orderBy("startSlot", "desc")
        .limit(5);

      try {
        const prescriptionDoc = await query.get();
        setLastPrescriptionDoc(
          prescriptionDoc.docs[prescriptionDoc.docs.length - 1]
        );
        const tempPrescription: AppointmentInterface[] = [];
        prescriptionDoc.forEach((doc) => {
          const prescriptionData = doc.data() as AppointmentInterface;
          tempPrescription.push(prescriptionData);
        });
        setPrescriptions(tempPrescription);
      } catch (e) {
        console.log("error in fetching prescription", e);
      }
    };

    getPrescriptions();
  }, [userId]);

  const onNextPrescription = async () => {
    if (lastPrescriptionDoc) {
      let query: FirebaseFirestoreTypes.Query = firestore()
        .collection("appointments")
        .where("patientId", "==", userId)
        .where("category", "==", "gynaecologist")
        .where("status", "==", "DONE")
        .orderBy("startSlot", "desc")
        .startAfter(lastPrescriptionDoc)
        .limit(5);

      try {
        const prescriptionDoc = await query.get();
        if (prescriptionDoc.docs.length) {
          setLastPrescriptionDoc(
            prescriptionDoc.docs[prescriptionDoc.docs.length - 1]
          );
          const tempPrescription: AppointmentInterface[] = [];
          prescriptionDoc.forEach((doc) => {
            const prescriptionData = doc.data() as AppointmentInterface;
            tempPrescription.push(prescriptionData);
          });
          setPrescriptions((prev) => [...prev, ...tempPrescription]);
        }
      } catch (e) {
        console.log(e, "error in fetching next in pagination");
      }
    }
  };

  return { prescriptions, onNextPrescription };
};
