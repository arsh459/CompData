import { useUserV2 } from "@hooks/auth/useUserV2";
import { SlotBooking } from "@models/slots/Slot";
import { format } from "date-fns";

import Link from "next/link";

interface Props {
  item: SlotBooking;
}

const BookingCard: React.FC<Props> = ({ item }) => {
  const { user } = useUserV2(item.uid);

  // console.log("item", item.rawString);

  return (
    <Link href={`/admin/slotIds/${item.slotId}/bookings/${item.id}`}>
      <div className="p-4 m-4 border">
        <p>User TZ: {item.rawString}</p>
        <p className="text-blue-500 font-medium">
          Your TZ: {format(new Date(item.startUnix), "MMM do h:mma")}
          {" - "}
          {format(new Date(item.endUnix), "MMM do h:mma")}
        </p>
        <p>{item.uid}</p>
        <p>Name: {user?.name}</p>
        <p>Phone: {user?.phone}</p>
        <p>Motivated By: {user?.motivatedBy}</p>
      </div>
    </Link>
  );
};

export default BookingCard;
