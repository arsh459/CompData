import { timeLabel } from "@models/slots/Slot";
import { useSlotBooking } from "@models/slots/useSlotBooking";
import { useSlots } from "@models/slots/useSlots";
import { useRouter } from "next/router";
import DaySlider from "./DaySlider";
import SlotTime from "./SlotTime";
import TimeOfTheDay from "./TimeOfTheDay";
import { getIST } from "@models/slots/utils";

interface Props {
  onBookConsultationNext: () => void;
  onSkip: () => void;
}

/**
 * get current unix. get
 *
 */

const today = getIST().startOf("day").toMillis();

const ConsultationSlot: React.FC<Props> = ({
  onSkip,
  onBookConsultationNext,
}) => {
  const router = useRouter();

  const {
    slotId,
    slots,
    timePeriod,
    setTimePeriod,
    slotDate,
    setSlotDate,
    slotTime,
    setSlotTime,
  } = useSlots(today);

  console.log("today", today);

  const { saveBookingSlot } = useSlotBooking(slotDate, slotTime);

  const handleSaveAndSchedule = async (selectedSlotId?: string) => {
    try {
      await saveBookingSlot(selectedSlotId);
      onBookConsultationNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-0 bg-[#100F1A]">
      <div className="w-full h-full max-w-md mx-auto z-0 flex flex-col overflow-x-hidden">
        <div className="flex justify-between items-center p-4 z-50">
          <img
            src={`https://ik.imagekit.io/socialboat/Vector_qeTUiyHTG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658904429443`}
            className="w-6 iphoneX:w-8 h-6 iphoneX:h-8 object-contain cursor-pointer"
            onClick={router.back}
            alt="backIcon"
          />
          <button onClick={onSkip} className="self-end">
            <p className="text-white text-sm">Skip for now</p>
          </button>
        </div>
        <div className="flex-1 flex flex-col bg-[#100F1A] relative">
          <div
            className="absolute z-0 top-0 left-0 h-4/5 aspect-1 aspect-1 blur-2xl rounded-full -translate-x-1/3 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(70% 70% at 50% 50%, rgba(255, 66, 123, 0.55) 0%, rgba(255, 66, 123, 0) 80%)",
            }}
          />
          <div className="flex-1 flex flex-col items-center">
            <img
              src="https://ik.imagekit.io/socialboat/Group_1014_N_CkYF9oa.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673859653617"
              className="w-1/2 aspect-1 object-contain"
              alt="watch image"
            />
            <p
              className="text-[#F1F1F1] text-lg mx-4 my-8"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {"Reserve a 15 mins FREE consultation with your coach's team"}
            </p>
            <DaySlider
              startDate={today}
              slotDate={slotDate}
              setSlotDate={(val: number) => {
                setSlotDate(val);
                setSlotTime(undefined);
              }}
            />
            <TimeOfTheDay
              timePeriod={timePeriod}
              setTimePeriod={(val: timeLabel) => {
                setTimePeriod(val);
                setSlotTime(undefined);
              }}
            />
            <SlotTime
              slots={slots}
              isToday={today === slotDate}
              slotTime={slotTime}
              setSlotTime={setSlotTime}
            />
          </div>
          <div className="p-4">
            <button
              className="w-full rounded-full px-4 py-3"
              onClick={() => handleSaveAndSchedule(slotId)}
              disabled={!slotDate || !slotTime}
              style={{
                backgroundColor:
                  !slotDate || !slotTime ? "#FFFFFF80" : "#FFFFFF",
              }}
            >
              <p
                className="text-[#100F1A] text-base text-center"
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                Save and Schedule
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationSlot;
