import { Text } from "react-native";
import { View } from "react-native";
import { usePurchaseFormStore } from "../store/usePurchaseFormStore";
import { shallow } from "zustand/shallow";

const FormProgress = () => {
  const { stage, productVariants } = usePurchaseFormStore(
    (state) => ({
      stage: state.formStage,
      productVariants: state.productVariants,
    }),
    shallow
  );
  return (
    <View className=" flex flex-row justify-center items-center gap-2 p-4">
      <Text
        className={`${
          stage >= 1
            ? " text-[#232136] bg-[#8F74FF]"
            : "text-gray-400 bg-[#343150]"
        } py-2 px-3 rounded-md `}
      >
        1
      </Text>
      <View
        className={`${
          stage >= 2 ? "bg-[#8F74FF]" : "bg-[#494667]"
        } h-2 flex-1 rounded`}
      />
      <Text
        className={`${
          stage >= 2
            ? " text-[#232136] bg-[#8F74FF]"
            : "text-gray-400 bg-[#343150]"
        } py-2 px-3 rounded-md `}
      >
        2
      </Text>
      {productVariants.length && (
        <View
          className={`${
            stage >= 3 ? "bg-[#8F74FF]" : "bg-[#494667]"
          } h-2 flex-1 rounded`}
        />
      )}
      {productVariants.length && (
          <Text
            className={`${
              stage >= 3
                ? " text-[#232136] bg-[#8F74FF]"
                : "text-gray-400 bg-[#343150]"
            } py-2 px-3 rounded-md `}
          >
            3
          </Text>
      )}
    </View>
  );
};

export default FormProgress;
