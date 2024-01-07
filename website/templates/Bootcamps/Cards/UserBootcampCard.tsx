import { UserInterface } from "@models/User/User";
import Link from "next/link";
import { format } from "date-fns";
import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";

interface Props {
  item: UserInterface;
}

const UserBootcampCard: React.FC<Props> = ({ item }) => {
  const { status } = usePaidStatus(item.uid);
  return (
    <Link key={item.uid} href={`/admin/u/${item.uid}`}>
      <div className="p-4" key={item.uid}>
        <p>Name: {item.name}</p>
        <p>Phone: {item.phone}</p>
        {item.bootcampDetails?.started ? (
          <p className="text-green-500">STATUS: JOINED</p>
        ) : (
          <p className="text-red-500">STATUS: INVITED</p>
        )}

        <p>OnboardingCall: {item.onboardingCallStatus}</p>
        <div className="pt-4" />
        <p className="text-sm">Workout Badge: {item.badgeId}</p>
        <p className="text-sm">Nutrition Badge: {item.nutritionBadgeId}</p>
        {item.bootcampDetails?.started ? (
          <p>
            Started:{" "}
            {format(new Date(item.bootcampDetails?.started), "dd-MM-yyyy")}
          </p>
        ) : null}
        <p className="pt-4">Paid Status: {status}</p>
      </div>
    </Link>
  );
};

export default UserBootcampCard;
