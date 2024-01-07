import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ImageWithURL from "@components/ImageWithURL";
import { DrMaitreeIcon } from "@constants/imageKitURL";
import { AppointmentInterface } from "@modules/DoctorFormMain/utils";
import { useUserV2 } from "@hooks/auth/useUserV2";
import MediaTile from "@components/MediaCard/MediaTile";
import { getPrimarySecondaryText } from "./utils";
import clsx from "clsx";
import AppBottomButtons from "./Components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  appointmentSubtext,
  nonGynaecAppointmentSubtext,
} from "@screens/AppointmentBookedScreen";

interface Props {
  appointment?: AppointmentInterface;
}

const UpcomingAppointments: React.FC<Props> = ({ appointment }) => {
  const { user: doctor } = useUserV2(appointment?.doctorId);

  const { primary, main } = getPrimarySecondaryText(appointment);
  const { bottom } = useSafeAreaInsets();

  if (
    appointment?.status === "SCHEDULED" ||
    appointment?.status === "CANCELLED"
  ) {
    return (
      <View className="flex-1">
        <View className="flex-1 px-4 relative z-0">
          <View className="w-full">
            <LinearGradient
              colors={["#DF8EF4", "#9A4AD6", "#491C99"]}
              className="w-full aspect-[304/129] rounded-3xl  "
            >
              <View className="w-full flex flex-row ">
                <View className="relative z-0 w-1/2 aspect-[119/110]"></View>
                <View className="w-1/2 flex-1 py-6 flex   justify-start">
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{ lineHeight: 21 }}
                    className="text-[#F1F1F1] w-4/5   text-xl font-sans font-semibold"
                  >
                    {doctor?.name}
                  </Text>
                  <Text
                    className="text-[#FF7DE2] pt-3 text-xs "
                    style={{ fontFamily: "Nunito-SemiBold" }}
                  >
                    {doctor?.landingContent?.qualification}
                  </Text>
                </View>
              </View>
            </LinearGradient>
            <View className="absolute w-1/2  bottom-0 -top-5  left-0 ">
              <View className="w-full">
                <MediaTile media={doctor?.landingContent?.img} fluid={true} />
              </View>
            </View>
            <ImageWithURL
              source={{ uri: DrMaitreeIcon }}
              className="absolute w-1/2 -top-5 bottom-0 left-0"
              resizeMode="contain"
            />
          </View>

          <View className="pt-4">
            <Text
              className="text-[#F1F1F1] text-xl"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {main}
              <Text
                className={clsx(
                  appointment.status === "CANCELLED"
                    ? "text-[#FF5970]"
                    : "text-[#51FF8C]",
                  "text-xl"
                )}
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {" "}
                {primary}
              </Text>
            </Text>
          </View>

          <Text
            className="text-white/50 text-xs pt-4"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {appointment.category === "gynaecologist"
              ? appointmentSubtext
              : nonGynaecAppointmentSubtext}
          </Text>
        </View>

        <View style={{ paddingBottom: bottom || 16 }}>
          <AppBottomButtons
            status={appointment.status}
            link={appointment.link}
          />
        </View>
      </View>
    );
  } else {
    return <View />;
  }

  // else {
  //   return <NoSlot heading="No Upcoming sessions" allowBooking={true} />;
  // }
};

export default UpcomingAppointments;
