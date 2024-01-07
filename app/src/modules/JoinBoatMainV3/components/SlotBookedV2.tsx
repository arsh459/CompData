import SpreadColorBall from "@components/SpreadColorBall";
import SvgIcons from "@components/SvgIcons";
// import { useAppointment } from "@hooks/appointment/useAppointment";
import { useLastCreatedAppointment } from "@hooks/appointment/useLastCreatedAppointment";
// import { useAppointment } from "@hooks/appointment/useAppointment";
// import { useAppointmentCheck } from "@hooks/appointment/useScheduledAppointment";
import { UserInterface } from "@models/User/User";
// import { useBookedSlots } from "@models/slots/useBookedSlot";
import Header from "@modules/Header";
import { useUserStore } from "@providers/user/store/useUserStore";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

interface Props {
  onProceed: (user?: UserInterface) => void;
  // appointmentId: string;
}

const SlotBookedV2: React.FC<Props> = ({ onProceed }) => {
  const user = useUserStore((state) => state.user);
  const { width, height } = useWindowDimensions();
  //   const { bookedSlot } = useBookedSlots();
  // console.log("appointmentId", appointmentId);

  const { appointment } = useLastCreatedAppointment();
  //   console.log("ap", appointment?.id, appointment?.startSlot);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <>
      <Header
        back={true}
        headerColor="#100F1A"
        tone="dark"
        headerType="transparent"
      />
      <View className="flex-1 bg-[#100F1A] relative">
        <Animated.View
          className="absolute top-0 left-0 aspect-square"
          style={{
            opacity,
            height: height,
            transform: [
              { translateX: -(height * 0.35) },
              { translateY: -(height * 0.35) },
            ],
          }}
        >
          <SpreadColorBall
            color1="#42FF60"
            color2="#42FF60"
            opacity1={0.55}
            opacity2={0}
          />
        </Animated.View>
        <View className="h-16" />
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/Component_104_GBmchPySv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673951810513",
            }}
            className="w-1/2 aspect-square"
            resizeMode="contain"
            style={{ opacity }}
          />
          <Text
            className="text-[#F1F1F1] text-lg mx-4 my-8"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Great! Your booking has been confirmed.
          </Text>
          {appointment ? (
            <View className="flex flex-row" style={{ height: width / 4 }}>
              <View className="bg-white rounded-xl w-1/4 aspect-square flex justify-evenly items-center">
                <Text
                  className="text-sm text-[#333333]"
                  style={{ fontFamily: "BaiJamjuree-Regular" }}
                >
                  {appointment.startSlot
                    ? format(new Date(appointment.startSlot), "iii")
                    : null}
                </Text>
                <Text
                  className="text-2xl text-[#333333]"
                  style={{ fontFamily: "BaiJamjuree-Bold" }}
                >
                  {appointment.startSlot
                    ? format(new Date(appointment.startSlot), "dd")
                    : null}
                </Text>
                <Text
                  className="text-sm text-[#333333]"
                  style={{ fontFamily: "BaiJamjuree-Regular" }}
                >
                  {appointment.startSlot
                    ? format(new Date(appointment.startSlot), "MMM")
                    : null}
                </Text>
              </View>
              <View className="w-4 aspect-square" />
              <View className="border border-white rounded-xl w-2/4 overflow-hidden">
                <View className="flex flex-row justify-center items-center h-1/2">
                  <View className="w-[18px] aspect-square mr-3">
                    <SvgIcons
                      iconType={
                        appointment.startSlot
                          ? format(new Date(appointment.startSlot), "aaa") ===
                            "am"
                            ? "sun"
                            : "moon"
                          : "sun"
                      }
                      color="#FFFFFF"
                    />
                  </View>
                  <Text
                    className="font-bold text-white capitalize text-lg"
                    style={{ fontFamily: "BaiJamjuree-Bold" }}
                  >
                    {appointment.startSlot
                      ? format(new Date(appointment.startSlot), "aaa") === "am"
                        ? "Morning"
                        : "Evening"
                      : ""}
                  </Text>
                </View>
                <View className="w-full h-1/2 bg-white rounded-b-lg flex justify-evenly items-center">
                  <Text
                    className="text-lg text-[#393939]"
                    style={{ fontFamily: "BaiJamjuree-Bold" }}
                  >
                    {appointment.startSlot
                      ? format(new Date(appointment.startSlot), "h:mm aaa")
                      : null}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
        </ScrollView>
        <TouchableOpacity
          className="rounded-full px-4 py-3 m-4 bg-white"
          onPress={() => onProceed(user)}
        >
          <Text
            className="text-[#100F1A] text-base text-center"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Start Health Transformation
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SlotBookedV2;
