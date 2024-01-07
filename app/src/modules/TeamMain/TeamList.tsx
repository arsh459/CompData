import {
  View,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
} from "react-native";

import { Badge } from "@models/Prizes/Prizes";
import BadgeCard, {
  Badge_Item_Height,
} from "@modules/UserMain/ProfileList/BadgeCard";
import { Post } from "@models/Post/Post";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useTeamContext } from "@providers/team/TeamProvider";
import { useTeamPosts } from "@hooks/posts/useTeamPosts";
import { useTeamBadges } from "@hooks/badges/useTeamBadges";
import TeamActivityCard, { Activity_Item_Height } from "./TeamActivityCard";
import { useGameContext } from "@providers/game/GameProvider";

type postType = {
  post: Post;
  ref: FirebaseFirestoreTypes.DocumentReference;
};

interface Props {
  ListHeaderComponent: () => JSX.Element;
  handleScroll: (val: number) => void;
  selectedView: "Team Activites" | "Team Badges";
}

const TeamList: React.FC<Props> = ({
  ListHeaderComponent,
  handleScroll,
  selectedView,
}) => {
  const { game } = useGameContext();
  const { team } = useTeamContext();
  const { posts, onNext } = useTeamPosts(team?.id);
  const { teamBadges } = useTeamBadges(game?.id, team?.enrolledUserUIDs);

  const getItemLayout = (
    _: ArrayLike<postType | Badge> | null | undefined,
    index: number
  ) => {
    const Item_Height =
      selectedView === "Team Activites"
        ? Activity_Item_Height
        : Badge_Item_Height;
    return {
      length: Item_Height,
      offset: Item_Height * index,
      index,
    };
  };

  const ListFooterComponent = ({ text }: { text: string }) => {
    return (
      <View className="flex-1 flex justify-start items-center py-5 iphoneX:py-8">
        <Text
          className="text-white/50 font-bold text-xl iphoneX:text-2xl text-center"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          {text}
        </Text>
        <Text
          className="text-white/50 font-bold text-xl iphoneX:text-2xl text-center"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          It's time to workout
        </Text>
      </View>
    );
  };

  const flatListProps = {
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    ListHeaderComponent,
    onEndReachedThreshold: 0.9,
    bounces: false,
    numColumns: 2,
    onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) =>
      handleScroll(e.nativeEvent.contentOffset.y),
    scrollEventThrottle: 1,
    getItemLayout,
    style: { flex: 1, backgroundColor: "#100F1A" },
  };

  const renderItem = ({
    item,
  }: {
    item: { post: Post; ref: FirebaseFirestoreTypes.DocumentReference };
  }) => {
    return <TeamActivityCard post={item.post} uid={item.post.creatorId} />;
  };

  const renderBadges = ({ item }: { item: Badge }) => {
    return <BadgeCard badge={item} />;
  };

  const activityKey = (item: {
    post: Post;
    ref: FirebaseFirestoreTypes.DocumentReference;
  }) => `${item.post.id}`;

  return (
    <>
      {selectedView === "Team Activites" ? (
        <FlatList
          // showsHorizontalScrollIndicator={false}
          // showsVerticalScrollIndicator={false}
          // ListHeaderComponent={() => <ListHeaderComponent />}
          // onEndReachedThreshold={0.9}
          // getItemLayout={getItemLayout}
          // numColumns={2}
          // bounces={false}
          // scrollEventThrottle={16}
          // style={{ flex: 1, backgroundColor: "#100F1A" }}
          data={posts}
          renderItem={renderItem}
          keyExtractor={activityKey}
          onEndReached={onNext}
          key="Team Activites"
          ListFooterComponent={
            posts.length ? null : (
              <ListFooterComponent text="No Activites so far" />
            )
          }
          {...flatListProps}
        />
      ) : selectedView === "Team Badges" ? (
        <FlatList
          data={teamBadges}
          renderItem={renderBadges}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          key="Team Badges"
          ListFooterComponent={
            teamBadges.length ? null : (
              <ListFooterComponent text="No Badges Earned so far" />
            )
          }
          {...flatListProps}
        />
      ) : null}
    </>
  );
};

export default TeamList;
