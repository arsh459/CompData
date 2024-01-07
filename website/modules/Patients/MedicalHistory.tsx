import { useState } from "react";
import MedicalHistoryElement from "./MedicalHistoryElement";
import ListExpander from "./Components/ListExpander";
import { UserInterface } from "@models/User/User";
import {
  getCommaSepratedIssues,
  getLastPCOSDate,
} from "@modules/Appointments/utils";
import { AppointmentInterface } from "@models/Appintment";
// import DownloadViewer from "./Components/DownloadViewer";
import { format } from "date-fns";
import { getHeight } from "@templates/joinBoatTemplate/V5/Components/utils";
import { EditObject } from "@templates/PatientProfileTemplate/ProfileEdit/interface";
import { getMedicalHistroyEditObject } from "./utils/MedicalHistoryUtils";

interface Props {
  user?: UserInterface;
  appointment?: AppointmentInterface;
  color: string;
  highlightColor: string;
  onEdit?: (val: EditObject) => void;
}

const MedicalHistory: React.FC<Props> = ({
  user,
  appointment,
  color,
  highlightColor,
  onEdit,
}) => {
  const [show, setShow] = useState(false);
  // const [showReports, setShowReports] = useState(false);

  // const onExpand = () => {
  //   setShow((p) => !p);
  //   setShowReports(false);
  // };

  const healthIssues = getCommaSepratedIssues(
    user?.dietForm?.dailyIssues as Record<string, boolean>,
    user?.dietForm?.dailyIssuesText
  );
  const lastDiagDate = getLastPCOSDate(
    user?.diagnosedPeriod,
    user?.authSignupTime
  );
  const familyIssues = getCommaSepratedIssues(
    user?.dietForm?.familyHistory,
    user?.dietForm?.familyHistoryText
  );
  const surgicalIssues = `${user?.doctorForm?.surgicalHistory ? "Yes" : "No"}${
    user?.doctorForm?.surgeryBrief ? `, ${user?.doctorForm?.surgeryBrief}` : ""
  }`;
  const dueDate = user?.doctorForm?.pregnancyDate
    ? format(new Date(user?.doctorForm?.pregnancyDate), "do MMMM yy")
    : "NA";

  const handleEdit = onEdit
    ? () => {
        onEdit(getMedicalHistroyEditObject(user, appointment));
      }
    : undefined;

  return (
    <ListExpander
      onExpand={() => setShow((p) => !p)}
      show={show}
      headingText="Medical History"
      color={color}
      highlightColor={highlightColor}
      onEdit={handleEdit}
    >
      {show ? (
        <>
          <div className="bg-black/10 h-px w-full" />
          {/* <div className="p-4 flex items-center">
            <p className="text-xs font-popM text-black/70">Diagnosis detail:</p>
            <p className="text-black/30 text-xs pl-4 font-popR">
              {appointment?.prescriptionData?.diagnosis || "NA"}
            </p>
          </div> */}
          {/* <MedicalHistoryElement
            primary="Surgical History:"
            secondary={getBooleanStringData(
              user?.doctorForm?.surgicalHistory,
              user?.doctorForm?.surgeryBrief
            )}
            borderTw="border-b  md:border-none "
          /> */}

          <MedicalHistoryElement
            primary="Health Issues :"
            secondary={healthIssues}
            borderTw="border-b   "
          />
          <MedicalHistoryElement
            primary="Family disease :"
            secondary={familyIssues}
            borderTw="border-b"
          />
          <MedicalHistoryElement
            primary="Surgical history :"
            secondary={surgicalIssues}
            borderTw="border-b"
          />
          <MedicalHistoryElement
            primary="Last due Date :"
            secondary={dueDate}
            borderTw="border-b"
          />
          <MedicalHistoryElement
            primary="Approx PCOS diagnosed date:"
            secondary={lastDiagDate}
            borderTw="md:border-b-0 border-b"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:border-y border-black/10 md:mb-6">
            {/* <MedicalHistoryElement
              primary="Health Issues :"
              secondary={healthIssues}
              borderTw="border-b  md:border-none "
            />
            <MedicalHistoryElement
              primary="Family disease :"
              secondary={familyIssues}
              borderTw="border-b  md:border-l md:border-b-0"
            />
            <MedicalHistoryElement
              primary="Last due Date :"
              secondary={dueDate}
              borderTw="border-b  md:border-none  md:pt-0"
            />
            <MedicalHistoryElement
              primary="Surgical history :"
              secondary={surgicalIssues}
              borderTw="md:border-l md:border-b-0 md:pt-0"
            /> */}
            <MedicalHistoryElement
              primary="Weight :"
              secondary={`${user?.weight} kgs ${
                user?.desiredWeight ? `-> ${user?.desiredWeight} Kgs` : ""
              }`}
              borderTw="md:border-l md:border-b-0 "
            />
            <MedicalHistoryElement
              primary="Height :"
              secondary={getHeight(user?.height || 0)}
              borderTw="md:border-l md:border-b-0 "
            />
          </div>
          {/* {showReports ? (
            <DownloadViewer
              color={highlightColor}
              onClickExpander={() => setShowReports(false)}
              user={user}
            />
          ) : (
            <div
              onClick={() => setShowReports(true)}
              className="rounded-lg border p-3.5 pb-4 md:py-1.5  md:rounded-full m-2 md:w-fit md:mx-auto md:px-10 "
              style={{ borderColor: highlightColor }}
            >
              <p
                className="cursor-pointer text-center   text-base font-popR"
                style={{ color: highlightColor }}
              >
                View past reports
              </p>
            </div>
          )} */}
        </>
      ) : null}
    </ListExpander>
  );
};

export default MedicalHistory;
