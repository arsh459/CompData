import Loading from "@components/loading/Loading";
import { PAYMENTS_BY } from "@constants/gameStats";
import { UserInterface } from "@models/User/User";
import ProMain from "@modules/ProScreenMain/ProMain";
import ProMainInApp from "@modules/ProScreenMain/ProMainInApp";
import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";
import { useUserStore } from "@providers/user/store/useUserStore";

import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  goToHome: () => Promise<void>;
  onSlotBookingSkip: (user?: UserInterface) => void;
  onSlotBookingRequest: () => void;
}

export const PlanScreen: React.FC<Props> = ({
  onSlotBookingSkip,
  onSlotBookingRequest,
}) => {
  const user = useUserStore((state) => state.user);
  const { interactionStatus } = useInteractionContext();
  const { bottom } = useSafeAreaInsets();

  return (
    <View>
      {interactionStatus && PAYMENTS_BY === "RAZORPAY" ? (
        <ProMain
          rightText="Skip for now"
          topRightOnClick={() => onSlotBookingSkip(user)}
          onBookSlot={onSlotBookingRequest}
          paddingBottom={bottom || 16}
          iPlanType="pro"
        />
      ) : interactionStatus ? (
        <ProMainInApp
          rightText="Skip for now"
          noTopRightIcon={true}
          topRightOnClick={() => onSlotBookingSkip(user)}
          paddingBottom={bottom || 16}
          btn1={true}
        />
      ) : (
        <View className="flex bg-[#232136] flex-1 w-full h-full justify-center items-center">
          <Loading width="w-8" height="h-8" />
        </View>
      )}
    </View>
  );
};

export default PlanScreen;
