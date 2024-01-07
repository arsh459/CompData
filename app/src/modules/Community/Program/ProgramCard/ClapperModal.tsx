import CloseBtn from "@components/Buttons/CloseBtn";
import SvgIcons from "@components/SvgIcons";
import UseModal from "@components/UseModal";
import { useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import CardClapper from "./CardClapper";
import { useClaps } from "@hooks/posts/useClaps";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  postRef: FirebaseFirestoreTypes.DocumentReference;
  postId: string;
}
const ClapperModal: React.FC<Props> = ({ postRef, postId }) => {
  const { clappers } = useClaps(true, postRef);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpenClapModal = () => {
    weEventTrack("community_clickSeeAllClaps", { postId });
    setIsOpen(true);
  };

  return (
    <>
      {clappers.length ? (
        <>
          <View className="h-px bg-[#100F1A]" />
          <Text
            className="flex-1 text-[#B7B6C5] text-sm px-4 py-2"
            onPress={onOpenClapModal}
          >
            {clappers[0].clapperName}
            {clappers.length > 1
              ? ` and ${clappers.length - 1} others`
              : ""}{" "}
            clapped on this post. Tap to see all.
          </Text>
        </>
      ) : null}
      <UseModal
        visible={isOpen}
        onClose={() => setIsOpen(false)}
        width="w-full"
        height="h-full"
        fallbackColor="#100F1A"
        blurAmount={35}
        tone="dark"
      >
        <SafeAreaView>
          <View className="flex flex-row justify-between items-center p-4">
            <View className="flex flex-row items-center">
              <View className="w-6 aspect-square">
                <SvgIcons iconType="clap" color="#FFFFFF" />
              </View>
              <Text className="text-white iphoneX:text-2xl pl-2.5">
                {clappers.length} People clapped
              </Text>
            </View>
            <CloseBtn onClose={() => setIsOpen(false)} color="#FFFFFF" />
          </View>
          <FlatList
            data={clappers}
            renderItem={({ item }) => (
              <CardClapper
                name={item.clapperName}
                img={item.clapperImage}
                numClaps={item.numClaps}
              />
            )}
            keyExtractor={(item) => item.id}
            bounces={false}
          />
        </SafeAreaView>
      </UseModal>
    </>
  );
};

export default ClapperModal;
