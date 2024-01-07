import { View, Text } from "react-native";
import Loading from "@components/loading/Loading";
import { useZohoSlotStore } from "./store/zohoSlotStore";
import { shallow } from "zustand/shallow";
import SlotTimeItem from "./SlotTimeItem";

const SlotTime = () => {
  const { fetching, slotDurationInMinutes, slots } = useZohoSlotStore(
    (state) => ({
      fetching: state.fetching,
      slots: (state.slotDate && state.slotOnDates[state.slotDate]) || [],
      slotDurationInMinutes: state.slotDurationInMinutes,
    }),
    shallow
  );

  return fetching ? (
    <View className="flex-1 flex justify-center items-center my-[25%]">
      <Loading width="w-12" height="h-12" />
    </View>
  ) : (
    <View className="w-full flex-1 flex flex-row flex-wrap p-2">
      {slots.length ? (
        <>
          <Text
            className="text-white text-sm iphoneX:text-base p-4"
            style={{ fontFamily: "Nunito-Medium" }}
          >
            Note: Duration of call will be ~{slotDurationInMinutes} minutes
          </Text>
          {slots.map((each) => (
            <SlotTimeItem
              key={`${each.timeStart}-${each.staff_id}`}
              each={each}
            />
          ))}
        </>
      ) : (
        <Text
          className="text-white text-center text-sm iphoneX:text-base mx-auto my-[25%]"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          No slots avaliable
        </Text>
      )}
    </View>
  );
};

export default SlotTime;
