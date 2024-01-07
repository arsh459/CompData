import useCustomRecipe from "@providers/customRecipe/useCustomRecipe";
import { View, Text, TouchableOpacity } from "react-native";
import SvgIcons from "@components/SvgIcons";
import IngredientScreenModal from "./IngredientScreenModal";
import { useState } from "react";
import { gptPrompts } from "@models/config/config";
import { useConfigContext } from "@providers/Config/ConfigProvider";

type ItemProps = { title: string; index: number; gptPrompt?: gptPrompts };

const IngredientsItem = ({ title, index, gptPrompt }: ItemProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const {
    isAdded,
    onToggleIngredient,
    findIngredientReplacement,
    clearIngredients,
  } = useCustomRecipe((state) => {
    return {
      isAdded: state.selectedIngredientsArrayOrdered[index].status,
      onToggleIngredient: state.onToggleIngredient,
      findIngredientReplacement: state.findIngredientReplacement,
      clearIngredients: state.clearIngredients,
    };
  });
  const { config } = useConfigContext();

  function trim(title: string) {
    return (
      title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase()
    );
  }

  const trimmedTitle = trim(title);

  return (
    <>
      <View>
        <TouchableOpacity
          onPress={() => {
            if (isAdded) {
              findIngredientReplacement(
                trimmedTitle,
                config?.apiKey,
                gptPrompt
              );
              setIsVisible((prev) => !prev);
            } else {
              onToggleIngredient(title, index);
            }
          }}
        >
          <View
            className={`flex flex-row justify-between  ${
              isAdded ? "border border-1.5 border-[#6D44D1]" : ""
            } ${
              isAdded ? "bg-[#6e3aff40]" : "bg-[#343150]"
            } rounded-lg mb-4 p-2`}
          >
            <View className="pl-2">
              <Text className="text-base font-medium text-[#fff] capitalize-first-letter">
                {trimmedTitle}
              </Text>
            </View>

            <View className="">
              <IngredientScreenModal
                isVisible={isVisible}
                onClose={() => {
                  setIsVisible((prev) => !prev);
                  clearIngredients();
                }}
                title={title}
                index={index}
              />
            </View>

            <View className="pr-1">
              <View>
                <View className={" border border-1 rounded-full "}>
                  <SvgIcons
                    iconType={
                      isAdded ? "ingredientSubtractIcon" : "ingredientAddIcon"
                    }
                    color="#6D55D1"
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default IngredientsItem;
