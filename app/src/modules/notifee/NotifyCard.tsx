import { View, Text, Image } from "react-native";
import { NotificationToSave } from "@models/notifee/interface";
import { format } from "date-fns";
import clsx from "clsx";
import NotifeeNavigationWrapper from "./NotifeeNavigationWrapper";

interface Props {
  notifyObj: NotificationToSave;
  day: string;
}
const NotifyCard: React.FC<Props> = ({ notifyObj, day }) => {
  return (
    <NotifeeNavigationWrapper notifyObj={notifyObj} day={day}>
      <View
        className={clsx(
          "flex flex-row justify-between rounded-2xl p-4 mx-4",
          notifyObj.seen ? "bg-[#232332]" : "bg-[#333347]"
        )}
      >
        {notifyObj.imageUrl ? (
          <Image
            source={{ uri: notifyObj.imageUrl }}
            className={clsx(
              "w-1/5 aspect-square mr-4",
              notifyObj.imgRounded && "rounded-full"
            )}
          />
        ) : null}
        <View className="flex-1 flex">
          <Text
            numberOfLines={2}
            className="text-xs text-white "
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            {notifyObj.title}
          </Text>
          {notifyObj.subtitle ? (
            <Text
              numberOfLines={1}
              className="text-xs text-white "
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              {notifyObj.subtitle}
            </Text>
          ) : null}
          <View className="pt-1">
            <Text
              numberOfLines={2}
              className="text-xs text-white opacity-80"
              // style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            >
              {notifyObj.body}
            </Text>
          </View>
          <View className="h-1" />
          <Text
            numberOfLines={1}
            className="text-[#FFFFFF66] text-xs"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            {format(new Date(notifyObj.createdOn), "hh:mm a")}
          </Text>
        </View>
        <Text
          className={clsx(
            "text-[#FF33A1] text-4xl ml-4",
            notifyObj.seen ? "hidden" : "block"
          )}
        >
          &bull;
        </Text>
      </View>
    </NotifeeNavigationWrapper>
  );
};

export default NotifyCard;
