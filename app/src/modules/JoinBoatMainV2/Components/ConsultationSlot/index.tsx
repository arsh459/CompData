import SpreadColorBall from "@components/SpreadColorBall";
import { timeLabel } from "@models/slots/Slot";
import crashlytics from "@react-native-firebase/crashlytics";
import { useSlotBooking } from "@models/slots/useSlotBooking";
import { useSlots } from "@models/slots/useSlots";
import Header from "@modules/Header";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Image,
} from "react-native";
import DaySlider from "./DaySlider";
import SlotTime from "./SlotTime";
import TimeOfTheDay from "./TimeOfTheDay";
import { getIST } from "@models/slots/utils";

interface Props {
  onBookConsultationNext: () => void;
  onSkip: () => void;
}

const today = getIST().startOf("day").toMillis();

const ConsultationSlot: React.FC<Props> = ({
  onSkip,
  onBookConsultationNext,
}) => {
  const { height } = useWindowDimensions();
  const {
    slotId,
    slots,
    timePeriod,
    setTimePeriod,
    slotDate,
    setSlotDate,
    slotTime,
    setSlotTime,
  } = useSlots(today);

  const { saveBookingSlot } = useSlotBooking(slotDate, slotTime);

  const handleSaveAndSchedule = async (selectedSlotId?: string) => {
    try {
      await saveBookingSlot(selectedSlotId);
      onBookConsultationNext();
    } catch (error: any) {
      console.log(error);
      crashlytics().recordError(error);
    }
  };

  return (
    <>
      <Header
        back={true}
        headerColor="#100F1A"
        tone="dark"
        headerType="transparent"
        optionNode={
          <TouchableOpacity onPress={onSkip}>
            <Text className="text-white text-sm">Skip for now</Text>
          </TouchableOpacity>
        }
      />
      <View className="flex-1 bg-[#100F1A] relative">
        <View
          className="absolute top-0 left-0 aspect-square"
          style={{
            height: height,
            transform: [
              { translateX: -(height * 0.35) },
              { translateY: -(height * 0.35) },
            ],
          }}
        >
          <SpreadColorBall
            color1="#FF427B"
            color2="#FF427B"
            opacity1={0.55}
            opacity2={0}
          />
        </View>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View className="h-16" />
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/Group_1014_N_CkYF9oa.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673859653617",
            }}
            className="w-1/2 aspect-square"
            resizeMode="contain"
          />
          <Text
            className="text-[#F1F1F1] text-lg mx-4 my-8"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Reserve a 15 mins FREE consultation with our health expert
          </Text>
          <DaySlider
            startDate={today}
            slotDate={slotDate}
            setSlotDate={(val: number) => {
              setSlotDate(val);
              setSlotTime(undefined);
            }}
          />
          <TimeOfTheDay
            timePeriod={timePeriod}
            setTimePeriod={(val: timeLabel) => {
              setTimePeriod(val);
              setSlotTime(undefined);
            }}
          />
          <SlotTime
            slots={slots}
            isToday={today === slotDate}
            slotTime={slotTime}
            setSlotTime={setSlotTime}
          />
        </ScrollView>
        <TouchableOpacity
          className="rounded-full px-4 py-3 m-4"
          onPress={() => handleSaveAndSchedule(slotId)}
          disabled={!slotDate || !slotTime}
          style={{
            backgroundColor: !slotDate || !slotTime ? "#FFFFFF80" : "#FFFFFF",
          }}
        >
          <Text
            className="text-[#100F1A] text-base text-center"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Save and Schedule
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ConsultationSlot;
