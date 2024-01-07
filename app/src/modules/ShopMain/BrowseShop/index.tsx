import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { Voucher } from "@models/Voucher/interface";
import VoucherCard, { spacing } from "./VoucherCard";
import { useSbRewards } from "@hooks/sbrewards/useSbRewards";
import FilterVoucherModal from "./FilterVoucherModal";
import Loading from "@components/loading/Loading";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

import HeaderContent from "./HeaderContent";

const { width } = Dimensions.get("window");

const cardWidth = (width - spacing * 3) / 2;
const separatorHeight = spacing;
const ITEM_Height = cardWidth * (148 / 193) + separatorHeight;

interface Props {
  tabBarHeight: number;
}

const BrowseShop: React.FC<Props> = ({ tabBarHeight }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { vouchers, onNext, filter, changeFilter } = useSbRewards(4);

  const handleFilterClick = () => {
    weEventTrack("shop_clickChangeFilter", {});
    setIsOpen(true);
  };

  function renderItem({ item }: { item: Voucher }) {
    return <VoucherCard item={item} />;
  }

  const keyExtractor = (item: Voucher) => item.id;

  const getItemLayout = (
    _: ArrayLike<Voucher> | null | undefined,
    index: number
  ) => {
    return {
      length: ITEM_Height,
      offset: ITEM_Height * index,
      index,
    };
  };

  return (
    <View className="flex-1">
      {/* {vouchers.length ? ( */}
      <FlatList
        data={vouchers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onNext}
        getItemLayout={getItemLayout}
        ListHeaderComponent={<HeaderContent />}
        ItemSeparatorComponent={() => (
          <View style={{ height: separatorHeight }} />
        )}
        bounces={false}
        numColumns={2}
        ListFooterComponent={
          vouchers.length ? (
            <View style={{ height: tabBarHeight }} />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Loading width="w-12" height="h-12" />
            </View>
          )
        }
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: spacing,
          paddingBottom: spacing,
        }}
      />
      <View style={{ height: separatorHeight }} />
      {/* ) : (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-3xl text-white text-center font-bold">
            Sorry for inconvenience, No profucts in shop as of now.
          </Text>
          <View style={{ height: tabBarHeight }} />
        </View>
      )} */}
      <FilterVoucherModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setFilter={changeFilter}
        filter={filter}
      />
      <TouchableOpacity
        className="absolute  right-5  w-12 aspect-square  rounded-full"
        style={{ bottom: tabBarHeight + 15 }}
        onPress={handleFilterClick}
      >
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/Component_1__7__VP02rSgpQl.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665060817286",
          }}
          className="w-12 aspect-square"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default BrowseShop;
