import { completedBluteTick } from "@constants/imageKitURL";
import { dateObject } from "@hooks/program/useProgramTasks";
import clsx from "clsx";
import { View, Text, Image } from "react-native";
interface Props {
  daysArray: dateObject[];
  selectedMonth: string;
  setMonth: (val: string) => void;
  onClose: () => void;
}
const SelectMonth: React.FC<Props> = ({
  daysArray,
  setMonth,
  selectedMonth,
  onClose,
}) => {
  const onMonthSelect = (val: string) => {
    setMonth(val);
    onClose();
  };
  return (
    <View className=" flex flex-col py-2">
      <View className="flex  flex-row py-3 items-center justify-center mx-6 relative">
        <Text
          onPress={() => onMonthSelect("")}
          className="text-[#59A4DA] whitespace-nowrap text-center flex-1"
        >
          All
        </Text>
        <Image
          source={{ uri: completedBluteTick }}
          className={clsx(
            "absolute top-1/2 right-0 -translate-y-1/2",
            selectedMonth ? "hidden " : "ml-4 w-4 h-4"
          )}
          resizeMode="contain"
        />
      </View>
      {daysArray &&
        Array.from(new Set(daysArray.map((i) => i.monthName))).map(
          (monthName, index) => {
            return (
              <View
                key={`${monthName}-${index}`}
                className=" py-3 items-center flex flex-row  mx-6 relative"
              >
                <Text
                  onPress={() => onMonthSelect(monthName)}
                  className={clsx(
                    "text-[#59A4DA] whitespace-nowrap text-lg text-center  flex-1",
                    monthName === selectedMonth ? "font-semibold " : ""
                  )}
                >
                  {monthName}
                </Text>
                <Image
                  source={{ uri: completedBluteTick }}
                  className={clsx(
                    "absolute top-1/2 right-0 -translate-y-1/2",
                    monthName !== selectedMonth ? "hidden" : "ml-4 w-4 h-4"
                  )}
                  resizeMode="contain"
                />
              </View>
            );
          }
        )}
    </View>
  );
};

export default SelectMonth;
