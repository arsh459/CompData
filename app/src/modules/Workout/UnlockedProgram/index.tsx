// import Loading from "@components/loading/Loading";
// import SubscriptionLeft from "@modules/Subscription/SubscriptionLeft";
// import SubscriptionModal from "@modules/Subscription/SubscriptionModal";
// import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import ProgramHome from "../ProgramHome";
import { View } from "react-native";

interface Props {
  // badgeId: string;
}

const UnlockedProgram: React.FC<Props> = ({}) => {
  // const { subStatus } = useSubscriptionContext();

  return (
    <View className="flex-1">
      <>
        <ProgramHome accessDueToBootcamp={false} />
        {/* {subStatus === "PENDING" ? (
          <View className="h-60 flex justify-center items-center">
            <Loading width="w-8" height="h-8" />
          </View>
        ) : (
          <>
            <ProgramHome />
          </>
        )} */}
      </>
    </View>
  );
};

export default UnlockedProgram;
