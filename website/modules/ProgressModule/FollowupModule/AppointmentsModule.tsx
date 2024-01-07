import { blackFlameIcon, docIcon } from "@constants/icons/iconURLs";
import ProgressLog from "../Components/ProgressLog";
import { useUserLastAppointment } from "@hooks/appointments/useUserLastAppointment";
import { format } from "date-fns";

interface Props {
  uid?: string;
}

const AppointmentsModule: React.FC<Props> = ({ uid }) => {
  const { appointment } = useUserLastAppointment(uid);

  return (
    <div className="flex sm:flex-row flex-col">
      <div className="flex-1">
        <ProgressLog
          color="#FFE5F2"
          text="Appointments"
          // subText={weight?.weight ? `Last Tracked ${weight.weight}kg` : "-"}

          subText={
            appointment?.startSlot
              ? `Last booked for ${format(
                  new Date(appointment.startSlot),
                  "hh:mma dd MMM yyyy"
                )}${appointment.category ? ` | ${appointment.category}` : ""}`
              : "Book an appointment"
          }
          imgUrl={docIcon}
          linkToNavigate={`appointments`}
          baseLink={`/admin/patients/${uid}`}
        />
      </div>
      <div className="flex-1">
        <ProgressLog
          color="#FFE5F2"
          text="Flags to update"
          imgUrl={blackFlameIcon}
          subText={"Update onboarding & relevant user flags"}
          //   imgUrl={docIcon}
          linkToNavigate={`flags`}
          baseLink={`/admin/patients/${uid}`}
        />
      </div>
    </div>
  );
};

export default AppointmentsModule;
