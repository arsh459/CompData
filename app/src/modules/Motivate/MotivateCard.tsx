import UserImage from "@components/UserImage";
import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import clsx from "clsx";

import { Text, View } from "react-native";
export interface MotivateCardInterface {
  userName?: string;
  uid: string;
  img?: CloudinaryMedia | AWSMedia;
}
const MotivateCard: React.FC<MotivateCardInterface> = ({
  uid,
  userName,
  img,
}) => {
  const { expiryString } = usePaidStatus(uid);

  return (
    <View
      className="flex flex-row  items-center py-4 px-6 "
      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
    >
      <View className="flex flex-row items-center flex-1">
        {/* <View className="w-6 h-6 bg-white rounded-full " /> */}
        <UserImage image={img} width="w-6" height="h-6" name={userName} />
        <Text
          className={clsx(
            "text-sm flex-1 pl-2 iphoneX:text-base font-semibold text-white",
            expiryString === "Paid" ? "text-white" : "text-[#FFFFFF5C]"
          )}
        >
          {userName}
        </Text>
      </View>
      <View className={clsx("flex   flex-row ")}>
        <Text
          style={
            expiryString === "Paid"
              ? { color: "#49FF71" }
              : expiryString === "Unpaid"
              ? { color: "yellow" }
              : { color: "#FF4869" }
          }
        >
          &#9679;
        </Text>

        <View className="w-[70px]">
          <Text
            className={clsx(
              "text-center",
              expiryString === "Paid" ? "text-white" : "text-[#FFFFFF5C]"
            )}
          >
            {expiryString}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MotivateCard;
