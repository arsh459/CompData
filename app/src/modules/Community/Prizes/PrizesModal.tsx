import CloseBtn from "@components/Buttons/CloseBtn";
import MediaTile from "@components/MediaCard/MediaTile";
import UseModal from "@components/UseModal";
import { SBPrize } from "@models/Prizes/Prizes";
import { FlatList, Text, View } from "react-native";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  prizes: SBPrize[];
}

const PrizesModal: React.FC<Props> = ({ isOpen, setIsOpen, prizes }) => {
  return (
    <UseModal
      visible={isOpen}
      onClose={() => setIsOpen(false)}
      width="w-full"
      height="h-full"
      bgColor="bg-black"
      tone="dark"
    >
      <FlatList
        data={prizes}
        renderItem={({ item }) => (
          <View className="flex flex-row items-center p-4 border-t border-[#6B6B6B]">
            <MediaTile media={item.media} mediaWidth={100} />
            <View className="flex-1 text-sm iphoneX:text-base pl-4">
              <Text className="font-medium text-white">{item.name}</Text>
              <Text className="text-white">{item.description}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.brand}
        ListHeaderComponent={
          <View className="flex flex-row justify-between items-center bg-black p-4">
            <Text className="text-white text-xl iphoneX:text-3xl font-extrabold">
              Rewards
            </Text>
            <CloseBtn onClose={() => setIsOpen(false)} />
          </View>
        }
        stickyHeaderIndices={[0]}
        bounces={false}
      />
    </UseModal>
  );
};

export default PrizesModal;
