import { UserInterface } from "@models/User/User";
import InventoryElement from "./InventoryElement";
import { format } from "date-fns";
import { useUserUpcomingAppointments } from "@hooks/appointments/useUserUpcomingAppointments";

interface Props {
  user: UserInterface;
}

const ViewAppointmentsInventory: React.FC<Props> = ({ user }) => {
  const { latestAppointments } = useUserUpcomingAppointments(user.uid);

  // console.log("latestAppointments", latestAppointments);

  const docCount =
    typeof user.consultations?.nbDoctorConsultationsTotal === "number"
      ? user.consultations?.nbDoctorConsultationsTotal
      : "-";
  const dietCount =
    typeof user.consultations?.nbDietConsultationsTotal === "number"
      ? user.consultations?.nbDietConsultationsTotal
      : "-";

  const docCountDone =
    typeof user.consultations?.nbDietConsultationsDone === "number"
      ? user.consultations?.nbDietConsultationsDone
      : "-";
  const dietCountDone =
    typeof user.consultations?.nbDietConsultationsDone === "number"
      ? user.consultations?.nbDietConsultationsDone
      : "-";

  const nextDietCons = latestAppointments.nutrtitionist?.startSlot
    ? format(
        new Date(latestAppointments.nutrtitionist?.startSlot),
        "hh:mm dd MMM yy"
      )
    : "-";

  const nextDocCons = latestAppointments.gynaecologist?.startSlot
    ? format(
        new Date(latestAppointments.gynaecologist?.startSlot),
        "hh:mm dd MMM yy"
      )
    : "-";

  return (
    <div className="flex justify-evenly">
      <InventoryElement count={`${docCountDone}/${docCount}`} label="Doc" />
      <InventoryElement count={`${dietCountDone}/${dietCount}`} label="Diet" />
      <InventoryElement count={nextDocCons} label="Next Doc" />
      <InventoryElement count={nextDietCons} label="Next Diet" />
    </div>
  );
};

export default ViewAppointmentsInventory;
