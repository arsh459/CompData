import { View, Text, Image, ScrollView } from "react-native";

import FeatureAI from "./FeatureAI";
import { CameraPermissionData } from "./utils";
interface Props {
  contentData: CameraPermissionData;
  children: React.ReactNode;
}

const CameraAIScan: React.FC<Props> = ({ contentData, children }) => {
  return (
    <View className="flex-1  ">
      <ScrollView
        className="flex-1  flex "
        contentContainerStyle={{ justifyContent: "space-between" }}
      >
        <View className="">
          <View className="pt-0">
            <Image
              className="w-[71%] mx-auto  aspect-[266/210]"
              source={{ uri: contentData.mainBgImg }}
            />
            <Text
              className="text-base iphoneX:text-lg pt-12 px-4 text-white text-center"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              {contentData.text}
            </Text>
          </View>
          <View className="flex flex-row justify-around pt-6 px-4">
            {contentData.featureArr.map((item, index) => (
              <FeatureAI
                imgUrl={item.imgUrl}
                text={item.text}
                arrSize={contentData.featureArr.length}
                key={`${item.text}_${index}`}
                dataFor={contentData.dataFor}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      {children}
    </View>
  );
};

export default CameraAIScan;
