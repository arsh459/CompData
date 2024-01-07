import Link from "next/link";
import { format } from "date-fns";
import {
  appointmentFollowup,
  useFollowupTimeline,
} from "@hooks/followups/useFollowupTimeline";
import { userFollowup } from "@models/User/User";
import { getUserAgentName } from "@modules/Appointments/utils";

interface Props {
  uid: string;
}

const AllFollowupsContainer: React.FC<Props> = ({ uid }) => {
  const { finalList } = useFollowupTimeline(uid);

  return (
    <div className="px-4 pb-1">
      <div className="py-4 flex items-center">
        <p className=" font-medium">Followup Notes</p>

        <div className="pl-4">
          <Link href={`/admin/patients/${uid}/followups/add`}>
            <p className="text-xs underline">Add</p>
          </Link>
        </div>
      </div>

      {/* <div className="pb-4">
        {remoteUser?.lastFollowupTime ? (
          <p className="text-xs font-light">
            Last Followup:{" "}
            {format(new Date(remoteUser.lastFollowupTime), "dd MMM yyyy")}{" "}
          </p>
        ) : null}
        {remoteUser?.nextFollowupTime ? (
          <p className="text-xs font-light">
            Next Followup:{" "}
            {format(new Date(remoteUser.nextFollowupTime), "dd MMM yyyy")}
          </p>
        ) : null}
      </div> */}

      <div className="flex flex-wrap">
        {finalList.map((item) => {
          if (item.fType === "followup") {
            const nowItem = item as userFollowup;
            return (
              <Link
                key={item.id}
                href={`/admin/patients/${uid}/followups/${nowItem.id}`}
              >
                <div className="w-[200px] border bg-gray-100 rounded-lg p-4 mr-4">
                  <p className="text-sm">{nowItem.notes}</p>
                  <p className="text-xs font-light pt-1">
                    {format(new Date(item.time), "hh:mma dd-MM-yy")}
                  </p>
                  <p className="text-xs font-medium pt-1">
                    Agent: {nowItem.followupAgent}
                  </p>
                </div>
              </Link>
            );
          } else {
            const nowItem = item as appointmentFollowup;
            const agentName = getUserAgentName(nowItem.doctorId);
            return (
              <Link
                key={item.id}
                href={`/admin/appointments/${uid}/${nowItem.id}`}
              >
                <div className="w-[200px] border bg-blue-100 rounded-lg p-4 mr-4">
                  <p className="line-clamp-2 text-xs">
                    {nowItem.category} Appointment
                  </p>
                  <div className="py-2 border ">
                    <p className="line-clamp-2 text-xs">
                      chief complaints: {nowItem.chiefComplaints}
                    </p>

                    <p className="line-clamp-2 text-xs py-1">
                      Diagnosis: {nowItem.prescriptionData?.diagnosis}
                    </p>
                  </div>
                  <p className="text-xs font-medium pt-1">
                    {format(new Date(item.time), "hh:mma dd-MM-yy")}
                  </p>
                  <p className="text-xs font-medium pt-1">Agent: {agentName}</p>
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default AllFollowupsContainer;
