import { View, Text, Image, SafeAreaView, Linking } from "react-native";
import { baseImageKit, springIconWhite } from "@constants/imageKitURL";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import BlurBG from "@components/BlurBG";
import SvgIcons from "@components/SvgIcons";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "@providers/user/UserProvider";
import { isLocked } from "../utils";
import Loading from "@components/loading/Loading";
import { getUserTotalFP } from "@modules/HomeScreen/utills/getUserTotalFP";
import { Voucher } from "@models/Voucher/interface";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { usePurchaseFormStore } from "../PurchaseFormMainV2/store/usePurchaseFormStore";

interface Props {
  voucher: Voucher;
}

const FloatingDetail: React.FC<Props> = ({ voucher }) => {
  const { user } = useUserContext();
  const calculation = isLocked(
    getUserTotalFP(user?.fpCredit, user?.fpDebit),
    voucher.value
  );
  const { setProductVariants } = usePurchaseFormStore((state) => ({
    setProductVariants: state.setProductVariants,
  }));

  const navigation = useNavigation();
  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Loading width="w-12" height="h-12" />
      </View>
    );
  }
  return voucher.itemLeft > 0 ? (
    <SafeAreaView className={calculation.bool ? "" : "bg-[#B34154]"}>
      <BlurBG
        blurAmount={35}
        blurType="dark"
        fallbackColor="#00000080"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
      {calculation.bool ? (
        <View className="flex flex-row items-center p-4">
          <View className="flex flex-row items-center flex-1">
            <Image
              className="w-[14px] h-[16px] mr-2"
              resizeMode="contain"
              source={{
                uri: `${baseImageKit}/tr:w-40,c-maintain_ratio,fo-auto/${springIconWhite}`,
              }}
            />
            <Text
              className="text-[#F1F1F1] text-xl iphoneX:text-[22px] "
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {`${voucher.value} FP`}
            </Text>
          </View>
          <StartButton
            title="Proceed to Pay"
            bgColor="bg-[#31FFB5] flex-1"
            textColor="text-[#100F1A]"
            roundedStr="rounded-md"
            textStyle="py-2.5 px-8 text-center text-xs iphoneX:text-sm font-bold rounded-md"
            onPress={() => {
              voucher.productVariants?.length ?
                setProductVariants(voucher.productVariants) : setProductVariants([]);
              navigation.navigate("PurchaseForm", {
                voucherId: voucher.id,
              });
            }}
          />
        </View>
      ) : (
        <>
          <View className="flex flex-row items-center flex-1 py-2 pl-7">
            <View className="w-[14px] aspect-square  mr-2">
              <SvgIcons iconType="iCircle" />
            </View>
            <Text
              className="text-[#F1F1F1] text-sm   iphoneX:text-base "
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Insufficient Fitpoints
            </Text>
          </View>
          <View className="h-px bg-white " />
          <Text
            className="text-[#F1F1F1]  text-xs iphoneX:text-sm py-3.5 pl-7"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Earn {calculation.remaing} Fitpoints more to unlock this reward!
          </Text>
        </>
      )}
    </SafeAreaView>
  ) : (
    <SafeAreaView className="bg-[#416FB3]">
      <View className="flex flex-row items-center justify-between p-4">
        <View className="flex-1">
          <Text
            className="text-sm pl-2 text-[#FFFFFF]"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            Currently Sold out. Please reach out for questions
          </Text>
        </View>
        <StartButton
          title="Contact Us"
          bgColor="border border-white flex-1 "
          textColor="text-white "
          roundedStr="rounded-[5px]"
          textStyle="py-2.5 px-8 text-center text-sm font-bold rounded-md"
          onPress={() => {
            weEventTrack("VoucherPurchaseScreen_clickContatUs", {});
            Linking.openURL(
              `${waBaseLink}${encodeURI(
                "Hi!\nI want to know when will this be in stock"
              )}`
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FloatingDetail;
