import { checkStatusAsync } from "@hooks/paidStatus/usePaidStatus";
import { PaidCard } from "@hooks/paidStatus/usePaidUsers";
import BadgeName from "@modules/UserDaily/BadgeName";
import { format } from "date-fns";
import Link from "next/link";

import { useState } from "react";

interface Props {
  card: PaidCard;

  check?: boolean;
}

type checkStatus = "DONE" | "LOADING" | "PENDING";

// const getDaysFromUnix = (unix?: number) => {
//   if (unix && unix > 0) {
//     const now = Date.now();
//     const days = (now - unix) / (24 * 60 * 60 * 1000);
//     return `${days.toFixed(2)} Days`;
//   }

//   return "-";
// };

const PaidCardComponent: React.FC<Props> = ({ card, check }) => {
  const [status, changeStatus] = useState<checkStatus>(
    card.ending ? "PENDING" : "DONE"
  );
  const [ending, setEnding] = useState<string>(card.ending);

  const checkStatusToggle = async () => {
    changeStatus("PENDING");
    const resp = await checkStatusAsync(card.uid);

    let endingStr: string = "";
    const now = Date.now();
    if (resp.expiry && resp.expiry >= now) {
      endingStr = `ACTIVE: ${format(new Date(resp.expiry), "d MMM yyyy")}`;
    } else if (resp.expiry && resp.expiry < now) {
      endingStr = `INACTIVE: ${format(new Date(resp.expiry), "d MMM yyyy")}`;
    }

    setEnding(endingStr);
    changeStatus("DONE");
  };

  if (card.nutritionBadgeId === card.badgeId && card.badgeId) {
    return (
      <div className="p-4 m-4 border w-[240px]" key={card.uid}>
        <p className="text-red-500 font-bold">FIX URGENT. SAME BADGE</p>
        <Link href={`/admin/teamCheck/${card.uid}`}>
          <p className="underline text-sm text-blue-500">Edit</p>
        </Link>
      </div>
    );
  }

  // const daysOfWorkout = getDaysFromUnix(card.user?.recommendationConfig?.start);
  // const daysOfDiet = getDaysFromUnix(
  // card.user.recommendationConfig?.nutritionStart
  // );
  // const paymentDays = getDaysFromUnix(card.paymentUnix);
  // const planId = "0cPvVrnphNJBnvvOM9Zf";

  const sbPlanId = card.user?.sbPlanId;

  const flagUpdateNeeded = card.user.waMessageStatus?.paymentDone;
  return (
    <>
      <div className="p-4 m-4 border w-[240px]" key={card.uid}>
        {!flagUpdateNeeded ? (
          <Link href={`/admin/u/${card.uid}`}>
            <p className="text-base font-bold text-red-500 underline py-2">
              URGENT: UPDATE PAYMENT DONE
            </p>
          </Link>
        ) : !sbPlanId ? (
          <Link href={`/admin/u/${card.uid}/subId`}>
            <p className="text-base font-bold text-red-500 underline py-2">
              URGENT: UPDATE Subscription Id
            </p>
          </Link>
        ) : sbPlanId ? (
          <Link href={`/admin/u/${card.uid}/subId`}>
            <p className="text-sm font-light text-red-500 underline pb-2">
              Edit:{" "}
              {sbPlanId === "1d46cf40-170d-4fcb-8702-d8d4428a9e4a"
                ? "Monthly"
                : sbPlanId === "8d680b40-f4e7-47eb-b839-69ab92cd532d"
                ? "Quarter"
                : sbPlanId === "434e213d-50aa-42d1-ad69-d36f3cc3f63b"
                ? "Yearly"
                : "Edit Id"}
            </p>
          </Link>
        ) : null}
        <p>NAME: {card.name}</p>
        <p>Phone: {card.phone}</p>

        {card.nutritionBadgeId ? (
          <BadgeName keyStr="Diet" id={card.nutritionBadgeId} />
        ) : (
          <p className="text-red-500 font-bold text-sm">NO DIET</p>
        )}
        {card.badgeId ? (
          <BadgeName keyStr="Workout" id={card.badgeId} />
        ) : (
          <p className="text-red-500 font-bold text-sm">No Workouts</p>
        )}
        <p>{card.fp} FP</p>
        <Link href={`/admin/patients/${card.uid}`}>
          <p className="underline text-base py-2 text-red-500">
            Medical Profile
          </p>
        </Link>

        <Link href={`/admin/patients/${card.uid}/progress`}>
          <p className="underline text-sm text-green-500">Progress</p>
        </Link>
        {/* <Link href={`/admin/u/${card.uid}/history`}>
          <p className="underline text-sm text-blue-500">Task History</p>
        </Link> */}
        {/* <Link href={`/admin/appsubscribers/${planId}/${card.uid}`}>
          <p className="underline text-sm text-red-500">
            Go To userAppSubscription
          </p>
        </Link> */}

        <Link href={`/admin/teamCheck/${card.uid}`}>
          <p className="underline text-sm text-blue-500">Edit</p>
        </Link>
        {/* <Link href={`/admin/u/${card.uid}/healthcheckins`}>
          <p className="underline text-sm text-purple-500">Health Checkin</p>
        </Link> */}

        {/* <Link href={`/admin/u/${card.uid}/reports`}>
          <p className="underline text-gray-500 text-sm">Create Report</p>
        </Link> */}

        <Link href={`/admin/u/${card.uid}/path`}>
          <p className="underline text-lime-500 text-sm">Achievement Path</p>
        </Link>
        <Link href={`/admin/patients/${card.uid}/config`}>
          <p className="underline text-lime-500 text-sm">Config</p>
        </Link>

        {/* <div className="text-xs font-medium text-purple-500 py-2">
          <p>Workout days: {daysOfWorkout}</p>
          <p>Diet days: {daysOfDiet}</p>
          <p>Days from payment: {paymentDays}</p>
        </div> */}

        {check ? (
          <>
            <div className="cursor-pointer" onClick={checkStatusToggle}>
              {status === "DONE" ? (
                <p>Ending: {ending}</p>
              ) : (
                <p>Ending: {status}</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-red-500">Ending: {card.ending}</p>
        )}
      </div>
    </>
  );
};

export default PaidCardComponent;
