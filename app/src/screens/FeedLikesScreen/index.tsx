import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { useRoute } from "@react-navigation/native";
import { View, Text, Dimensions } from "react-native";
import { Clapper } from "@models/Post/Post";
import { useEffect, useState } from "react";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import Header from "@modules/Header";
import firestore from "@react-native-firebase/firestore";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import FeedLikeRenderComp from "./FeedLikeRenderComp";
import { useFeedLikes } from "@hooks/posts/useFeedLikes";
import Loading from "@components/loading/Loading";

export interface FeedLikesScreenParams {
  postFirebasePath: string;
}

const { height } = Dimensions.get("screen");
export const likeElementHeight = height / 14;

const renderItem = (item: ListRenderItemInfo<Clapper>) => {
  return <FeedLikeRenderComp {...item} />;
};

const FeedLikesScreen: React.FC = () => {
  const route = useRoute();
  const [ref, setRef] = useState<FirebaseFirestoreTypes.DocumentReference>();
  const { postFirebasePath } = route.params as FeedLikesScreenParams;
  const { clappers, onNext, loading, isNextExists } = useFeedLikes(ref);
  useScreenTrack();
  useEffect(() => {
    setRef(firestore().doc(postFirebasePath));
  }, [postFirebasePath]);

  const keyExtractor = (item: Clapper, index: number) => `${item.id}-${index}`;

  return (
    <>
      <Header
        back={true}
        tone="dark"
        headerColor={"#232136"}
        centerTitle={true}
        titleNode={
          <View className="flex flex-row items-center">
            <Text
              className="text-white text-sm iphoneX:text-lg"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              {clappers.length ? clappers.length : 0} People Liked
            </Text>
          </View>
        }
      />
      <View className="bg-[#232136] px-5 pt-5 flex-1">
        <FlashList
          data={clappers}
          renderItem={renderItem}
          onEndReached={onNext}
          snapToAlignment={"center"}
          onEndReachedThreshold={0.6}
          keyExtractor={keyExtractor}
          estimatedItemSize={likeElementHeight}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-3 aspect-square" />}
          ListFooterComponent={
            <View className="flex-1 flex items-center justify-center py-8">
              {loading ? (
                <Loading width="w-12" height="h-12" />
              ) : !clappers.length || !isNextExists ? null : null}
            </View>
          }
        />
      </View>
    </>
  );
};

export default FeedLikesScreen;
