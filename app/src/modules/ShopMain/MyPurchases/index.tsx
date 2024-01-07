import { View, FlatList, Text } from "react-native";
import MyVoucherCard from "./MyVoucherCard";
import { useUserContext } from "@providers/user/UserProvider";
import { MyPurchases } from "@models/MyPurchases/interface";
import { useMyPurchasesV2 } from "@hooks/sbrewards/useMyPurchasesV2";
import Loading from "@components/loading/Loading";
import { useNavigation } from "@react-navigation/native";

interface Props {
  startShop: () => void;
  tabBarHeight: number;
}

const MyPurchasesListings: React.FC<Props> = ({ tabBarHeight, startShop }) => {
  const { user } = useUserContext();
  const { myPurchases: vouchers, onNext } = useMyPurchasesV2(user?.uid, 2);

  const navigation = useNavigation();

  function renderItem({ item }: { item: MyPurchases }) {
    const onPress = () =>
      navigation.navigate("PurchasedVoucherScreen", {
        voucherId: item.voucherId,
      });
    return <MyVoucherCard item={item} onPress={onPress} />;
  }

  const keyExtractor = (item: MyPurchases) => item.purchaseId;

  return (
    <View className="flex-1">
      {vouchers.length ? (
        <FlatList
          data={vouchers}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={onNext}
          bounces={false}
          numColumns={1}
          ListFooterComponent={
            vouchers.length ? (
              <View style={{ height: tabBarHeight }} />
            ) : (
              <View className="flex-1 justify-center items-center">
                <Loading width="w-12" height="h-12" />
              </View>
            )
          }
          ItemSeparatorComponent={() => <View className="w-4 aspect-square" />}
        />
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-3xl text-white text-center font-bold">
            No Purchases has been made{" "}
            <Text className="text-blue-500" onPress={startShop}>
              Start Shopping
            </Text>
          </Text>
          <View style={{ height: tabBarHeight }} />
        </View>
      )}
    </View>
  );
};
export default MyPurchasesListings;
