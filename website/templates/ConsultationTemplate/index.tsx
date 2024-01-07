import { UserInterface } from "@models/User/User";
import { getUserListCardColors } from "@modules/Appointments/utils";
import ConsultationHeader from "@modules/Consultation/Components/ConsultationHeader";
import DetailsToggle from "@modules/Consultation/Components/DetailsToggle";
import PatientHeader from "@modules/Consultation/Components/PatientHeader";
import PrescriptionComp from "@modules/Consultation/Components/PrescriptionComp";
import { useState } from "react";
import Wrapper from "./Wrapper";
import { getUserFitnessGoal } from "@models/User/parseUtils";
import { useAppointment } from "@hooks/appointments/useAppointment";
import { Prescription } from "@models/Appintment";
import LoadingModal from "@components/loading/LoadingModal";
import ProfileForm from "@templates/PatientProfileTemplate/ProfileForm";
import { useUserV2 } from "@hooks/auth/useUserV2";

interface Props {
  doctor: UserInterface;
  appointmentId: string;
  canEdit: boolean;
}

export type consultationType = "Overview" | "Prescription";

const ConsultationTemplate: React.FC<Props> = ({
  doctor,
  appointmentId,
  canEdit,
}) => {
  const { loading, appointment, setAppointment, onSave } =
    useAppointment(appointmentId);

  const userObjInt = useUserV2(appointment?.patientId);

  const goal = getUserFitnessGoal(userObjInt.user);
  const color = getUserListCardColors(goal).textColor;

  const [selected, setSelected] = useState<{
    [id in consultationType]: string;
  }>({ Overview: "block", Prescription: "hidden" });

  const selectOverview = () => {
    setSelected({ Overview: "block", Prescription: "hidden" });
  };

  const selectPrescription = () => {
    setSelected({ Overview: "hidden", Prescription: "block" });
  };

  const setNextFollowupDate = (nextFollowupDate: string) => {
    setAppointment((prev) => {
      if (prev) {
        return { ...prev, nextFollowupDate };
      }
    });
  };

  const setNextFollowupDateNote = (nextFollowupDateNote: string) => {
    setAppointment((prev) => {
      if (prev) {
        return { ...prev, nextFollowupDateNote: nextFollowupDateNote };
      }
    });
  };

  const setPrescriptionData = (prescriptionData: Prescription) => {
    setAppointment((prev) => {
      if (prev) {
        return { ...prev, prescriptionData };
      }
    });
  };

  return (
    <div className="w-screen min-h-screen">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <ConsultationHeader />

        <div
          className="p-2 rounded-3xl border"
          style={{ backgroundColor: `${color}1a`, borderColor: `${color}1a` }}
        >
          <PatientHeader
            appointment={appointment}
            user={userObjInt.user}
            color={color}
            onSave={onSave}
          />

          <div className="lg:hidden">
            <DetailsToggle
              onClickOverview={selectOverview}
              onClickPrescription={selectPrescription}
              selected={
                selected["Prescription"] === "block"
                  ? "Prescription"
                  : "Overview"
              }
            />
          </div>

          <div className="flex-1 flex items-start m-2 sm:m-4 mt-4 sm:mt-6 gap-6 sm:gap-8">
            <Wrapper
              color={color}
              selected={selected["Overview"]}
              heading="Overview"
              classStr="flex-1 lg:flex-[0.4]"
              paddingStr="py-4"
            >
              <div className="px-4 pb-4">
                <p className="font-popM text-sm text-black/70 pr-1">
                  Chief Complaints:
                </p>
                <p className="font-popR text-xs text-black/30 pt-2">
                  {appointment?.chiefComplaints
                    ? appointment?.chiefComplaints
                    : "NA"}
                </p>
              </div>
              <ProfileForm
                appointment={appointment}
                user={userObjInt.user}
                color="rgba(255, 255, 255, 0.25)"
                highlightColor={color}
                canEdit={canEdit}
                isPrescription={true}
              />
            </Wrapper>
            <Wrapper
              color={color}
              selected={selected["Prescription"]}
              heading="Prescription"
              classStr="flex-1 lg:flex-[0.6]"
            >
              <PrescriptionComp
                color={color}
                nextFollowupDate={appointment?.nextFollowupDate}
                nextFollowupDateNote={appointment?.nextFollowupDateNote}
                prescriptionData={appointment?.prescriptionData}
                setNextFollowupDate={setNextFollowupDate}
                setPrescriptionData={setPrescriptionData}
                setFollowupNote={setNextFollowupDateNote}
              />
            </Wrapper>
          </div>
        </div>
        <div className="h-10" />
      </div>

      {loading ? (
        <LoadingModal fixed={true} fill="#ff735c" height={50} width={50} />
      ) : null}
    </div>
  );
};

export default ConsultationTemplate;
