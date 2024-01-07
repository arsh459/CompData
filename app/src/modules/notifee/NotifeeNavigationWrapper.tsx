import { NotificationToSave } from "@models/notifee/interface";
import { useNavigation } from "@react-navigation/native";
import { updateNotificationSeen } from "@utils/notifications/uttils";
import { TouchableOpacity } from "react-native";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useNotificationContext } from "@providers/notification/NotificationProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  children: React.ReactNode;
  notifyObj: NotificationToSave;
  day: string;
}

const NotifeeNavigationWrapper: React.FC<Props> = ({
  children,
  notifyObj,
  day,
}) => {
  const { state } = useAuthContext();
  const navigation = useNavigation();
  const { updateSingleNotification } = useNotificationContext();

  const handlePress = () => {
    updateNotificationSeen(state.uid ? state.uid : "", notifyObj.id);
    updateSingleNotification(day, notifyObj);
    if (notifyObj.navigateTo && notifyObj.navigateToParams) {
      // @ts-ignore
      navigation.navigate(notifyObj.navigateTo, notifyObj.navigateToParams);
    }

    weEventTrack("notificationClick_List", { title: notifyObj.title });
  };

  return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
};

export default NotifeeNavigationWrapper;
