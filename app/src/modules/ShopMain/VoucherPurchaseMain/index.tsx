import { View, Text, ScrollView, Dimensions } from "react-native";
// import { Voucher } from "@models/Voucher/interface";
import { useNavigation } from "@react-navigation/native";
import Header from "@modules/Header";
import MediaTile from "@components/MediaCard/MediaTile";
import VoucherDetailCard from "./VoucherDetailCard";
import RecentBuyers from "./RecentBuyers";
import { useVoucherUsers } from "@hooks/sbrewards/useVoucherUsers";
import FloatingDetail from "./FloatingDetail";
import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";
import { useVoucher } from "@hooks/sbrewards/useVoucher";
import Swiper from "@components/Swiper";
import { usePurchaseFormStore } from "../PurchaseFormMainV2/store/usePurchaseFormStore";
import { useEffect } from "react";

interface Props {
  voucherId: string;
  length?: number;
}

const { width: WIDTH } = Dimensions.get("window");

const VoucherPurchaseMain: React.FC<Props> = ({ voucherId, length }) => {
  const { voucher } = useVoucher(voucherId);

  const { users } = useVoucherUsers(voucherId);
  const { setVoucher } = usePurchaseFormStore((state) => ({
    setVoucher: state.setVoucher,
  }));
  const navigation = useNavigation();

  const { interactionStatus } = useInteractionContext();
  useEffect(() => {
    voucher && setVoucher(voucher);
  }, [voucher]);

  return (
    <>
      <Header back={true} tone="dark" headerColor="#100F1A" />
      <View className="relative flex-1 bg-[#100F1A]">
        <ScrollView className="flex-1">
          {voucher ? (
            <>
              {voucher.carouselMedia && voucher.carouselMedia.length ? (
                <Swiper
                  slideWidth={WIDTH}
                  pagination={true}
                  dynamicPagination={true}
                  dotColor="#FFFFFF"
                >
                  {voucher.carouselMedia.map((item) => (
                    <View key={item.id} className="w-full aspect-[375/225]">
                      <MediaTile
                        media={item}
                        fluid={true}
                        fluidResizeMode="cover"
                      />
                    </View>
                  ))}
                </Swiper>
              ) : (
                <View className="w-full aspect-[375/225]">
                  <MediaTile
                    media={
                      voucher.rectMedia ? voucher.rectMedia : voucher.media
                    }
                    fluid={true}
                    fluidResizeMode="cover"
                  />
                </View>
              )}
            </>
          ) : null}
          <View className=" px-4 flex-1">
            {voucher ? <VoucherDetailCard voucher={voucher} /> : null}
            {users?.length ? (
              <>
                <View className="flex flex-row justify-between pb-4 pt-4">
                  <Text
                    className="text-[#FFFFFF] text-lg iphoneX:text-xl"
                    style={{ fontFamily: "BaiJamjuree-SemiBold" }}
                  >
                    Recent Purchasers
                  </Text>
                  {users.length > 6 ? (
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
                <RecentBuyers
                  users={users.slice(0, users.length > 6 ? 6 : users.length)}
                />
              </>
            ) : null}
          </View>
        </ScrollView>
        {voucher && interactionStatus ? (
          <FloatingDetail voucher={voucher} />
        ) : null}
      </View>
    </>
  );
};

export default VoucherPurchaseMain;
