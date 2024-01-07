import { useCohortMembers } from "@hooks/mixpanelCohorts/useCohortMembers";
import { useMixpanelCohort } from "@hooks/mixpanelCohorts/useMixpanelCohort";
import { format } from "date-fns";
import { Button } from "@mui/material";
// import { useMixpanelCohort } from "@hooks/mixpanelCohorts/useMixpanelCohort";
// import { useMixpanelCohorts } from "@hooks/mixpanelCohorts/useMixpanelCohorts";
// import { format } from "date-fns";
import Link from "next/link";

interface Props {
  id: string;
}

const NotificationCohortDashboard: React.FC<Props> = ({ id }) => {
  const { cohort } = useMixpanelCohort(id);
  const { members } = useCohortMembers(id);

  return (
    <div className="m-4">
      {cohort ? (
        <div className="p-4">
          <p className="font-bold pb-1 text-lg">ID: {cohort.cohortId}</p>
          <p className="font-bold pb-1 text-lg">Name: {cohort.cohortName}</p>
          <p>Description: {cohort.cohortDescription}</p>

          <p className="pt-2 text-red-500">members: {cohort.numMembers}</p>
          <p className="pt-2 text-red-500">
            sync: {format(new Date(cohort.lastSync), "dMMM h:mmaaa")}
          </p>

          <div className="flex pt-4">
            <Link href={`/admin/notifications/${cohort.cohortId}/push`}>
              <Button variant="contained">Push</Button>
            </Link>
          </div>
        </div>
      ) : null}

      <div className=" flex flex-row flex-wrap">
        {members.map((item) => {
          return (
            <Link
              key={item.mixpanel_distinct_id}
              href={`/admin/u/${item.user_id}`}
            >
              <div className="p-4 m-4 border w-[300px]">
                <p className="pb-1 text-lg">
                  Name: {item.first_name} {item.last_name}
                </p>
                <p className="pb-1 text-base">UID: {item.user_id}</p>
                {/* <p className="pb-1 text-base">
                mixpanel ID: {item.mixpanel_distinct_id}
              </p> */}
                <p>phone_number: {item.phone_number}</p>
                <p>email: {item.email}</p>
                <p className="pt-2 text-red-500">
                  sync: {format(new Date(item.lastSync), "dMMM h:mmaaa")}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationCohortDashboard;
