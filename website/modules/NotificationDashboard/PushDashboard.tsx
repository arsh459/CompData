import { useMixpanelCohort } from "@hooks/mixpanelCohorts/useMixpanelCohort";
import { format } from "date-fns";
import { Button } from "@mui/material";
import { useNotificationTemplates } from "@hooks/notifications/useNotificationTemplates";
import NotificationCohortMap from "./NotifactionCohortMap";
import AllNotificationList from "./AllNotificationList";

interface Props {
  id: string;
}

const PushDashboard: React.FC<Props> = ({ id }) => {
  const { cohort, updateCohort, toggleNotificationToCohort } =
    useMixpanelCohort(id);
  //   const { members } = useCohortMembers(id);

  const { notificationTemplates, notificationTemplateMap } =
    useNotificationTemplates();

  // const pushNotification = (id: string) => {};

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

          <div className="flex pt-4">
            <Button variant="contained" onClick={updateCohort}>
              Save Cohort
            </Button>
          </div>

          <div>
            <NotificationCohortMap
              cohort={cohort}
              notifications={notificationTemplateMap}
              toggle={toggleNotificationToCohort}
              // pushNow={pushNotification}
            />
          </div>
        </div>
      ) : null}

      {cohort?.cohortId ? (
        <div className="pt-4">
          <AllNotificationList
            notifications={notificationTemplates}
            toggle={toggleNotificationToCohort}
            cohortId={cohort?.cohortId}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PushDashboard;
