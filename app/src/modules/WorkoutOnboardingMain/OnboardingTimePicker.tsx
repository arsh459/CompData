import { Text, View } from "react-native";
import { format } from "date-fns";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import DateTimePickerModal from "./DateTimePickerModal";

interface TimePickerProps {
  value: Date;
  onChange: (selectedTime: Date) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  return (
    <DateTimePickerModal value={value} onChange={onChange}>
      <Text
        className="flex-1 text-sm iphoneX:text-base text-white"
        style={{ fontFamily: "Nunito-Regular" }}
      >
        Select your time
      </Text>
      <Text className="text-white">{format(value, "h:mm a")}</Text>
      <View className="w-3 aspect-square ml-3">
        <ArrowIcon direction="bottom" color="#FFFFFF" />
      </View>
    </DateTimePickerModal>
  );
};

export default TimePicker;
