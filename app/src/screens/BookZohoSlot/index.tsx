import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { CategoryTypes } from "@modules/Appointments/constants";
import ConsultationSlot from "@modules/JoinBoatMainV3/components/ConsultationSlot";
import { useRoute } from "@react-navigation/native";

export type postAppointmentNavigation = "HOME" | "BACK" | "AppointmentsScreen";

export interface BookZohoSlotProps {
  category: CategoryTypes;
  nextScreen: "SlotConfirmation" | "AppointmentBookedScreen";
  nextScreenDoneNav: postAppointmentNavigation;
}

const BookZohoSlot = () => {
  const route = useRoute();
  const params = route.params as BookZohoSlotProps;

  useScreenTrack();

  return <ConsultationSlot {...params} />;
};

export default BookZohoSlot;
