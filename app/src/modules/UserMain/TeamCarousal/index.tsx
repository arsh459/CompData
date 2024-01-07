import { EventInterface } from "@models/Event/Event";
import { useUserEnrolledEventsV2 } from "@modules/HomeScreen/utills/useUserEnrolledEventsV2";
import { useProfileContext } from "@providers/profile/ProfileProvider";
import { View, Text, FlatList } from "react-native";
import TeamCard from "./TeamCard";

const TeamCarousal = () => {
  const { profile } = useProfileContext();
  const { userEvents, onNext } = useUserEnrolledEventsV2(profile?.uid);

  const renderItem = ({ item }: { item: EventInterface }) => {
    return <TeamCard team={item} />;
  };

  return (
    <>
      {userEvents.length ? (
        <FlatList
          data={userEvents}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item}-${index}`}
          onResponderEnd={onNext}
          className="flex-1 mx-4"
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1  flex items-center justify-center">
          <Text className="text-3xl text-gray-700 text-center font-bold">
            No Teams to show
          </Text>
        </View>
      )}
    </>
  );
};
export default TeamCarousal;
