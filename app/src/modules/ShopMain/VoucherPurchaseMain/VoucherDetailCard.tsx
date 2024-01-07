import { View, Text } from "react-native";
import StepperTimeLine from "../MyPurchases/StepperTimeLine";
import { Voucher } from "@models/Voucher/interface";
import { MyPurchases } from "@models/MyPurchases/interface";

interface Props {
  voucher: Voucher;
  myPurchases?: MyPurchases;
}

const VoucherDetailCard: React.FC<Props> = ({ voucher, myPurchases }) => {
  return (
    <View className="bg-[#292935] rounded-xl p-4   my-3.5">
      <Text
        className="text-[#FFFFFF] text-base iphoneX:text-lg "
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        {voucher.name}
      </Text>
      <Text
        className="text-[#C6C6C6] py-2.5 pb-4 text-sm"
        style={{ fontFamily: "BaiJamjuree-Regular" }}
      >
        {voucher.description}
      </Text>

      {myPurchases ? (
        <StepperTimeLine isRedeemed={myPurchases.isRedeemed} height="h-20" />
      ) : (
        <View className="flex justify-between flex-row">
          <Text
            className="text-[#FF556C] text-sm"
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            {`${
              voucher.itemLeft && voucher.itemLeft > 1
                ? `${voucher.itemLeft} items left`
                : voucher.itemLeft === 1
                ? `${voucher.itemLeft} item left`
                : "Currently Unavailable"
            }`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default VoucherDetailCard;
