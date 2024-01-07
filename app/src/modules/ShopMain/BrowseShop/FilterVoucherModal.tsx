import UseModal from "@components/UseModal";
import { FilterVouchersQuery } from "@hooks/sbrewards/useSbRewards";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import { useState } from "react";
import { View, Text, SafeAreaView, Pressable } from "react-native";
import { FilterVoucherRadio } from "../utils";
import RadioButton from "./RadioButton";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  filter: FilterVouchersQuery;
  setFilter: (val: FilterVouchersQuery) => void;
}

const radioButtons: FilterVoucherRadio[] = [
  { id: 1, name: "Recommended", selected: false, query: "recommended" },
  { id: 2, name: "Newest", selected: true, query: "newest" },
  { id: 3, name: "Price High to low", selected: false, query: "highToLow" },
  { id: 4, name: "Price low to High", selected: false, query: "lowToHigh" },
];

const FilterVoucherModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  setFilter,
  filter,
}) => {
  const onClose = () => setIsOpen(false);

  const onRadioBtnClick = (item: FilterVoucherRadio) => {
    weEventTrack("shop_clickFilterOption", { filterOption: item.query });
    setFilter(item.query);
    setIsOpen(false);
  };

  return (
    <UseModal
      visible={isOpen}
      onClose={onClose}
      width="w-full"
      height="h-full"
      fallbackColor="#100F1AF4"
      blurAmount={35}
      tone="dark"
    >
      <SafeAreaView className="flex items-end justify-end flex-1  ">
        <Pressable
          onPress={onClose}
          className="absolute left-0 right-0 top-0 bottom-0"
        />
        <View className="mb-10 mr-5 z-10 bg-[#26243D] rounded-[21px] flex justify-start w-1/2">
          <View className="pt-3 iphoneX:pt-5 ">
            {radioButtons.map((item) => (
              <RadioButton
                onPress={() => onRadioBtnClick(item)}
                selected={item.query === filter}
                key={item.id}
              >
                {item.name}
              </RadioButton>
            ))}
          </View>
          <View className="h-px bg-[#505260]" />
          <Text
            className="text-[#CDCDCD] py-2  rounded-b-[21px] text-center text-base "
            style={{ fontFamily: "BaiJamjuree-Semibold" }}
          >
            Sort By
          </Text>
        </View>
      </SafeAreaView>
    </UseModal>
  );
};

export default FilterVoucherModal;
