import { MealTypes } from "@models/Tasks/Task";
import { View } from "react-native";
import { Camera } from "expo-camera";
import CameraView from "./CameraView";
import Loading from "@components/loading/Loading";
import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";
interface Props {
  mealType: MealTypes;
  camera: Camera | null;
  setCamera: (newVal: Camera | null) => void;
}
const CameraViewComp: React.FC<Props> = ({ mealType, camera, setCamera }) => {
  const { interactionStatus } = useInteractionContext();
  return (
    <View className="w-full px-5 mt-16 mb-12">
      <View className="max-w-md aspect-square rounded-lg overflow-hidden">
        {interactionStatus ? (
          <CameraView
            mealType={mealType}
            camera={camera}
            setCamera={setCamera}
          />
        ) : (
          <View className=" flex-1 items-center justify-center border border-black">
            <Loading />
          </View>
        )}
      </View>
    </View>
  );
};
export default CameraViewComp;
