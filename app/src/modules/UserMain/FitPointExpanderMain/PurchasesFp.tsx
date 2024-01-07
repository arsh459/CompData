import { View, SectionList, Text } from "react-native";
import Loading from "@components/loading/Loading";
import { useUserContext } from "@providers/user/UserProvider";
import { useMyPurchasesSections } from "@hooks/sbrewards/useMyPurchasesSections";
import { MyPurchases } from "@models/MyPurchases/interface";
import SepratorFpSection from "./SepratorFpSection";
import MyPurchaseListCard from "./MyPurchaseListCard";

const PurchasesFp = () => {
  const { user } = useUserContext();
  const { sections, onNext, init } = useMyPurchasesSections(user?.uid, 5);

  if (!sections.length) {
    return (
      <View className="flex justify-center items-center flex-1">
        <Loading fill="#ff735c" width="w-16" height="h-16" />
      </View>
    );
  }
  const renderSectionHeaderFpHome = ({
    section: { title },
  }: {
    section: { title: string; data: MyPurchases[] };
  }) => {
    return <SepratorFpSection text={title} />;
  };

  const renderItemFpHome = ({ item }: { item: MyPurchases }) => {
    return <MyPurchaseListCard item={item} />;
  };

  return init && !sections.length ? (
    <View className="flex justify-center items-center flex-1">
      <Text
        className="text-[#FFFFFF8C] text-base iphoneX:text-lg py-12 text-center"
        style={{ fontFamily: "BaiJamjuree-SemiBold" }}
      >
        No Activites Found
      </Text>
    </View>
  ) : (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.purchaseId}
      renderItem={renderItemFpHome}
      renderSectionHeader={renderSectionHeaderFpHome}
      ItemSeparatorComponent={() => <View className="w-3 aspect-square" />}
      onEndReached={onNext}
    />
  );
};

export default PurchasesFp;
