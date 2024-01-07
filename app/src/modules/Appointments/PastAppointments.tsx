import { View, FlatList } from "react-native";
import { AppointmentInterface } from "@modules/DoctorFormMain/utils";
import PastAppointmentCard from "./PastAppointmentCard";
import NoSlot from "./Components/NoSlot";
interface Props {
  pastAppointments: AppointmentInterface[];
}

const PastAppointments: React.FC<Props> = ({ pastAppointments }) => {
  function renderItem(item: AppointmentInterface) {
    return <PastAppointmentCard appointment={item} />;
  }

  if (pastAppointments.length === 0) {
    return (
      <View className="flex-1 h-full">
        <NoSlot heading="No appointments" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={pastAppointments}
        className="flex-1 px-4"
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item, idx) => `${item?.startSlot}_${idx}`}
        ItemSeparatorComponent={() => <View className="w-8 aspect-square" />}
        bounces={false}
      />
    </View>
  );
};

export default PastAppointments;
