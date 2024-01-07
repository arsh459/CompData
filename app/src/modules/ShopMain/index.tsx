import { View } from "react-native";
import { useState } from "react";
import Header from "@modules/Header";
import ButtonWithIcon from "@modules/TeamInvite/ButtonWithIcon";
import { baseImageKit, springIconWhite } from "@constants/imageKitURL";
import ViewSelector from "@components/ViewSelector";
import BrowseShop from "./BrowseShop";
import { useNavigation } from "@react-navigation/native";
import MyPurchasesListings from "./MyPurchases";
import { getUserTotalFP } from "@modules/HomeScreen/utills/getUserTotalFP";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

export type shopViewTypes = "My purchases" | "Browse Shop";
interface Props {
  tabBarHeight: number;
}

const ShopMain: React.FC<Props> = ({ tabBarHeight }) => {
  const navigation = useNavigation();
  const [selectedView, setSelectedView] =
    useState<shopViewTypes>("Browse Shop");

  const { userId, fpCredit, fpDebit } = useUserStore(({ user }) => {
    return {
      userId: user?.uid,
      fpCredit: user?.fpCredit,
      fpDebit: user?.fpDebit,
    };
  }, shallow);

  const handlePressView1 = () => {
    setSelectedView("Browse Shop");
    weEventTrack("shop_clickBrowseShop", {});
  };

  const handlePressView2 = () => {
    setSelectedView("My purchases");
    weEventTrack("shop_clickMypurchases", {});
  };

  const onProfileClick = () => {
    if (userId) {
      navigation.navigate("User", { userId });
      weEventTrack("home_clickProfile", {});
    }
  };

  return (
    <>
      <Header
        titleNode={
          <ButtonWithIcon
            iconUrl={`${baseImageKit}/${springIconWhite}`}
            title={`${getUserTotalFP(fpCredit, fpDebit)} FP`}
            textColor="text-[#fff] "
            textStyle="pl-2 text-xs iphoneX:text-sm"
            roundedStr="rounded-full py-1  px-4"
            iconStyle="w-[12px] aspect-square "
            fontFamily="BaiJamjuree-Bold"
            layoutStyle={{ backgroundColor: "#FFFFFF4F", alignItems: "center" }}
            onPress={() => navigation.navigate("FitPointExpanderScreen")}
          />
        }
        back={tabBarHeight === 0}
        defaultOption={true}
        defaultOptionOnPress={onProfileClick}
        headerColor="#100F1A"
        tone="dark"
      />
      <View className="bg-[#100F1A] flex-1">
        <ViewSelector
          view1="Browse Shop"
          view2="My purchases"
          currView={selectedView}
          onView1={handlePressView1}
          onView2={handlePressView2}
          fontSize="text-sm iphoneX:text-lg"
        />
        {selectedView === "Browse Shop" ? (
          <BrowseShop tabBarHeight={tabBarHeight} />
        ) : selectedView === "My purchases" ? (
          <MyPurchasesListings
            tabBarHeight={tabBarHeight}
            startShop={handlePressView1}
          />
        ) : null}
      </View>
    </>
  );
};

export default ShopMain;
