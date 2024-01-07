import { View, FlatList, Image } from "react-native";

import Loading from "@components/loading/Loading";
import { hallOfFameScreenBg } from "@constants/imageKitURL";
import ShieldBadge from "./ShieldBadge";
import BadgeAndPrize from "./BadgeAndPrize";
import { Badge } from "@models/Prizes/Prizes";
import UsersScroll from "./UsersScroll";
import { BadgeWinnersProvider } from "@providers/badges/badgeWinners/badgeWinnersProvider";
import { useHallOfFameContext } from "@providers/badges/HallOfFamePriver";
import clsx from "clsx";
import { formatWithCommas } from "@utils/number";

function renderItem({ item, index }: { item: Badge; index: number }) {
  return (
    <View className={clsx("bg-[#201F2B] flex-1 px-4 ")}>
      <>
        {item ? (
          <BadgeWinnersProvider badgeId={item.id} badgeType={item.badgeId}>
            <View className="py-4">
              <View className="bg-[#34343FCC] p-5 flex flex-row justify-around  rounded-xl">
                <ShieldBadge
                  badgeId={item.badgeId}
                  athleteImage={item.athleteImage}
                  brandImage={item.brandImage}
                />

                <BadgeAndPrize
                  heading={item.name}
                  priceStr={`INR ${
                    item.merchendiseValue
                      ? formatWithCommas(item.merchendiseValue)
                      : 0
                  } `}
                  playerWon={item.playersWon ? item.playersWon : 0}
                />
              </View>
              <UsersScroll />
            </View>
          </BadgeWinnersProvider>
        ) : null}
      </>
    </View>
  );
}
const headerComp = (
  <>
    <Image
      source={{
        uri: hallOfFameScreenBg,
      }}
      className="w-full"
      style={{ aspectRatio: 375 / 204 }}
    />
  </>
);

const keyExtractor = (item: Badge) => item.id;

interface Props {
  handleScroll: (val: number) => void;
}

const HallOfFameV2: React.FC<Props> = ({ handleScroll }) => {
  const { badges, fetched, onNext } = useHallOfFameContext();

  return (
    <>
      {!fetched ? (
        <View className="flex justify-center items-center flex-1 bg-[#100F1A]">
          <Loading fill="#ff735c" width="w-16" height="h-16" />
        </View>
      ) : (
        <FlatList
          data={badges}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          bounces={false}
          onEndReached={onNext}
          className="bg-[#100F1A] flex-1"
          ListHeaderComponent={headerComp}
          ItemSeparatorComponent={() => <View className="h-6" />}
          onScroll={(e) => handleScroll(e.nativeEvent.contentOffset.y)}
          scrollEventThrottle={16}
        />
      )}
    </>
  );
};

export default HallOfFameV2;
