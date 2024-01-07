import { View, Text } from "react-native";
import RequestCard from "./RequestCard";
import { TeamRequest } from "@models/Notifications/interface";

interface Props {
  remoteRequests: TeamRequest[];
}

const NotificationMain: React.FC<Props> = ({ remoteRequests }) => {
  return remoteRequests.length ? (
    <View className="bg-[#100F1A] flex-1">
      <View className="border-y border-[#FFFFFF33] m-4">
        <Text
          className="text-[#FFFFFF] py-2 text-base"
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          Team Join Request
        </Text>
        {remoteRequests.map((item) => (
          <View key={item.id}>
            <RequestCard
              id={item.id}
              requestedBy={item.requestedBy}
              teamId={item.teamId}
            />
          </View>
        ))}
      </View>
    </View>
  ) : null;
};

export default NotificationMain;
