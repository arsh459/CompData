import { View, Text, Platform, TouchableOpacity } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { format } from "date-fns";

interface Props {
  displayOn: number;
  setDisplayOn: (val: number) => void;
}

const CustomDate: React.FC<Props> = ({ displayOn, setDisplayOn }) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const onDateTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    date && setDisplayOn(date.getTime());
    setShowPicker(false);
  };

  return (
    <View className="bg-[#262630] w-full p-3 rounded-2xl">
      <View className="flex flex-row justify-between items-center">
        <Text
          className="flex-1 text-white text-sm iphoneX:text-base"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          Change journey date
        </Text>
        {Platform.OS === "ios" || showPicker ? (
          <DateTimePicker
            testID="datePicker"
            themeVariant="dark"
            mode={"date"}
            value={new Date(displayOn)}
            onChange={onDateTimeChange}
          />
        ) : null}
        {Platform.OS === "android" ? (
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            className="p-2 bg-white/10 rounded-md"
          >
            <Text style={{ color: showPicker ? "dodgerblue" : "white" }}>
              {format(displayOn, "dd-MMM-yyyy")}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default CustomDate;
