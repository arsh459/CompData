import { UserInterface } from "@models/User/User";
import PatientCard from "./PatientCard";
import { useUserLastAppointment } from "@hooks/appointments/useUserLastAppointment";
import { format } from "date-fns";

interface Props {
  patient: UserInterface;
}

const PatientCardWrapper: React.FC<Props> = ({ patient }) => {
  const { appointment } = useUserLastAppointment(patient.uid);
  const time = appointment?.createdOn
    ? format(appointment.createdOn, "dd MMM yyyy")
    : "";

  //   console.log("time", appointment?.createdOn);
  return (
    <PatientCard
      showDoc={true}
      patient={patient}
      time={time}
      //   key={patient.uid}
    />
  );
};

export default PatientCardWrapper;
