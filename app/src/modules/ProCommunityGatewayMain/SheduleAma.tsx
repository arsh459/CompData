import { View, Text, FlatList } from "react-native";

import { amaSheduleIcon } from "@constants/imageKitURL";
import { CheckIn, useUserHealthCheckins } from "@hooks/healthcheckins";
import { useUserContext } from "@providers/user/UserProvider";
import CheckInCard from "./CheckInCard";
import ImageWithURL from "@components/ImageWithURL";

const SheduleAma = () => {
  const { user } = useUserContext();
  const { checkins, onNext } = useUserHealthCheckins(2, user?.uid);

  const renderCheckInCard = ({
    item,
    index,
  }: {
    item: CheckIn;
    index: number;
  }) => {
    return <CheckInCard index={index} item={item} key={item.id} />;
  };
  const ListHeader = () => (
    <>
      <ImageWithURL
        source={{
          uri: amaSheduleIcon,
        }}
        className="w-4/5 mx-auto aspect-[216/216]"
      />
      <Text
        className="text-white text-2xl leading-9"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Schedule your weekly checkins 🗓️🩺
      </Text>

      <Text
        className="text-white/70 text-sm pt-6"
        style={{ fontFamily: "Nunito-Regular" }}
      >
        Your Health Coach will be doing weekly checkins to monitor and update
        your program. You can customize your check-in schedules. This service is
        provided to all active PRO subscription users.
      </Text>

      <Text className="text-white/70 text-base py-6 pb-3">Schedule</Text>
    </>
  );

  return (
    <View className="w-4/5 mx-auto">
      <FlatList
        data={checkins}
        renderItem={renderCheckInCard}
        keyExtractor={(item) => item.id}
        onEndReached={onNext}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.4}
        ListHeaderComponent={<ListHeader />}
      />
    </View>
  );
};

export default SheduleAma;
