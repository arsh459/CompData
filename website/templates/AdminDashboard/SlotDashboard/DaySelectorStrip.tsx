import { slotP } from "@hooks/slots/useBookings";
import clsx from "clsx";
// import Link from "next/link";

interface Props {
  setPeriod: (newPeriod: slotP) => void;
  period: slotP;
  periodList: slotP[];
}

const DaySelectorStrip: React.FC<Props> = ({
  setPeriod,
  period,
  periodList,
}) => {
  return (
    <div className="flex flex-row flex-wrap pb-4">
      {periodList.map((item) => {
        return (
          <div
            onClick={() => setPeriod(item)}
            key={item}
            className={clsx(
              period === item
                ? "text-black font-bold border-red-500"
                : "text-gray-500",
              " p-4 m-4 border"
            )}
          >
            <p>{item}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DaySelectorStrip;
