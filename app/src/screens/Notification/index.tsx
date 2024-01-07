// import { UserProvider } from "@providers/user/UserProvider";
import Header from "@modules/Header";
import NotificationNew from "@modules/notifee";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { NotificationProvider } from "@providers/notification/NotificationProvider";
import { useEffect } from "react";
import notifee from "@notifee/react-native";
import { markNotificationsRead } from "@models/User/updateUtils";
import { useUserStore } from "@providers/user/store/useUserStore";

const Notification = () => {
  useScreenTrack();
  // const { state } = useAuthContext();

  const uid = useUserStore((state) => state.user?.uid);

  useEffect(() => {
    uid && markNotificationsRead(uid);
    notifee.setBadgeCount(0);
  }, [uid]);
  return (
    <>
      <Header
        title="Notifications"
        back={true}
        tone="dark"
        headerColor="#100F1A"
      />

      <NotificationProvider>
        <NotificationNew />
      </NotificationProvider>
    </>
  );
};

export default Notification;
