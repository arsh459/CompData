import AddButton from "@modules/AddNewItem/components/searchScreen/AddButton";
import Header from "@modules/Header";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { useNavigation } from "@react-navigation/native";
import { AiScanItemSelectionScreenParams } from "@screens/AiScanItemsSelectionScreen";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import ItemList from "./components/items/ItemList";

const AiScanItemsSelectionModule: React.FC<AiScanItemSelectionScreenParams> = ({
  toBeSwaped,
}) => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { selectedItems, analyzeImage, setStage } = useCameraImage(
    (state) => ({
      selectedItems: state.selectedItems,
      analyzeImage: state.analyzeImage,
      setStage: state.setStage,
    }),
    shallow
  );

  // console.log("selectedItem", selectedItems);
  // console.log("");
  const disable =
    Object.keys(selectedItems).filter((item) => selectedItems[item] === true)
      .length === 0;

  useEffect(() => {
    setStage("itemSelection");
  }, [selectedItems]);

  const { config } = useConfigContext();
  const onTrack = () => {
    if (config?.apiKey && !disable) {
      analyzeImage(config.apiKey);
      navigation.navigate("AiScanLoadingScreen", { toBeSwaped: toBeSwaped });
    }
  };

  return (
    <View className="flex-1 bg-[#232136]" style={{ paddingBottom: bottom }}>
      <Header
        centerTitle={true}
        back={true}
        headerColor="#232136"
        tone="dark"
        headerType="solid"
      />
      <ItemList />
      <AddButton
        cta="Track these Items"
        onPress={onTrack}
        showIcon={false}
        showUpperTitle={true}
        upperTitle={"Select items that you want to track"}
        paddingClassName={"pt-4"}
        disable={disable}
      />
    </View>
  );
};

export default AiScanItemsSelectionModule;
