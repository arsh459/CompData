import Swiper from "@components/Swiper";
import { EventInterface } from "@models/Event/Event";
import { TeamProvider } from "@providers/team/TeamProvider";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import TeamCard from "./TeamCard";

interface Props {
  userEvents: EventInterface[];
}

const TeamsContainer: React.FC<Props> = ({ userEvents }) => {
  const [viewWidth, setViewWidth] = useState<number>(0);
  const navigation = useNavigation();

  return userEvents.length ? (
    <View
      className="py-4"
      onLayout={(e) => setViewWidth(e.nativeEvent.layout.width * 0.85)}
    >
      <Text className="px-4 pb-2 text-xl iphoneX:text-2xl font-semibold">
        My Teams
      </Text>
      <Swiper slideWidth={viewWidth} marginX={10} spaceBetween={10}>
        {userEvents.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => navigation.navigate("Community")}
          >
            <TeamProvider selectedTeamId={item.id} initTeamMembers={3}>
              <TeamCard />
            </TeamProvider>
          </Pressable>
        ))}
      </Swiper>
    </View>
  ) : null;
};

export default TeamsContainer;
