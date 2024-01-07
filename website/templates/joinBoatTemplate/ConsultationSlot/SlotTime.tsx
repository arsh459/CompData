import Loading from "@components/loading/Loading";
import { useZohoSlotStore } from "./store/zohoSlotStore";
import SlotTimeItem from "./SlotTimeItem";
import { useEffect, useRef } from "react";
import { shallow } from "zustand/shallow";

const SlotTime = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const { fetching, slotDurationInMinutes, slots } = useZohoSlotStore(
    (state) => ({
      fetching: state.fetching,
      slots: (state.slotDate && state.slotOnDates[state.slotDate]) || [],
      slotDurationInMinutes: state.slotDurationInMinutes,
    }),
    shallow
  );

  useEffect(() => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollTo({ left: 0, top: 0, behavior: "auto" });
    }
  }, [slots, scrollContainer]);

  return fetching ? (
    <div className="flex-1 flex justify-center items-center my-[25%]">
      <Loading width={48} height={48} fill="#ff735c" />
    </div>
  ) : (
    <div
      ref={scrollContainer}
      className="w-full flex-1 overflow-x-hidden overflow-y-scroll scrollbar-hide p-2"
    >
      {slots.length ? (
        <>
          <p
            className="text-white text-sm iphoneX:text-base p-4"
            style={{ fontFamily: "Nunito-Medium" }}
          >
            Note: Duration of call will be ~{slotDurationInMinutes} minutes
          </p>
          <div className="flex flex-row flex-wrap">
            {slots.map((each) => (
              <SlotTimeItem
                key={`${each.timeStart}-${each.staff_id}`}
                each={each}
              />
            ))}
          </div>
        </>
      ) : (
        <p
          className="text-white text-center text-sm iphoneX:text-base mx-auto my-[25%]"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          No slots avaliable
        </p>
      )}
    </div>
  );
};

export default SlotTime;
