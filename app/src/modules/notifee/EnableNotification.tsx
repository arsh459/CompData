import NotifyBell from "@components/SvgIcons/NotifyBell";
import useBatterySaverStatus from "@hooks/notification/useBatterySaverStatus";
import {
  // NotificationPermissionProvider,
  useNotificationPermissionContext,
} from "@providers/notificationPermissions/NotificationPermissionProvider";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {}

const EnableNotification: React.FC<Props> = ({}) => {
  return (
    // <NotificationPermissionProvider>
    <EnableNotificationComp />
    // </NotificationPermissionProvider>
  );
};

export default EnableNotification;

const EnableNotificationComp: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const { permissionStatus, requestPermission } =
    useNotificationPermissionContext();

  const { isBatterySaverOn, promptDisableBatteryOptimization } =
    useBatterySaverStatus();

  const showAlerts = permissionStatus === "granted" && isBatterySaverOn;

  const textToShow = showAlerts
    ? "Looks like your phone has battery optimization enabled. You might not get notifications. To disable click here"
    : "Don't miss a workout. Enable notifications to get daily reminders and messages from your coach.";
  const onNext = () => {
    requestPermission();
  };
  return permissionStatus !== "granted" || showAlerts ? (
    <View className="flex-1 mx-4 p-4 bg-[#333347] flex justify-between items-center rounded-2xl">
      <View className="flex flex-row items-center mb-4">
        <LinearGradient
          colors={["#B76AFF", "#9B30FF", "#8400FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-14 aspect-square rounded-xl p-3"
        >
          <NotifyBell showDot={true} />
        </LinearGradient>
        <Text className="flex-1 text-xs text-white ml-4">{textToShow}</Text>
      </View>

      {showAlerts ? (
        <View className="flex flex-row  justify-between w-full">
          <TouchableOpacity
            onPress={() => navigation.navigate("BatterySaverScreen")}
            className="w-[47%] bg-[#605B96] rounded-xl py-3"
          >
            <Text className="text-sm text-center text-white px-2">
              Know how
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => promptDisableBatteryOptimization()}
            className="w-[47%] bg-[#6D55D1] rounded-xl py-3"
          >
            <Text className="text-sm text-center text-white px-2">
              Go To Settings
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={onNext}
          className="w-full bg-[#6D55D1] rounded-xl py-3"
        >
          <Text className="text-sm text-center text-white px-2">
            Enable Notification
          </Text>
        </TouchableOpacity>
      )}
    </View>
  ) : null;
};
