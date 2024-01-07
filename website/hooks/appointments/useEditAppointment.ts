import { db } from "@config/firebase";
import {
  AppointmentInterface,
  appointmentStatusType,
} from "@models/Appintment";
import { CategoryTypes } from "@templates/CalendlyTemplate/CalendlyTemplateV2";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useEditAppointment = (id?: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<AppointmentInterface>();

  useEffect(() => {
    if (id) {
      setLoading(true);

      const unsub = onSnapshot(doc(db, "appointments", id), (snapshot) => {
        if (snapshot.data()) {
          setAppointment(snapshot.data() as AppointmentInterface);
        }

        setLoading(false);
      });

      return () => unsub();
    }
  }, [id]);

  const updateAppCategory = (cat: CategoryTypes) => {
    setAppointment((prev) => {
      if (prev) {
        return {
          ...prev,
          category: cat,
        };
      }
    });
  };

  const changeDoc = (doctorId: string) => {
    setAppointment((prev) => {
      if (prev) {
        return {
          ...prev,
          doctorId: doctorId,
        };
      }
    });
  };

  const changeStatus = (status: appointmentStatusType) => {
    setAppointment((prev) => {
      if (prev) {
        return {
          ...prev,
          status,
        };
      }
    });
  };
  const onToggleFollowUp = (newVal: boolean) => {
    setAppointment((prev) => {
      if (prev) {
        return {
          ...prev,
          isFollowUp: newVal,
        };
      }
    });
  };
  const onSave = async () => {
    if (id && appointment) {
      setLoading(true);
      await updateDoc(doc(db, "appointments", id), { ...appointment });
      setLoading(false);
    }
  };

  return {
    loading,
    appointment,
    setAppointment,
    onSave,
    changeDoc,
    updateAppCategory,
    changeStatus,
    onToggleFollowUp,
  };
};
