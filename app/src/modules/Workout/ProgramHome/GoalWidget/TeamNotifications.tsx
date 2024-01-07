import NestedScrollFlatList from "@components/NestedScrollFlatList";
import { useLatestPosts } from "@hooks/posts/useLatestPosts";
import { useGameContext } from "@providers/game/GameProvider";
import { useState } from "react";

import { View, FlatList } from "react-native";
import NotificationHeader from "./NotificationHeader";
import NotificationRenderItem from "./NotificationRenderItem";

interface Props {}

const TeamNotifications: React.FC<Props> = ({}) => {
  const { game } = useGameContext();
  const { posts } = useLatestPosts(game?.id, 5);
  const [viewWidth, setViewWidth] = useState(0);

  return (
    <View
      className="h-60 rounded-2xl overflow-hidden"
      onLayout={(e) => setViewWidth(e.nativeEvent.layout.width)}
    >
      <NestedScrollFlatList horizontal={true} width={viewWidth}>
        <FlatList
          data={posts}
          renderItem={({ item, index }) => (
            <>
              <NotificationRenderItem post={item} />
              {posts.length - 1 !== index ? (
                <View className="h-px bg-[#4D4D4D] " />
              ) : null}
            </>
          )}
          keyExtractor={(item) => item.id}
          bounces={false}
          nestedScrollEnabled={true}
          style={{ width: viewWidth }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<NotificationHeader />}
        />
      </NestedScrollFlatList>
    </View>
  );
};

export default TeamNotifications;
