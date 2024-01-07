import { View } from "react-native";

import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";
import Loading from "@components/loading/Loading";
interface Props {
  children: React.ReactNode;
}
const InteractionWrapper: React.FC<Props> = ({ children }) => {
  const { interactionStatus } = useInteractionContext();
  //Don't forget to add Interaction Provider
  return (
    <>
      {interactionStatus ? (
        <>{children}</>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Loading width="w-12" height="h-12" />
        </View>
      )}
    </>
  );
};

export default InteractionWrapper;
