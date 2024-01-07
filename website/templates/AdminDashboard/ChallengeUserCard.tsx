import { useIsSubscription } from "@hooks/invites/useIsSubscription";
import { UserInterface } from "@models/User/User";
import { format } from "date-fns";
// import Filter from "./Filter";

interface Props {
  item: UserInterface;
  index: number;
}

const ChallengeUserCard: React.FC<Props> = ({ item, index }) => {
  // const { urlState, onPageChange, onClearFilter } = useAdminDashboard();
  // const { status } = usePaidStatus(item.uid);
  const { userSubObj } = useIsSubscription(item.uid);
  const isPaid = userSubObj?.paidPeriodEndsOn
    ? userSubObj.paidPeriodEndsOn > Date.now()
    : false;

  return (
    <p>
      {index} | {item.uid} | {item.name} | {item.phone} |{" "}
      {isPaid ? "PAID" : "Inactive"} |{" "}
      {item.challengeJoined
        ? format(new Date(item.challengeJoined), "dd-MM-yyyy")
        : "NOT JOINED"}
    </p>
  );
};

export default ChallengeUserCard;
