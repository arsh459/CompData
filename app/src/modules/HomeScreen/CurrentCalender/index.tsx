import { View } from "react-native";

import { Calendar } from "react-native-calendars";

const CurrentCalender = () => {
  return (
    <View className="bg-[#13121E]">
      <Calendar
        markingType={"custom"}
        markedDates={{
          "2022-10-28": {
            customStyles: {
              container: {
                backgroundColor: "green",
              },
              text: {
                color: "black",
                fontWeight: "bold",
              },
            },
          },
          "2022-10-29": {
            customStyles: {
              container: {
                backgroundColor: "white",
                elevation: 2,
                borderWidth: 2,
                borderColor: "red",
              },
              text: {
                color: "blue",
              },
            },
          },
        }}
        // markedDates={{
        //   "2022-10-16": { selected: true, marked: true, selectedColor: "blue" },
        //   "2022-10-17": { marked: true },
        //   "2022-10-18": { marked: true, dotColor: "red", activeOpacity: 0 },
        //   "2022-10-19": { disabled: true, disableTouchEvent: true },
        // }}
        hideArrows={true}
        hideExtraDays={true}
        theme={{
          backgroundColor: "#13121E",
          calendarBackground: "#13121E",
        }}
      />
    </View>
  );
};

export default CurrentCalender;
