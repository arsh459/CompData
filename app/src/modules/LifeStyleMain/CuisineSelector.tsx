import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  useWindowDimensions,
} from "react-native";
import {
  CuisineCardInterface,
  CuisinePrefrenceList,
  CuisinePrefrenceType,
  SelectedType,
} from "./utils";
import clsx from "clsx";

interface Props {
  selected?: SelectedType;
  setSelected: React.Dispatch<React.SetStateAction<SelectedType | undefined>>;
}

const CuisineSelector: React.FC<Props> = ({ selected, setSelected }) => {
  const cardAspectRatio = 1;

  const { width } = useWindowDimensions();
  const cardWidth = width / 2;
  const cardHeight = cardWidth * cardAspectRatio;
  const handleSelect = (type: CuisinePrefrenceType) => {
    setSelected((prevSelected) => {
      if (!prevSelected) {
        return { [type]: true };
      }

      return { ...prevSelected, [type]: !prevSelected[type] };
    });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: CuisineCardInterface;
    index: number;
  }) => {
    const type = item.type;
    const isSelected = selected?.[type] ? true : false;

    return (
      <TouchableOpacity
        className={clsx(
          isSelected ? "bg-[#fff]" : "bg-[#343150]",
          "rounded-2xl flex items-center justify-center"
        )}
        onPress={() => handleSelect(item.type)}
        style={{
          width: cardWidth - 32,
          height: cardHeight - 32,

          marginHorizontal: 10,
        }}
      >
        <Image
          source={{ uri: item.icon }}
          className="w-3/4 aspect-[100/100]"
          resizeMode="contain"
        />
        <Text className={clsx(isSelected ? "text-black" : "text-white")}>
          {item.text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-[#232136] p-4">
      <FlatList
        data={CuisinePrefrenceList}
        renderItem={renderItem}
        keyExtractor={({ type }) => type}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-4 aspect-square" />}
        numColumns={2}
      />
    </View>
  );
};

export default CuisineSelector;
