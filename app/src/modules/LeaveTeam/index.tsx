import CloseBtn from "@components/Buttons/CloseBtn";
import Loading from "@components/loading/Loading";
import UseModal from "@components/UseModal";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { internalTeamLeaveRequest } from "./internalCall";
import { useNavigation } from "@react-navigation/native";

interface Props {
  visible: boolean;
  onClose: () => void;
  teamId?: string;
  userId?: string;
}

const LeaveTeam: React.FC<Props> = ({ visible, onClose, teamId, userId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigation = useNavigation();

  const onLeaveTeamClick = async () => {
    if (teamId && userId) {
      setLoading(true);

      const res = await internalTeamLeaveRequest(teamId, userId);

      if (res === "success") {
        navigation.navigate("Home");
      } else {
        setLoading(false);
        setError("Something went wrong");
      }
    }
  };

  return (
    <UseModal visible={visible} onClose={onClose}>
      <View className="w-[95%] bg-white rounded-xl p-4">
        {loading ? (
          <View className="flex items-center justify-center w-full h-48">
            <Loading width="w-10" height="h-10" />
          </View>
        ) : (
          <>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl text-center font-semibold font-sans">
                {error ? "Error" : "Are you sure?"}
              </Text>
              <CloseBtn onClose={onClose} color="#000000" />
            </View>
            <Text className="text-lg text-gray-700 font-sans py-4">
              {error
                ? error
                : "This action is irreversible. You will lose all your progress in the team and will have to start fresh in another team."}
            </Text>
          </>
        )}
        <View className="flex flex-row justify-end">
          <View className="pr-2">
            <Pressable
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onPress={onClose}
            >
              <Text>I WILL STAY</Text>
            </Pressable>
          </View>

          <Pressable
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
            onPress={onLeaveTeamClick}
          >
            <Text>{error ? "TRY AGAIN" : "LEAVE TEAM"}</Text>
          </Pressable>
        </View>
      </View>
    </UseModal>
  );
};

export default LeaveTeam;
