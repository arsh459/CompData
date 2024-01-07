import LoadingSpinner from "@components/LoadingSpinner";
import CloseIcon from "@components/SvgIcons/CloseIcon";
import UseModal from "@components/UseModal";
import useCustomRecipe from "@providers/customRecipe/useCustomRecipe";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  index: number;
}

const IngredientScreenModal: React.FC<Props> = ({
  isVisible,
  onClose,
  title,
  index,
}) => {
  const {
    onToggleIngredient,
    addSelectedIngredient,
    ingredentFetching,
    generatedIngredient,
  } = useCustomRecipe((state) => {
    return {
      onToggleIngredient: state.onToggleIngredient,
      addSelectedIngredient: state.addSelectedIngredient,
      ingredentFetching: state.ingredientFetching,
      generatedIngredient: state.generatedIngredients,
    };
  });

  function trim(title: string) {
    return (
      title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase()
    );
  }

  return (
    <UseModal
      visible={isVisible}
      onClose={onClose}
      bgColor="bg-[#232136e6]"
      width="w-full"
      height="h-full"
    >
      <Pressable
        className="absolute left-0 right-0 top-0 bottom-0 -z-10"
        onPress={() => {
          onClose();
        }}
      />
      <View className="w-full h-full flex items-center justify-center">
        <View className="w-full px-9 ">
          <View className="w-full bg-[#362768] px-4 py-8 rounded-lg mb-5 ">
            <View className="w-4 h-4 absolute -top-8 right-1">
              <TouchableOpacity onPress={onClose}>
                <CloseIcon />
              </TouchableOpacity>
            </View>

            <View className="">
              <View className="mb-7">
                <Text className="text-white text-lg font-semibold font-['Nunito'] leading-normal tracking-wide ">
                  Replace{" "}
                  <Text className="capitalize-first-letter">{trim(title)}</Text>{" "}
                  with
                </Text>
              </View>
              <View className="flex">
                <ScrollView className="max-h-72 ">
                  {ingredentFetching === "done" &&
                    generatedIngredient &&
                    generatedIngredient.length > 0 &&
                    generatedIngredient.map((ingredient) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            addSelectedIngredient(ingredient, title, index);
                            onClose();
                          }}
                          key={ingredient}
                        >
                          <View className=" w-full bg-[#6E3AFF40] border border-1 border-[#6D55D1] rounded-lg p-4 mb-4">
                            <Text className="text-white text-base font-semibold font-['Nunito'] leading-normal tracking-wide text-center">
                              {ingredient}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  {(ingredentFetching === "error" ||
                    (ingredentFetching === "done" &&
                      (!generatedIngredient ||
                        generatedIngredient.length == 0))) && (
                    <TouchableOpacity>
                      <View className=" w-full bg-[#6E3AFF40] border border-1 border-[#6D55D1] rounded-lg p-4 mb-4">
                        <Text className="text-white text-base font-semibold font-['Nunito'] leading-normal tracking-wide text-center">
                          No Available Ingredient
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}

                  {ingredentFetching === "fetching" && (
                    <View>
                      <LoadingSpinner title="Fetching..." />
                    </View>
                  )}
                </ScrollView>
              </View>
            </View>
          </View>
          <View className="mb-5">
            <Text className="text-white text-base font-semibold font-['Nunito'] leading-normal tracking-wide text-center">
              Or
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              onToggleIngredient(title, index);
              onClose();
            }}
          >
            <View className="w-full bg-[#FF5970] rounded-lg p-4">
              <Text className=" text-white text-base font-semibold font-['Nunito'] leading-normal tracking-wide text-center">
                Just Remove {trim(title)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </UseModal>
  );
};

export default IngredientScreenModal;
