import { FlatList } from "react-native";

interface Props {
  children: React.ReactNode;
  horizontal: boolean;
  width: number;
}

const NestedScrollFlatList: React.FC<Props> = ({
  children,
  horizontal,
  width,
}) => {
  return (
    <FlatList
      data={["childe"]}
      renderItem={({ item }) => <>{children}</>}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={horizontal}
      scrollEnabled={false}
      style={{ width }}
      bounces={false}
    />
  );
};

export default NestedScrollFlatList;
