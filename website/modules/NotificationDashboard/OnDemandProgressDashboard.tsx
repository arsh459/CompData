import { useMixpanelCohort } from "@hooks/mixpanelCohorts/useMixpanelCohort";
import { format } from "date-fns";
import { Button } from "@mui/material";
import { useNotificationTemplate } from "@hooks/notifications/useNotificationTemplate";
import NotificationCard from "./NotificationCard";
import { useState } from "react";
import axios from "axios";

interface Props {
  templateId: string;
  cohortId: string;
}

const OnDemandProgressDashboard: React.FC<Props> = ({
  cohortId,
  templateId,
}) => {
  const { cohort } = useMixpanelCohort(cohortId);
  //   const { members } = useCohortMembers(id);

  const { notificationTemplate } = useNotificationTemplate(templateId);

  const [progress, setProgress] = useState<
    "PENDING" | "LOADING" | "SUCCESS" | "FAILED"
  >("PENDING");

  const pushNotification = async () => {
    setProgress("LOADING");

    try {
      await axios({
        url: "/api/notifications",
        method: "POST",
        data: {
          cohortId,
          templateId,
        },
      });
      setProgress("SUCCESS");
    } catch (error) {
      console.log("error");
      setProgress("FAILED");
    }
  };

  return (
    <div className="m-4">
      {cohort ? (
        <div className="p-4 border">
          <p className="font-bold pb-1 text-lg">ID: {cohort.cohortId}</p>
          <p className="font-bold pb-1 text-lg">Name: {cohort.cohortName}</p>
          <p>Description: {cohort.cohortDescription}</p>

          <p className="pt-2 text-red-500">members: {cohort.numMembers}</p>
          <p className="pt-2 text-red-500">
            sync: {format(new Date(cohort.lastSync), "dMMM h:mmaaa")}
          </p>

          {progress === "PENDING" || progress === "FAILED" ? (
            <div className="flex pt-4">
              <Button variant="contained" onClick={pushNotification}>
                Send Push Now
              </Button>
            </div>
          ) : progress === "LOADING" ? (
            <p>LOADING</p>
          ) : progress === "SUCCESS" ? (
            <p>Success.</p>
          ) : null}
        </div>
      ) : null}

      <div className="pt-4">
        <NotificationCard
          item={notificationTemplate.id}
          notObj={notificationTemplate}
        />
      </div>
    </div>
  );
};

export default OnDemandProgressDashboard;
