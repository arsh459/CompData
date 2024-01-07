import React, { useState } from "react";
import MedicalHistoryElement from "./MedicalHistoryElement";
import ListExpander from "./Components/ListExpander";
import { UserInterface } from "@models/User/User";
// import { getTrueKeysString } from "@modules/Appointments/utils";
// import DownloadViewer from "./Components/DownloadViewer";

interface Props {
  user?: UserInterface;
  //   appointment?: AppointmentInterface;
  color: string;
  highlightColor: string;
}

const LeadgenDetails: React.FC<Props> = ({
  user,
  //   appointment,
  color,
  highlightColor,
}) => {
  const [show, setShow] = useState(false);
  // const [showReports, setShowReports] = useState(false);

  const onExpand = () => {
    setShow((p) => !p);
    // setShowReports(false);
  };

  // const accurateGoal = getTrueKeysString(
  //   user?.accurateGoal as Record<string, boolean> | undefined
  // );

  // const healthString = getTrueKeysString(
  //   user?.dailyHealthIssues as Record<string, boolean> | undefined
  // );

  // const pastInterventions = getTrueKeysString(
  //   user?.pastUsedMethod as Record<string, boolean> | undefined
  // );

  // const busyString = getTrueKeysString(
  //   user?.howBusy as Record<string, boolean> | undefined
  // );

  return (
    <ListExpander
      onExpand={onExpand}
      show={show}
      headingText="Acquisition Details"
      color={color}
    >
      {show ? (
        <>
          <div className="bg-black/10 h-px w-full" />
          {/* <p className="text-black/30 text-xs font-popR px-4 py-3">
            {appointment?.prescriptionData?.diagnosis}
          </p> */}

          {/* <MedicalHistoryElement
            primary="Approx PCOS diagnosed date:"
            secondary={lastDiagDate}
            borderTw="border-b  md:border-none "
          /> */}
          <MedicalHistoryElement
            primary="Phone:"
            secondary={user?.phone}
            borderTw="border-b   "
            // borderTw="border-b  md:border-none "
          />
          <MedicalHistoryElement
            primary="Email:"
            secondary={user?.email}
            borderTw="md:border-none"
            // borderTw="border-b  md:border-l md:border-b-0"
          />
          {/* <div className="grid  grid-cols-1 sm:grid-cols-2 md:border-y border-black/10 md:mb-6">
            <MedicalHistoryElement
              primary="Leadgen Goal :"
              secondary={accurateGoal ? accurateGoal : "NA"}
              borderTw="border-b  md:border-none  md:pt-0"
            />
            <MedicalHistoryElement
              primary="Leadgen health conditions :"
              secondary={healthString ? healthString : "NA"}
              borderTw="md:border-l md:border-b-0 md:pt-0"
            />
            <MedicalHistoryElement
              primary="Tried in past :"
              secondary={pastInterventions ? pastInterventions : "NA"}
              borderTw="border-b  md:border-none  md:pt-0"
            />
            <MedicalHistoryElement
              primary="How busy? :"
              secondary={busyString ? busyString : "NA"}
              borderTw="md:border-l md:border-b-0 md:pt-0"
            />
            <MedicalHistoryElement
              primary="Can pay? :"
              secondary={
                user?.isOkWithPaidPlan
                  ? "YES"
                  : user?.isOkWithPaidPlan === false
                  ? "NO"
                  : "NA"
              }
              borderTw="border-b  md:border-none  md:pt-0"
            />
          </div> */}
        </>
      ) : null}
    </ListExpander>
  );
};

export default LeadgenDetails;
