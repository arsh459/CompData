import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Room } from "@models/ChatBot/interface";
import clsx from "clsx";
import SakhiGreet from "./SakhiGreet";
import RoomCard, { hiddenCtaRightMargin } from "./RoomCard";
interface Props {
  rooms: Room[];
  onNext: () => void;
  onDelete: (roomsId: string) => void;
}

const RoomsList: React.FC<Props> = ({ rooms, onNext, onDelete }) => {
  const renderItem = ({ item }: { item: Room }) => {
    return <RoomCard item={item} onDelete={onDelete} />;
  };

  const keyExtractor = (item: Room) => item.id;

  return (
    <FlashList
      data={rooms}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={
        <View
          className={clsx(
            rooms.length === 0 && "flex-1",
            "flex justify-center items-center py-8"
          )}
        >
          <SakhiGreet horizontal={rooms.length !== 0} />
        </View>
      }
      estimatedItemSize={104}
      onEndReached={onNext}
      onEndReachedThreshold={0.3}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="w-4 aspect-square" />}
      bounces={false}
      contentContainerStyle={{ paddingHorizontal: hiddenCtaRightMargin }}
    />
  );
};

export default RoomsList;
