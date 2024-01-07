import { useState } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Pressable,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import UseModal from "@components/UseModal";
import { format } from "date-fns";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import clsx from "clsx";

interface Props {
  value: Date;
  onChange: (selectedTime: Date) => void;
  children?: React.ReactNode;
  mode?: "date" | "time";
  minimumDate?: Date;
  containerColor?: string;
  textToShow?: string;
}

const DateTimePickerModal: React.FC<Props> = ({
  value,
  onChange,
  children,
  mode,
  minimumDate,
  containerColor,
  textToShow,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [remoteValue, setRemoteValue] = useState<Date>(value);

  const onClose = () => {
    setShowPicker(false);
  };

  const handleChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (selectedTime && mode === "date") {
      const fixedDate = new Date(
        selectedTime.getFullYear(),
        selectedTime.getMonth(),
        selectedTime.getDate(),
        0,
        0,
        0,
        0
      );

      setRemoteValue(fixedDate);
      return fixedDate;
    } else if (selectedTime) {
      setRemoteValue(selectedTime);
      return selectedTime;
    }
  };

  const handleAndroid = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (Platform.OS === "android") {
      const newValue = handleChange(event, selectedTime);
      if (event.type === "set" && newValue) {
        onChange(newValue);
      }
      onClose();
    }
  };

  const handleIOS = () => {
    if (Platform.OS === "ios") {
      onChange(remoteValue);
      onClose();
    }
  };

  return (
    <View
      className={clsx(
        " rounded-xl overflow-hidden relative z-0",
        containerColor ? containerColor : "bg-[#343150]"
      )}
    >
      <TouchableOpacity
        onPress={() => setShowPicker(!showPicker)}
        className="flex flex-row items-center py-3.5 px-5"
      >
        {children}
      </TouchableOpacity>

      {showPicker && Platform.OS === "android" ? (
        <DateTimePicker
          value={remoteValue}
          mode={mode ? mode : "time"}
          minuteInterval={15}
          positiveButton={{ label: "Set", textColor: "#000" }}
          negativeButton={{ label: "Cancel", textColor: "#000" }}
          themeVariant="light"
          display="spinner"
          minimumDate={minimumDate}
          is24Hour={true}
          onChange={handleAndroid}
          onError={(err) => console.log(err)}
        />
      ) : null}

      <UseModal
        visible={showPicker && Platform.OS === "ios"}
        onClose={onClose}
        tone="dark"
        blurAmount={30}
        width="w-full"
        height="h-full"
        fallbackColor="transparent"
      >
        <View className="flex-1 flex justify-center items-center relative z-0">
          <Pressable
            className="absolute left-0 right-0 top-0 bottom-0 -z-10"
            onPress={onClose}
          />
          <View className="bg-[#343150] rounded-xl overflow-hidden">
            <DateTimePicker
              value={remoteValue}
              mode={mode ? mode : "time"}
              minuteInterval={15}
              positiveButton={{ label: "Set", textColor: "#fff" }}
              themeVariant="dark"
              minimumDate={minimumDate}
              display="spinner"
              onChange={handleChange}
              onError={(err) => console.log(err)}
            />
          </View>
          <View pointerEvents="none">
            {/* <Text className="text-base text-white/50 text-center my-4">
              Tap anywhere to close
            </Text> */}
            {minimumDate ? (
              <Text className="text-base text-white/50 my-4 text-center">
                You can select any date after{" "}
                {format(minimumDate, "dd MMMM yyyy")}
              </Text>
            ) : null}
          </View>
        </View>
        <View className="p-4">
          <StartButton
            onPress={handleIOS}
            title={mode === "date" ? "Select Date" : "Select Time"}
            bgColor="bg-[#fff]"
            textColor="text-[#5D588C] "
            roundedStr="rounded-full"
            textStyle="py-4 text-center text-base rounded-full"
            fontFamily="Nunito-Bold"
          />
        </View>
        {textToShow?.length ? (
          <View className="absolute left-0 right-0 flex top-20 items-center">
            <Text className="text-base text-white capitalize my-4 text-center">
              {textToShow}
            </Text>
          </View>
        ) : null}
      </UseModal>
    </View>
  );
};

export default DateTimePickerModal;
