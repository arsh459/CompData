import { useZohoSlotStore } from "./store/zohoSlotStore";
import DaySliderItem from "./DaySliderItem";
import { shallow } from "zustand/shallow";

const DaySlider = () => {
  const datesArr = useZohoSlotStore((state) => state.datesArr, shallow);

  return (
    <div className="h-20 flex overflow-x-scroll overflow-y-hidden scrollbar-hide mb-4">
      <div>
        <div className="w-6 aspect-1" />
      </div>
      {datesArr?.map((item) => (
        <div className="h-20 flex" key={item.toString()}>
          <DaySliderItem dateUnix={item} />
          <div className="w-6 aspect-1" />
        </div>
      ))}
    </div>
  );
};

export default DaySlider;
