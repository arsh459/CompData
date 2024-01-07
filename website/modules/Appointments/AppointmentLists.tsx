import {
  AppointmentInterface,
  appointmentStatusType,
} from "@models/Appintment";
import UserListCard from "./UserListCard";
import StatusModal from "./StatusModal";
import { Dispatch, SetStateAction, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebase";

interface Props {
  appointments: AppointmentInterface[];
  setSelected: (val: AppointmentInterface) => void;
  setAppointments: Dispatch<SetStateAction<AppointmentInterface[]>>;
  selected?: AppointmentInterface;
  showDocName: boolean;
}

const AppointmentLists: React.FC<Props> = ({
  appointments,
  setSelected,
  selected,
  setAppointments,
  showDocName,
}) => {
  const [modalApp, setModalApp] = useState<AppointmentInterface>();

  const updateLocalState = (upStatus: appointmentStatusType, id: string) => {
    setAppointments((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, status: upStatus };
        } else {
          return item;
        }
      });
    });
  };

  const onSave = async () => {
    if (modalApp) {
      await updateDoc(doc(db, "appointments", modalApp.id), { status: "DONE" });
      updateLocalState("DONE", modalApp.id);
      setModalApp(undefined);
    }
  };

  const onCancel = async () => {
    if (modalApp) {
      await updateDoc(doc(db, "appointments", modalApp.id), {
        status: "CANCELLED",
      });
      updateLocalState("CANCELLED", modalApp.id);
      setModalApp(undefined);
    }
  };

  const onSchedule = async () => {
    if (modalApp) {
      await updateDoc(doc(db, "appointments", modalApp.id), {
        status: "SCHEDULED",
      });
      updateLocalState("SCHEDULED", modalApp.id);
      setModalApp(undefined);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="text-[#23262F] text-xl font-qsB pl-4 pb-4 capitalize">
          My Upcoming appointments
        </p>
      </div>

      <div>
        {appointments.map((appointment, idx) => (
          <UserListCard
            showDocName={showDocName}
            navOnProfile={false}
            // key={`${appointment.patientId}_${appointment.doctorId}_${idx}`}
            key={appointment.id}
            onClick={() => setSelected(appointment)}
            appointment={appointment}
            isSelected={appointment.id === selected?.id}
            onStatysClick={() => setModalApp(appointment)}
          />
        ))}
      </div>

      <StatusModal
        visible={!!modalApp}
        text="What do you want to do with this"
        onCancel={onCancel}
        onProceed={onSave}
        onSchedule={onSchedule}
        ctaCancel="Cancel"
        ctaProceed="Done"
        scheduleCTA="Schedule"
        ctaCancelColor="#FF4545"
        ctaProceedColor="#18A800"
        isActive={
          modalApp?.status === "CANCELLED"
            ? "cancel"
            : modalApp?.status === "DONE"
            ? "proceed"
            : modalApp?.status === "SCHEDULED"
            ? "later"
            : undefined
        }
      />
    </>
  );
};

export default AppointmentLists;
