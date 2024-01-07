import { View, Text, ScrollView, SafeAreaView, Linking } from "react-native";
import Header from "@modules/Header";
import MediaTile from "@components/MediaCard/MediaTile";
import { useUserContext } from "@providers/user/UserProvider";
import VoucherDetailCard from "./VoucherPurchaseMain/VoucherDetailCard";
import RecentBuyers from "./VoucherPurchaseMain/RecentBuyers";
import { useVoucher } from "@hooks/sbrewards/useVoucher";
import { useVoucherUsers } from "@hooks/sbrewards/useVoucherUsers";
import BlurBG from "@components/BlurBG";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useNavigation } from "@react-navigation/native";
import { useMyPurchases } from "@hooks/sbrewards/useMyPurchase";
import { waBaseLink } from "@constants/links";
import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  voucherId: string;
}

const PurchasedVoucherMain: React.FC<Props> = ({ voucherId }) => {
  const { user } = useUserContext();
  const { users } = useVoucherUsers(voucherId);
  const navigation = useNavigation();
  const { voucher } = useVoucher(voucherId);
  const { myPurchases } = useMyPurchases(user?.uid, voucherId);

  const { interactionStatus } = useInteractionContext();

  return (
    <>
      <Header
        back={true}
        tone="dark"
        headerColor="#100F1A"
        // onBack={() => navigation.navigate("Home")}
      />

      {voucher ? (
        <View className="flex-1 bg-[#100F1A]">
          <ScrollView className="flex-1">
            <View className="aspect-[375/223]">
              <MediaTile
                media={voucher.rectMedia ? voucher.rectMedia : voucher?.media}
                fluid={true}
                fluidResizeMode="cover"
              />
            </View>
            {interactionStatus ? (
              <View className="flex-1 px-4">
                <VoucherDetailCard
                  voucher={voucher}
                  myPurchases={myPurchases}
                />
                <View className="flex flex-row justify-between pb-4">
                  <Text
                    className="text-[#FFFFFF] text-lg iphoneX:text-xl"
                    style={{ fontFamily: "BaiJamjuree-SemiBold" }}
                  >
                    Other Purchasers
                  </Text>
                  {users.length >= 6 ? (
                    <Text
                      className="text-[#FF5970] text-[11px] iphoneX:text-[13px]"
                      style={{ fontFamily: "BaiJamjuree-SemiBold" }}
                      onPress={() =>
                        voucher &&
                        navigation.navigate("PurchaserScreen", {
                          voucherId: voucher.id,
                        })
                      }
                    >
                      See all
                    </Text>
                  ) : null}
                </View>
                <RecentBuyers users={users} />
                <View className="my-5" />
              </View>
            ) : null}
          </ScrollView>

          {interactionStatus ? (
            <SafeAreaView className="bg-[#416FB3]">
              <BlurBG
                blurAmount={17}
                blurType="dark"
                fallbackColor="#416FB3"
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />
              <View className="flex flex-row items-center justify-between p-4">
                <View className="flex-1">
                  <Text
                    className="text-sm pl-2 text-[#FFFFFF]"
                    style={{ fontFamily: "BaiJamjuree-Medium" }}
                  >
                    Need any help with this?
                  </Text>
                </View>
                <StartButton
                  title="Contact Us"
                  bgColor="border border-white flex-1 "
                  textColor="text-white "
                  roundedStr="rounded-[5px]"
                  textStyle="py-2.5 px-8 text-center text-sm font-bold rounded-md"
                  onPress={() => {
                    weEventTrack("shop_clickContatUs", {});
                    Linking.openURL(
                      `${waBaseLink}${encodeURI(
                        "Hi!\nI want help with my purchase"
                      )}`
                    );
                  }}
                />
              </View>
            </SafeAreaView>
          ) : null}
        </View>
      ) : null}
    </>
  );
};

export default PurchasedVoucherMain;
