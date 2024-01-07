import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import Header from "@modules/Header";
import SearchMain from "@modules/SearchMain";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";
import { View } from "react-native";

const SearchScreen = () => {
  useScreenTrack();

  return (
    <View className="flex-1 bg-[#232136]">
      <Header headerColor="#232136" tone="dark" />
      <InteractionProvider>
        <SearchMain />
      </InteractionProvider>
    </View>
  );
};

export default SearchScreen;
