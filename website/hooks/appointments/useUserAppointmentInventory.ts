import { db } from "@config/firebase";
import {
  UserInterface,
  consultationInventory,
  consultationInventoryKeys,
} from "@models/User/User";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useUserAppointmentInventory = (uid?: string) => {
  const [inventory, setInventory] = useState<consultationInventory>({
    nbDietConsultationsDone: 0,
    nbDietConsultationsTotal: 0,
    nbDoctorConsultationsDone: 0,
    nbDoctorConsultationsTotal: 0,
  });

  useEffect(() => {
    const handleUserInventory = async () => {
      if (uid) {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.data()) {
          const userObj = userDoc.data() as UserInterface;
          if (userObj.consultations) {
            setInventory(userObj.consultations);
          }
        }
      }
    };

    handleUserInventory();
  }, [uid]);

  const onUpdateInventoryValue = (
    key: consultationInventoryKeys,
    value: number
  ) => {
    setInventory((prev) => {
      if (prev) {
        return {
          ...prev,
          [key as consultationInventoryKeys]: value,
        };
      }

      return prev;
    });
  };

  const onSave = async () => {
    if (uid) {
      await updateDoc(doc(db, "users", uid), {
        consultations: inventory,
      });
    }
  };

  return {
    onUpdateInventoryValue,
    inventory,
    onSave,
  };
};
