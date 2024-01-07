import clsx from "clsx";
import { useZohoSlotStore } from "./store/zohoSlotStore";
import { format } from "date-fns";
import { shallow } from "zustand/shallow";

interface Props {
  dateUnix: number;
}

const DaySliderItem: React.FC<Props> = ({ dateUnix }) => {
  const dtString = format(new Date(dateUnix), "yyyy-MM-dd");
  const { isSelected, setSlotDate } = useZohoSlotStore(
    (state) => ({
      isSelected: state.slotDate === dtString,
      setSlotDate: state.setSlotDate,
    }),
    shallow
  );

  // const isSelected = slotDate === dtString;
  // return <View className="h-40 w-40 bg-white" />;

  return (
    <button
      onClick={() => setSlotDate(dtString)}
      className={clsx(
        isSelected ? "bg-white" : "bg-[#343150]",
        "rounded-xl h-full aspect-1 flex flex-col justify-evenly items-center"
      )}
    >
      <p
        className={clsx(
          isSelected ? "text-[#333333]" : "text-white",
          "text-[10px] iphoneX:text-xs"
        )}
        style={{ fontFamily: "Nunito-Regular" }}
      >
        {format(dateUnix, "eee")}
      </p>
      <p
        className={clsx(
          isSelected ? "text-[#333333]" : "text-white",
          "text-lg iphoneX:text-xl"
        )}
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {format(dateUnix, "d")}
      </p>
      <p
        className={clsx(
          isSelected ? "text-[#333333]" : "text-white",
          "text-[10px] iphoneX:text-xs"
        )}
        style={{ fontFamily: "Nunito-Regular" }}
      >
        {format(dateUnix, "LLL")}
      </p>
    </button>
  );
};

export default DaySliderItem;
