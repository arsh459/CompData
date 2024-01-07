import PeriodCalenderLogMainV2 from "@modules/PeriodCalenderLogMain/PeriodCalendarLogMainV2";
import { useRoute } from "@react-navigation/native";

export interface PeriodCalenderLogScreenProps {
  title: string;
  isEditable: boolean;
}

const PeriodCalenderLogScreen = () => {
  const route = useRoute();
  const params = route.params as PeriodCalenderLogScreenProps;
  return (
    <PeriodCalenderLogMainV2
      title={params.title}
      isEditable={params ? params.isEditable : undefined}
    />
  );
};

export default PeriodCalenderLogScreen;
