import { View } from "react-native";
import DayHeader from "./DayHeader";
import CalendarListComponentV2 from "./CalendarListComponentV2";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";

interface Props {
  title: string;
  isEditable?: boolean;
}

const PeriodCalendarLogMainV2: React.FC<Props> = ({ isEditable, title }) => {
  return (
    <View className="flex-1">
      <DayHeader title={title} />

      <InteractionProvider>
        <View className=" border bg-[#232136]  flex-1">
          <CalendarListComponentV2 isEditable={isEditable} />
        </View>
      </InteractionProvider>
    </View>
  );
};

export default PeriodCalendarLogMainV2;
