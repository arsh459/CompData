import { View, ScrollView } from "react-native";
import Header from "@modules/Header";
import RecentVoucherBuyerCard from "../VoucherPurchaseMain/RecentVoucherBuyerCard";
import { useVoucherUsers } from "@hooks/sbrewards/useVoucherUsers";

interface Props {
  voucherId: string;
}

const PurchaserScreenMain: React.FC<Props> = ({ voucherId }) => {
  const { users } = useVoucherUsers(voucherId);

  return (
    <>
      <Header
        back={true}
        tone="dark"
        headerColor="#292935"
        title="Back to Reward"
      />
      <View className="flex-1 bg-[#292935] p-4">
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {users?.map((item, index) => {
            return <RecentVoucherBuyerCard key={item.uid} user={item} />;
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default PurchaserScreenMain;
