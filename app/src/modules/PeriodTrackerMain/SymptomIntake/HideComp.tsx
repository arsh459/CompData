import clsx from "clsx";
import { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSymptomIntakeStore } from "./store/SymptomIntakeStore";
import ImageWithURL from "@components/ImageWithURL";
import { chatAiIcon } from "@constants/imageKitURL";
import { questionViewStyles } from "@models/User/questionResponseInterface ";

interface Props {
  hidePresent: boolean;
  viewStyle: questionViewStyles;
}

const HideComp: React.FC<Props> = ({ hidePresent, viewStyle }) => {
  const refAI = useRef<View>(null);
  const { setMeasurAIPost, onHideQu } = useSymptomIntakeStore();

  const getMeasure = () => {
    if (refAI.current) {
      refAI.current.measure((fx, fy, width, height, px, py) => {
        setMeasurAIPost({ fx, fy, width, height, px, py });
      });
    }
  };

  return (
    <View
      className={clsx(
        "flex flex-row justify-between items-center mb-4",
        viewStyle === "bottomsheet" ? "mx-4" : "mx-6"
      )}
      style={{ opacity: hidePresent ? 1 : 0 }}
      pointerEvents={hidePresent ? "auto" : "none"}
    >
      <View ref={refAI} collapsable={false} onLayout={getMeasure}>
        <ImageWithURL
          source={{ uri: chatAiIcon }}
          className="w-8 aspect-[1.5]"
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        onPress={onHideQu}
        className="bg-white rounded-lg px-4 py-1"
      >
        <Text
          className="text-xs text-[#6D55D1]"
          style={{ fontFamily: "Nunito-Regular" }}
        >
          Hide
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HideComp;
