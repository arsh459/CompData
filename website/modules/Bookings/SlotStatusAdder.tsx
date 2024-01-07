import { UserInterface, userSlotStatus } from "@models/User/User";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { updateSlotStatus } from "./updateSlotStatus";

interface Props {
  user: UserInterface;
  slotId?: string;
  bookingId?: string;
}

const slots: userSlotStatus[] = [
  "DONE",
  "NOT_INTERESTED",
  "NO_PICKUP",
  "RESCHEDULED",
  "SCHEDULED",
  "PENDING",
  "REACHED_OUT",
];

const SlotStatusAdder: React.FC<Props> = ({ user, slotId, bookingId }) => {
  const [status, setStatus] = useState<userSlotStatus | undefined>(
    user.onboardingCallStatus ? user.onboardingCallStatus : undefined
  );

  // console.log("Hi I am here", status);

  useEffect(() => {
    // console.log("Hi I in effect");
    setStatus(user.onboardingCallStatus);
  }, [user.onboardingCallStatus]);

  const addSlotStatus = async (status: userSlotStatus) => {
    setStatus(status);
    if (status) await updateSlotStatus(user.uid, status, slotId, bookingId);
  };

  return (
    <div className="flex flex-wrap">
      {slots.map((item) => {
        return (
          <div
            key={item}
            onClick={() => addSlotStatus(item)}
            className={clsx(
              item === status
                ? "font-bold text-black border-red-500"
                : "font-light text-gray-700",
              "border p-2 mr-2"
            )}
          >
            <p className="text-base">{item}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SlotStatusAdder;
