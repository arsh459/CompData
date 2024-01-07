import { addPhotoLogo } from "@constants/imageKitURL";
import { Journey } from "@models/Jounrney/Jourrney";
import { View, FlatList } from "react-native";
import { JourneyDate, JourneyMedia } from "./HelperComponents";

interface Props {
  journey: Journey[];
}

const Timeline: React.FC<Props> = ({ journey }) => {
  const renderItem = ({ item }: { item: Journey }) => {
    return (
      <View className="flex justify-center items-center">
        {item.id === "new" ? (
          <JourneyMedia
            journey={item}
            width="w-20 iphoneX:w-24"
            imgUrl={addPhotoLogo}
            create={true}
          />
        ) : (
          <JourneyMedia
            journey={item}
            width="w-20 iphoneX:w-24"
            weight={true}
          />
        )}
        <View className="w-4 aspect-square border-2 border-white p-0.5 m-2 rounded-full relative">
          <View className="w-full bg-white aspect-square rounded-full" />
        </View>
        <JourneyDate
          timestamp={item.displayOn}
          style={{
            fontFamily: "BaiJamjuree-Bold",
            opacity: item.id === "new" ? 0 : 1,
          }}
        />
      </View>
    );
  };

  const keyExtractor = (item: Journey) => item.id;

  const ItemSeparatorComponent = () => {
    return (
      <View className="self-end my-3.5 relative -z-10 flex justify-center items-center">
        <View className="w-36 iphoneX:w-40 -mx-10 iphoneX:-mx-12 h-0.5 bg-white" />
        <JourneyDate
          timestamp={Date.now()}
          style={{ fontFamily: "BaiJamjuree-Bold", opacity: 0 }}
        />
      </View>
    );
  };

  return (
    <View className="flex-1 py-8">
      <FlatList
        data={[
          { id: "new", createdOn: 0, updatedOn: 0, displayOn: 0 },
          ...journey,
        ]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListHeaderComponent={<View className="w-8" />}
        ListFooterComponent={<View className="w-8" />}
        initialScrollIndex={0}
      />
    </View>
  );
};

export default Timeline;
