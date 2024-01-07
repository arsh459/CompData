import { View, FlatList, useWindowDimensions } from "react-native";
import { useState } from "react";
import { useBadgeContext } from "@providers/badges/BadgeProvider";
import { Badge, SBPrizeV2 } from "@models/Prizes/Prizes";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import RenderItemCard from "./renderItemCard";
import { isBadge, isPrizeUnlocked } from "./utils";
import { useBenefits } from "@hooks/benefits/useBenefits";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserContext } from "@providers/user/UserProvider";
import RewardCard from "./RewardCard";
import CashCard from "./CashCard";
import ViewSelector from "@components/ViewSelector";
import ListHeader from "./ListHeader";

interface Props {
  headerHeight: number;
}

const Rewards: React.FC<Props> = ({ headerHeight }) => {
  const [selectedView, setSelectedView] = useState<"my card" | "my benefits">(
    "my card"
  );
  const tabBarHeight = useBottomTabBarHeight();

  const { width } = useWindowDimensions();
  const { state } = useAuthContext();
  const { user } = useUserContext();

  const { badges } = useBadgeContext();
  const { benefits } = useBenefits(state.gameId);

  function renderItemMyCard({
    item,
    index,
  }: {
    item: Badge | SBPrizeV2;
    index: number;
  }) {
    if (isBadge(item)) {
      return <RenderItemCard item={item} width={width} />;
    } else {
      const { unlocked, cardType, cardsNeeded, specificId } = isPrizeUnlocked(
        item,
        user?.independentBadgesWon,
        user?.relativeBadgesWon
      );

      return (
        <View className="pb-4">
          {index === 0 ? (
            <View className="pb-4">
              <CashCard />
            </View>
          ) : null}
          <RewardCard
            isUnlocked={unlocked}
            media={item.media}
            description={item.description}
            cardType={cardType}
            cardsNeeded={cardsNeeded}
            specificId={specificId}
          />
        </View>
      );
    }
  }

  const ListHeaderComponent = () => {
    return (
      <>
        <ListHeader headerHeight={headerHeight} />
        <ViewSelector
          view1="my card"
          view2="my benefits"
          currView={selectedView}
          onView1={() => setSelectedView("my card")}
          onView2={() => setSelectedView("my benefits")}
        />
      </>
    );
  };

  const keyExtractorMyCard = (item: Badge | SBPrizeV2) => item.id;

  return (
    <View className="bg-[#100F1A] flex-1 ">
      {selectedView === "my benefits" ? (
        <FlatList
          data={benefits}
          renderItem={renderItemMyCard}
          numColumns={1}
          bounces={false}
          keyExtractor={keyExtractorMyCard}
          className="flex-1"
          ListHeaderComponent={ListHeaderComponent}
          key={selectedView}
          ListFooterComponent={<View style={{ height: tabBarHeight }} />}
        />
      ) : selectedView === "my card" ? (
        <FlatList
          data={badges}
          renderItem={renderItemMyCard}
          numColumns={2}
          bounces={false}
          keyExtractor={keyExtractorMyCard}
          className="flex-1"
          ListHeaderComponent={ListHeaderComponent}
          key={selectedView}
          ListFooterComponent={<View style={{ height: tabBarHeight }} />}
        />
      ) : null}
    </View>
  );
};

export default Rewards;
