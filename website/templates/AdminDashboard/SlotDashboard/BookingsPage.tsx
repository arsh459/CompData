import { useBookings } from "@hooks/slots/useBookings";
// import Link from "next/link";
import BookingCard from "./BookingCard";
import DaySelectorStrip from "./DaySelectorStrip";

interface Props {}

const BookingsDashboard: React.FC<Props> = ({}) => {
  const { slotBookings, setPeriod, period } = useBookings();

  return (
    <>
      <DaySelectorStrip
        periodList={["Older", "Today", "Tomorrow", "Later"]}
        setPeriod={setPeriod}
        period={period}
      />

      <div className="flex flex-row flex-wrap">
        {slotBookings.map((item, index) => {
          return (
            <div key={`${item.id}-${index}`}>
              <BookingCard item={item} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BookingsDashboard;
