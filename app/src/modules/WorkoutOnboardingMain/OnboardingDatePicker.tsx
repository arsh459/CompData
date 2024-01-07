import { Text, View } from "react-native";
import { format } from "date-fns";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import DateTimePickerModal from "./DateTimePickerModal";

interface Props {
  value: Date;
  onChange: (selectedTime: Date) => void;
  minimumDate?: Date;
}

const DatePicker: React.FC<Props> = ({ value, onChange, minimumDate }) => {
  return (
    <DateTimePickerModal
      value={value}
      onChange={onChange}
      minimumDate={minimumDate}
      mode="date"
    >
      <Text
        className="flex-1 text-sm iphoneX:text-base text-white"
        style={{ fontFamily: "Nunito-Regular" }}
      >
        Program Started On
      </Text>
      <Text className="text-white">{format(value, "do LLL yyyy")}</Text>
      <View className="w-3 aspect-square ml-3">
        <ArrowIcon direction="bottom" color="#FFFFFF" />
      </View>
    </DateTimePickerModal>
  );
};

export default DatePicker;
