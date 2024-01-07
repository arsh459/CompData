import { View, useWindowDimensions, Text } from "react-native";
import Header from "@modules/Header";
import { usePrescriptions } from "@hooks/appointment/usePrescriptions";
import FileViewTile from "@components/FileViewTile";
import { FlashList } from "@shopify/flash-list";
import { AppointmentInterface } from "@modules/DoctorFormMain/utils";

const renderPrescription = ({
  item,
  index,
}: {
  item: AppointmentInterface;
  index: number;
}) => {
  return (
    <View
      className="h-20"
      style={{
        width: "100%",
      }}
    >
      <FileViewTile
        id={item.id ? item.id : `socialBocal${index}`}
        doctorId={item?.doctorId}
        date={item?.startSlot}
      />
    </View>
  );
};

const PrescriptionsModule = () => {
  const { prescriptions, onNextPrescription } = usePrescriptions();
  const { width, height } = useWindowDimensions();
  const keyExtractor = (item: AppointmentInterface, index: Number) => {
    return item.id ? item.id : `socialBocal${index}`;
  };

  return (
    <>
      <Header
        back={true}
        title="My Prescriptions"
        centerTitle={true}
        headerColor="#232136"
        tone="dark"
      />
      <View
        style={{
          height: height,
          width: width,
        }}
        className="flex  bg-[#232136] p-4 pt-7 pb-16"
      >
        {/** USE FlashList */}

        <FlashList
          data={prescriptions}
          keyExtractor={keyExtractor}
          renderItem={renderPrescription}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={true}
          onEndReached={onNextPrescription}
          estimatedItemSize={80}
          ListEmptyComponent={() => (
            <View className="h-[80vh] flex justify-center items-center">
              <Text className="text-white text-center">No data to display</Text>
            </View>
          )}
          // ItemSeparatorComponent={() => <View className="h-2" />}
          numColumns={1}
        />
      </View>
    </>
  );
};

export default PrescriptionsModule;
