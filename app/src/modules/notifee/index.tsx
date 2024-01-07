import { View, SectionList } from "react-native";
import NotifyCard from "./NotifyCard";
import Seprator from "./Seprator";
import NoNotification from "@modules/NotificationMain/NoNotification";
import { useNotificationContext } from "@providers/notification/NotificationProvider";
import { NotificationToSave } from "@models/notifee/interface";
import EnableNotification from "./EnableNotification";

const NotificationNew = () => {
  const { notification, extraData, onNext, init } = useNotificationContext();

  const keyExtractor = (item: NotificationToSave, index: number) =>
    `${item.id}`;

  return (
    <View className="flex-1 bg-[#100F1A]">
      {!init ? (
        <NoNotification text="Fetching Notifications" />
      ) : (
        <>
          {/* <View className="py-4">
            <EnableNotification text="Don't miss a workout. Enable notifications to get daily reminders and messages from your coach." />
          </View> */}
          <View className="py-4">
            <EnableNotification />
          </View>
          {notification.length ? (
            <SectionList
              sections={notification}
              keyExtractor={keyExtractor}
              renderItem={({ item, section: { day } }) => (
                <NotifyCard notifyObj={item} day={day} />
              )}
              onEndReached={onNext}
              extraData={extraData}
              renderSectionHeader={({ section: { day } }) => (
                <Seprator text={day} />
              )}
              ItemSeparatorComponent={() => (
                <View className="w-4 aspect-square" />
              )}
            />
          ) : (
            <NoNotification text="No notifications as of now" />
          )}
        </>
      )}
    </View>
  );
};

export default NotificationNew;
