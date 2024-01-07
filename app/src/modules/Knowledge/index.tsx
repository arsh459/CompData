import SvgIcons from "@components/SvgIcons";
import ViewSelectorV2 from "@components/ViewSelector/V2";
import { playIconWhiteFrame14 } from "@constants/imageKitURL";
import Header from "@modules/Header";
import { useState } from "react";
import { View, Text } from "react-native";
import BlogListing from "./BlogListing";
import BlogReels from "./BlogReels";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useRoute } from "@react-navigation/native";

export interface KnowledgeScreenParams {
  padding?: number;
}

const KnowledgeMain = () => {
  useScreenTrack();
  const [selectedView, setSelectedView] = useState<
    "Knowledge Blogs" | "SocialBoat Reels"
  >("Knowledge Blogs");

  const route = useRoute();

  const params = route.params as KnowledgeScreenParams;
  const padding = params?.padding;

  // let bottom: number = 0;
  // if (typeof params?.padding == "number") {
  //   bottom = params.padding;
  // } else {
  // }

  // bottom = useBottomTabBarHeight();

  return (
    <>
      <Header
        titleNode={
          <View className="flex flex-row items-center mx-1">
            <View className="w-6 aspect-[25/31]">
              <SvgIcons iconType="book" />
            </View>
            <Text className="pl-2.5 text-xl  iphoneX:text-xl text-white">
              Knowledge
            </Text>
          </View>
        }
        headerColor="#232136"
        back={padding === 0}
        tone="dark"
      />
      <View className="flex-1 bg-[#232136]">
        <ViewSelectorV2
          view1="Knowledge Blogs"
          view2="SocialBoat Reels"
          currView={selectedView}
          onView1={() => {
            setSelectedView("Knowledge Blogs");
            weEventTrack("knowledge_clickBlogTab", {});
          }}
          onView2={() => {
            setSelectedView("SocialBoat Reels");
            weEventTrack("knowledge_clickReelTab", {});
          }}
          view2IconUrl={playIconWhiteFrame14}
          margin="mx-4 mb-4"
        />

        {selectedView === "Knowledge Blogs" ? (
          <BlogListing tabBarHeight={padding || 0} />
        ) : selectedView === "SocialBoat Reels" ? (
          <BlogReels tabBarHeight={padding || 0} />
        ) : null}
      </View>
    </>
  );
};
export default KnowledgeMain;
