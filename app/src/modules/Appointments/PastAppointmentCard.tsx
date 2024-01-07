import { View, Text, TouchableOpacity } from "react-native";

import {
  AppointmentInterface,
  formatUnixTimestampByDateTime,
} from "@modules/DoctorFormMain/utils";
import { useUserV2 } from "@hooks/auth/useUserV2";
import MediaTile from "@components/MediaCard/MediaTile";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { getColorsByAppointmentStatus } from "./utils";
interface Props {
  appointment: AppointmentInterface;
}
const PastAppointmentCard: React.FC<Props> = ({ appointment }) => {
  const { user: doctor } = useUserV2(appointment?.doctorId);

  const navigation = useNavigation();

  const onPress = () => {
    weEventTrack("manageAppointments_clickAppointment", {});
    navigation.navigate("AppointmentBookedScreen", {
      appointmentId: appointment?.id,
      navTo: "BACK",
    });
  };
  const { borderColor, cardColor, textColor } =
    getColorsByAppointmentStatus(appointment);

  return (
    <TouchableOpacity onPress={onPress} className="w-full  relative z-0">
      <View
        className="w-full  rounded-3xl   border "
        style={{ backgroundColor: cardColor, borderColor: borderColor }}
      >
        <View className="w-full flex flex-1 flex-row  items-center">
          <View className="relative z-0 w-1/2 "></View>
          <View className="w-1/2 flex-1 flex py-4">
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{ lineHeight: 21 }}
              className="text-[#f2f2f2] w-4/5 text-base iphoneX:text-xl font-sans font-semibold"
            >
              {doctor?.name}
            </Text>
            <Text className="text-white/80 text-xs">
              {doctor?.landingContent?.qualification}
            </Text>

            <Text
              className="capitalize  pt-2 text-xs   w-4/5"
              style={{ color: textColor, fontFamily: "Nunito-Bold" }}
            >
              Call {appointment?.status}
            </Text>

            <Text
              className=" text-xs font-sans font-normal  w-4/5"
              style={{
                color: textColor,
                opacity: 0.8,
              }}
            >
              {formatUnixTimestampByDateTime(appointment?.startSlot)}
            </Text>
            <View className="w-4/5 pt-2">
              <StartButton
                title={"View Details"}
                bgColor="bg-[#fff] "
                textColor="text-[#232036] "
                roundedStr="rounded-xl border-[0.2px] border-[#6D55D1] flex-1"
                textStyle="py-2 text-center text-xs "
                onPress={onPress}
                fontFamily="Nunito-Bold"
              />
            </View>
          </View>
          <View className="absolute w-1/2  bottom-0  top-0 ">
            <View className="w-full">
              <MediaTile media={doctor?.landingContent?.img} fluid={true} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PastAppointmentCard;
