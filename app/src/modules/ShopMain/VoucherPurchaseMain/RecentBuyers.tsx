import RecentVoucherBuyerCard from "./RecentVoucherBuyerCard";
import { UserInterface } from "@models/User/User";
import { View } from "react-native";

interface Props {
  users?: UserInterface[];
}

const RecentBuyers: React.FC<Props> = ({ users }) => {
  return (
    <View className="bg-[#292935] rounded-xl p-2 flex flex-row flex-wrap">
      {users?.map((item, index) => (
        <RecentVoucherBuyerCard key={index} user={item} />
      ))}
    </View>
  );
};

export default RecentBuyers;
