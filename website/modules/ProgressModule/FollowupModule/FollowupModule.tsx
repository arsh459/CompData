import { useFollowups } from "@hooks/followups/useFollowups";
import { UserInterface } from "@models/User/User";
import { format } from "date-fns";
import ProgressLog from "../Components/ProgressLog";
import { whatsAppIcon } from "@constants/icons/iconURLs";

interface Props {
  remoteUser?: UserInterface;
}

const FollowupModule: React.FC<Props> = ({ remoteUser }) => {
  const { followups } = useFollowups(remoteUser?.uid);

  return (
    <div className="flex sm:flex-row flex-col">
      <div className="flex-1">
        <ProgressLog
          color="#FFE5F2"
          text="Followups"
          // subText={weight?.weight ? `Last Tracked ${weight.weight}kg` : "-"}

          subText={
            followups.length && followups[0]
              ? `Last followup on ${format(
                  new Date(followups[0].followupTime),
                  "hh:mma dd MMM yyyy"
                )}`
              : "Add a followup"
          }
          imgUrl={whatsAppIcon}
          linkToNavigate={`followups`}
          baseLink={`/admin/patients/${remoteUser?.uid}`}
        />
      </div>
      <div className="flex-1" />
    </div>
  );
};

export default FollowupModule;
