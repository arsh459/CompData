import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SbPlans } from "@models/AppSubscription/AppSubscription";
import clsx from "clsx";
import ListPlanItems from "./ProMain/ListPlanItems";
import ListPlanModal from "./ListPlanModal";
import { modalContent, modalDetails } from "@constants/ModalDetailConstants";
import { discriminatorMobile } from "./ProMain/interface";
interface Props {
  sbplans: SbPlans[];
}

const ComparePlanList: React.FC<Props> = ({ sbplans }) => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [isOpen, setIsOpen] = useState(false);
  const [modalC, setModalC] = useState<modalContent>();

  const onClose = () => setIsOpen(false);
  const onClickArrow = (imageURI?: string, text?: string) => {
    if (imageURI && text) {
      setIsOpen(true);
      setModalC({ imageURI, text });
    }
  };
  return (
    <View className="flex px-4 flex-row mx-auto">
      <View className="w-1/4">
        <Text className="text-white text-xs text-center font-sans font-semibold py-5 opacity-0">
          Offerings
        </Text>

        {discriminatorMobile?.map((label, idx) => {
          const modalContent = modalDetails[label];

          return (
            <TouchableOpacity
              onPress={() =>
                onClickArrow(modalContent?.imageURI, modalContent?.text)
              }
              key={label}
              className={clsx(
                "py-4 flex items-center flex-1",
                idx !== discriminatorMobile.length - 1 &&
                  "border-b-[1px] border-white/20"
              )}
            >
              <Text className="text-white text-xs flex-1">{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View className="flex-1 flex flex-row ">
        {sbplans.slice(0, 3)?.map((plan, idx) => {
          return (
            <ListPlanItems
              plan={plan}
              index={idx}
              key={plan.id}
              isSelected={idx === selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          );
        })}
      </View>
      <ListPlanModal
        text={modalC?.text}
        imgURI={modalC?.imageURI}
        isOpen={isOpen}
        onBackdrop={onClose}
        onClose={onClose}
      />
    </View>
  );
};

export default ComparePlanList;
