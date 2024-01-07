import clsx from "clsx";
import { format, isBefore } from "date-fns";
import { ZohoSlot } from "./store/interface";
import { useZohoSlotStore } from "./store/zohoSlotStore";

const futcherBufferInMS = 15 * 60 * 1000;

interface Props {
  each: ZohoSlot;
}

const SlotTimeItem: React.FC<Props> = ({ each }) => {
  const { isSelected, setSlot } = useZohoSlotStore((state) => ({
    isSelected:
      state.slot &&
      state.slot.timeStart === each.timeStart &&
      state.slot.staff_id === each.staff_id,
    setSlot: state.setSlot,
  }));

  const isTimePassed = isBefore(each.timeStart, Date.now() + futcherBufferInMS);
  // const isSelected =
  //   slot &&
  //   slot.timeStart === each.timeStart &&
  //   slot.staff_id === each.staff_id;

  return (
    <div className="w-1/2 p-2">
      <button
        disabled={isTimePassed}
        onClick={() => setSlot(each)}
        className={clsx(
          isSelected
            ? "bg-white"
            : isTimePassed
            ? "bg-white/10"
            : "bg-[#343150]",
          "w-full py-3 rounded-full"
        )}
      >
        <p
          className={clsx(
            isSelected
              ? "text-[#333333]"
              : isTimePassed
              ? "text-white/20"
              : "text-white",
            "text-center text-xs iphoneX:text-sm line-clamp-1"
          )}
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {format(each.timeStart, "h:mm a")}
        </p>
      </button>
    </div>
  );
};

export default SlotTimeItem;
