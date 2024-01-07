import { useLastCreatedAppointment } from "@hooks/appointments/useLastCreatedAppointment";
// import { useBookedSlots } from "@models/slots/useBookedSlot";
// import { useCalendlySession } from "@templates/CalendlyTemplate/hooks/useCalendlySession";
import { format } from "date-fns";
// import { useRouter } from "next/router";
// import { useRouter } from "next/router";

interface Props {
  uid: string;
}

const CalendlySlot: React.FC<Props> = ({ uid }) => {
  // const { bookedSlot } = useBookedSlots();

  // const { appointment } = useAppointment(appointmentId);
  const { appointment } = useLastCreatedAppointment(uid);
  //   console.log("calendly session", bookedSlot);
  return (
    <div className="w-full ">
      <img
        src="https://ik.imagekit.io/socialboat/Slice%206_1dTD7QS5y.png?updatedAt=1690461676069"
        alt="img to book callback"
        className="w-full h-full"
      />
      <p className="font-nunitoB text-3xl text-[#f1f1f1] pt-14">
        Your consultation time is blocked{" "}
        {appointment?.startSlot && appointment?.endSlot ? (
          <span className="text-[#51FF8C]">
            at {format(new Date(appointment?.startSlot), "hh:mm a")}
            {", "}
            {format(new Date(appointment?.endSlot), "dd MMM yyyy")}
          </span>
        ) : null}
      </p>
      <p className="text-white/50 font-popR text-sm pt-3">
        You will get a call from our expert at the above time. In the meantime,
        you can browse a free workout plan and hundreds of recipees on our app
      </p>
    </div>
  );
};
export default CalendlySlot;
