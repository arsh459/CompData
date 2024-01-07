import CloseBtn from "@components/Buttons/CloseBtn";
import UseModal from "@components/UseModal";
import { dateObject } from "@hooks/program/useProgramTasks";
import { View, Text, SafeAreaView } from "react-native";
import SelectMonth from "./SelectMonth";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;

  daysArray: dateObject[];
  selectedMonth: string;
  setMonth: (val: string) => void;
}

const SelectMonthModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  daysArray,
  selectedMonth,
  setMonth,
}) => {
  const onClose = () => setIsOpen(false);
  return (
    <UseModal
      visible={isOpen}
      onClose={onClose}
      width="w-full"
      height="h-full"
      fallbackColor="#100F1A"
      blurAmount={20}
      tone="dark"
    >
      <SafeAreaView>
        <View className=" flex flex-row  items-center justify-between w-full px-8">
          <Text className="text-2xl italic font-extrabold text-[#59A4DA] flex-1 ">
            Complete Program
          </Text>
          <CloseBtn onClose={onClose} color={"#59A4DA"} />
        </View>

        <SelectMonth
          daysArray={daysArray}
          selectedMonth={selectedMonth}
          setMonth={setMonth}
          onClose={onClose}
        />
        <View className="h-2px bg-[#000]" />
      </SafeAreaView>
    </UseModal>
  );
};

export default SelectMonthModal;
