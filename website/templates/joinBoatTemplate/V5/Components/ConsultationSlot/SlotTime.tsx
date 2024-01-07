import { SlotObj } from "@models/slots/Slot";
import { checkTime, getShowSlotStr } from "@models/slots/utils";
import clsx from "clsx";

interface Props {
  slots: SlotObj[];
  isToday: boolean;
  slotTime?: SlotObj;
  setSlotTime: (val: SlotObj) => void;
}

const SlotTime: React.FC<Props> = ({
  slots,
  isToday,
  slotTime,
  setSlotTime,
}) => {
  return (
    <div className="w-full flex flex-row flex-wrap p-2">
      {slots.length ? (
        slots.map((each) => {
          const isTimePassed = !checkTime(isToday, each);

          // console.log("hi I am here");
          return (
            <div key={each.id} className="w-1/2 p-2">
              <button
                disabled={isTimePassed || each.status === "BUSY"}
                onClick={() => setSlotTime(each)}
                className={clsx(
                  slotTime === each
                    ? "bg-white"
                    : isTimePassed || each.status === "BUSY"
                    ? "bg-white/10"
                    : "bg-white/30",
                  "w-full py-3 rounded-full"
                )}
              >
                <p
                  className={clsx(
                    slotTime === each
                      ? "text-[#333333]"
                      : isTimePassed || each.status === "BUSY"
                      ? "text-white/20"
                      : "text-white",
                    "text-center text-sm line-clamp-1"
                  )}
                  style={{ fontFamily: "BaiJamjuree-Bold" }}
                >
                  {getShowSlotStr(each)}
                </p>
              </button>
            </div>
          );
        })
      ) : (
        <p
          className="text-white text-center text-base mx-auto my-4"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          No slots avaliable
        </p>
      )}
    </div>
  );
};

export default SlotTime;
