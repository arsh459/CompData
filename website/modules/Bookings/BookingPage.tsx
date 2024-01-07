import { useUserV2 } from "@hooks/auth/useUserV2";
import { useSlotBooking } from "@hooks/slots/useSlotBooking";

import { format } from "date-fns";
import SlotStatusAdder from "./SlotStatusAdder";
import UserDetail from "./UserDetail";

interface Props {
  slotId: string;
  bookingId: string;
}

const BookingPage: React.FC<Props> = ({ slotId, bookingId }) => {
  const { slotBooking } = useSlotBooking(slotId, bookingId);
  const { user } = useUserV2(slotBooking?.uid);

  return (
    <div className="p-4">
      <div>
        <p>User TZ Slot: {slotBooking?.rawString}</p>
        {slotBooking?.startUnix ? (
          <p>
            start: {format(new Date(slotBooking?.startUnix), "MMM do h:mma")}
          </p>
        ) : null}
        {slotBooking?.endUnix ? (
          <p>End: {format(new Date(slotBooking?.endUnix), "MMM do h:mma")}</p>
        ) : null}
      </div>

      {user?.uid ? <UserDetail user={user} showSlotLink={false} /> : null}

      {user ? (
        <div className="pt-4">
          <p className="text-lg font-medium pb-2">CALL STATUS</p>
          <SlotStatusAdder user={user} slotId={slotId} bookingId={bookingId} />
        </div>
      ) : null}
    </div>
  );
};

export default BookingPage;
