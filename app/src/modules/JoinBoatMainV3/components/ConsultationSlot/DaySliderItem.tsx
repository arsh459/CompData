import { Text, TouchableOpacity, Dimensions } from "react-native";
import clsx from "clsx";
import { useZohoSlotStore } from "./store/zohoSlotStore";
import { shallow } from "zustand/shallow";
import { format } from "date-fns";
const { width } = Dimensions.get("window");
export const cardWidth = width / 5;

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
    <TouchableOpacity
      style={{ width: cardWidth }}
      onPress={() => setSlotDate(dtString)}
      className={clsx(
        "mr-4",
        isSelected ? "bg-white" : "bg-[#343150]",
        "rounded-xl h-20 aspect-square flex justify-evenly items-center"
      )}
    >
      <Text
        className={clsx(
          isSelected ? "text-[#333333]" : "text-white",
          "text-[10px] iphoneX:text-xs"
        )}
        style={{ fontFamily: "Nunito-Regular" }}
      >
        {format(dateUnix, "eee")}
      </Text>
      <Text
        className={clsx(
          isSelected ? "text-[#333333]" : "text-white",
          "text-lg iphoneX:text-xl"
        )}
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {format(dateUnix, "d")}
      </Text>
      <Text
        className={clsx(
          isSelected ? "text-[#333333]" : "text-white",
          "text-[10px] iphoneX:text-xs"
        )}
        style={{ fontFamily: "Nunito-Regular" }}
      >
        {format(dateUnix, "LLL")}
      </Text>
    </TouchableOpacity>
  );
};

export default DaySliderItem;
