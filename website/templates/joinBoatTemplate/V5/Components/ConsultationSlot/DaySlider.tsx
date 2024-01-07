import { getISTFromMillis, oneDayMS } from "@models/slots/utils";
import clsx from "clsx";
interface Props {
  startDate: number;
  slotDate: number;
  setSlotDate: (val: number) => void;
}

const DaySlider: React.FC<Props> = ({ startDate, slotDate, setSlotDate }) => {
  const renderItem = (item: number) => {
    const dateUnix = startDate + item * oneDayMS;
    return (
      <button
        onClick={() => setSlotDate(dateUnix)}
        className={clsx(
          slotDate === dateUnix ? "bg-white" : "bg-white/30",
          "rounded-xl h-20 aspect-1 flex flex-col justify-evenly items-center"
        )}
      >
        <p
          className={clsx(
            slotDate === dateUnix ? "text-[#333333]" : "text-white",
            "text-xs"
          )}
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          {getISTFromMillis(dateUnix).weekdayShort}
        </p>
        <p
          className={clsx(
            slotDate === dateUnix ? "text-[#333333]" : "text-white",
            "text-xl"
          )}
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {getISTFromMillis(dateUnix).toFormat("dd")}
        </p>
        <p
          className={clsx(
            slotDate === dateUnix ? "text-[#333333]" : "text-white",
            "text-xs"
          )}
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          {getISTFromMillis(dateUnix).monthShort}
        </p>
      </button>
    );
  };

  const keyExtractor = (item: number) =>
    (startDate + item * oneDayMS).toString();

  return (
    <div className="w-full flex mb-5 overflow-x-scroll scrollbar-hide px-6 gap-6">
      {[0, 1, 2, 3, 4, 5, 6].map((item) => (
        <div key={keyExtractor(item)} className="flex">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

export default DaySlider;
