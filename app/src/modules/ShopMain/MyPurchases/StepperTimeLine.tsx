import { View } from "react-native";
import Stepper, { redeemedProps } from "../VoucherPurchaseMain/Stepper";
import clsx from "clsx";

interface Props {
  isRedeemed?: redeemedProps;
  height?: string;
  children?: React.ReactNode;
}

const StepperTimeLine: React.FC<Props> = ({ isRedeemed, height, children }) => {
  return (
    <View className={clsx("flex justify-between", height ? height : "h-14")}>
      <Stepper
        text="Purchase requested"
        textStyle="text-[10px] iphoneX:text-xs"
        ringColor="#31FFB5"
        isRedeemed={isRedeemed}
        isBottom={true}
      />
      {children ? (
        children
      ) : (
        <View className="w-1/12 min-w-[16px] flex-1 flex justify-center items-center">
          <View
            className="flex-1 w-px bg-[#BABABA]"
            style={{
              backgroundColor:
                isRedeemed !== "redeemed" ? "#BABABA" : "#31FFB5",
            }}
          />
        </View>
      )}

      <Stepper
        text="Delivered to you"
        isRedeemed={isRedeemed}
        textStyle="text-[10px] iphoneX:text-xs"
        ringColor="#31FFB5"
        isBottom={isRedeemed === "redeemed"}
      />
    </View>
  );
};

export default StepperTimeLine;
