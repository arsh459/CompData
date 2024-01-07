import ImageWithURL from "@components/ImageWithURL";
import useAddNewItem, {
  CookingType,
} from "@providers/AddNewItem/useAddNewItem";
import clsx from "clsx";
import { Text, View } from "react-native";

interface Props {
  text?: string;
  cookingType: CookingType;
}
const ListMealType: React.FC<Props> = ({ text, cookingType }) => {
  const { isSelected } = useAddNewItem((state) => ({
    isSelected: state.cookingType === cookingType,
  }));

  return (
    <>
      <View className={clsx("flex flex-row items-center p-5 justify-between")}>
        <View className="flex flex-row items-center justify-center  ">
          <Text
            className={clsx(
              "text-base pl-1 flex-1",
              isSelected ? "text-[#232136]" : "text-[#f1f1f1]"
            )}
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {text}
          </Text>
          <View
            className={clsx(
              "rounded-full",
              isSelected ? "" : "border border-white"
            )}
          >
            <ImageWithURL
              source={{
                uri: isSelected
                  ? "https://ik.imagekit.io/socialboat/Frame%201000001315%20(1)_skI1XF-pi.png?updatedAt=1697811548491"
                  : "",
              }}
              className={clsx(" aspect-square", isSelected ? "w-5" : "w-4")}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default ListMealType;
