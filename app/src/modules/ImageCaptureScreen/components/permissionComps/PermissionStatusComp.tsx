import { View, Text } from "react-native";
import { useCameraPermissionV3 } from "@hooks/permissions/useCameraPermissionsV3";
import ImageWithURL from "@components/ImageWithURL";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddButton from "@modules/AddNewItem/components/searchScreen/AddButton";
interface Props {
  title: string;
  cta: string;
  subTitle?: string;
  disable?: boolean;
}
const PermissionStatusComp: React.FC<Props> = ({
  title,
  cta,
  subTitle,
  disable = false,
}) => {
  const { requestPermission } = useCameraPermissionV3();
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      className="w-full flex-1 bg-[#232136] "
      style={{ paddingBottom: bottom }}
    >
      <View className="w-full z-10">
        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio/Frame%201000001355%20(2)_RmKPlee9V.png?updatedAt=1700221043664",
          }}
          resizeMode={"contain"}
          className="aspect-[375/533]"
        />
      </View>
      <View className="flex-1 pt-8 ">
        <View className="px-10 pb-3.5">
          <Text
            className="text-white/90 text-2xl leading-relaxed tracking-tight"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            {title}
          </Text>
        </View>
        <View className="px-10">
          <Text
            className="text-white/70 text-xs leading-[1rem]"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            {subTitle
              ? subTitle
              : "In order to track via your camera you need to allow permissions in the settings"}
          </Text>
        </View>
      </View>
      {disable ? (
        <></>
      ) : (
        <>
          <AddButton onPress={requestPermission} cta={cta} showIcon={false} />
        </>
      )}
    </View>
  );
};

export default PermissionStatusComp;
