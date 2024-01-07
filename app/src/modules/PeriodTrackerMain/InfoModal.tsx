import UseModal from "@components/UseModal";
import { View, Text } from "react-native";
import CycleIndicator from "./CycleIndicator";
import { calendatItemWidth } from "@modules/Nutrition/V2/DaySelector/V3/HorizontalDayComponentV2";
import { periodDateType } from "@models/User/User";
import CloseBtn from "@components/Buttons/CloseBtn";

interface DataType {
  text: string;
  future: boolean;
  type: periodDateType;
  symptom: boolean;
}

const data: DataType[] = [
  { text: "Period", future: false, symptom: false, type: "PERIOD" },
  { text: "Period + Symptom", future: false, symptom: true, type: "PERIOD" },
  {
    text: "Estimated Period",
    future: false,
    symptom: false,
    type: "ESTIMATED_PERIOD",
  },
  { text: "Ovulation", future: false, symptom: false, type: "OVULATION" },
  { text: "Future", future: true, symptom: false, type: "LUTEAL" },
];

interface Props {
  visible: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<Props> = ({ visible, onClose }) => {
  return (
    <UseModal
      visible={visible}
      onClose={onClose}
      width="w-full"
      height="h-full"
      tone="dark"
      blurAmount={20}
      fallbackColor="#232136E5"
    >
      <View className="flex items-end px-[18px] py-2">
        <CloseBtn onClose={onClose} classStr="w-4 aspect-square" />
      </View>
      <Text
        className="text-3xl text-white text-center p-4"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Key Dots
      </Text>
      <View className="w-3/4 bg-[#312E4A] border border-white/10 rounded-3xl mx-auto p-4">
        {data.map((each) => (
          <View key={each.text} className="flex flex-row items-center p-2">
            <View className="mr-4">
              <CycleIndicator
                future={each.future}
                type={each.type}
                symptom={each.symptom}
                radius={calendatItemWidth / 3}
              />
            </View>
            <Text className="text-base text-white">{each.text}</Text>
          </View>
        ))}
      </View>
    </UseModal>
  );
};

export default InfoModal;
