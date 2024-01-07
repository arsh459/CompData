import BlurBG from "@components/BlurBG";
import TextField from "@components/TextField";
import { useVoucher } from "@hooks/sbrewards/useVoucher";
import Header from "@modules/Header";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import AffirmationModal from "../AffirmationModal";
import { onPurchaseNow } from "../utils";
import crashlytics from "@react-native-firebase/crashlytics";

interface Props {
  voucherId: string;
}

const PurchaseFormMain: React.FC<Props> = ({ voucherId }) => {
  const { user } = useUserContext();
  const { voucher } = useVoucher(voucherId);
  const [name, setName] = useState(user?.name ? user.name : "");
  const [phone, setPhone] = useState(user?.phone ? user.phone : "");
  const [email, setEmail] = useState(user?.email ? user.email : "");
  const [showAffirmation, setShowAffirmation] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setName(user?.name ? user.name : "");
    setEmail(user?.email ? user.email : "");
    setPhone(user?.phone ? user.phone : "");
  }, [user?.name, user?.email, user?.phone]);

  const handlePurchaseNow = () => {
    setShowAffirmation(true);
    weEventTrack("PurchaseForm_clickPurchaseNow", { voucherId });
  };

  const onCancel = () => {
    setShowAffirmation(false);
    weEventTrack("PurchaseForm_clickCancel", { voucherId });
  };

  const onPurchase = async () => {
    weEventTrack("PurchaseForm_clickProceed", {
      voucherId,
      purchaseId: user ? user.uid : "no_purchaseId",
    });
    if (name && email && phone) {
      try {
        await onPurchaseNow(
          user?.uid,
          voucher,
          {
            name: name ? name : user?.name,
            phone: phone ? phone : user?.phone,
            email: email ? email : user?.email,
          },
          user?.profileImage
        );
      } catch (error: any) {
        setShowAffirmation(false);
        crashlytics().recordError(error);
        console.log("error in purchases", error);
        navigation.goBack();
      }
    }
  };

  const onDone = () => {
    if (voucher) {
      setShowAffirmation(false);
      setTimeout(
        () =>
          navigation.navigate("PurchasedVoucherScreen", {
            voucherId: voucher.id,
          }),
        0
      );
    }
  };

  const { interactionStatus } = useInteractionContext();

  if (!interactionStatus) {
    return <View className="flex-1 bg-[#100F1A]/80"></View>;
  }

  return (
    <View className="flex-1 bg-[#100F1A]/80">
      <BlurBG
        blurAmount={35}
        blurType="dark"
        fallbackColor="#100F1A99"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />

      <Header back={true} tone="dark" headerColor="transparent" />

      <ScrollView className="flex-1">
        
        <SafeAreaView className="flex-1">
          <Text
            className="text-[#FFFFFF] text-start px-5 text-lg iphoneX:text-xl py-2 iphoneX:py-[26px]"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Fill-Up the details
          </Text>

          <TextField
            text={name}
            onChange={(text) => setName(text)}
            outlined={true}
            placeHolder="Name"
            roundStr="mx-5 rounded-sm"
            outlinColor="border-transparent"
            translatePlaceHolderFull={true}
            bgColor="bg-[#FFFFFF2E]"
          />

          <TextField
            text={phone}
            onChange={(text) => setPhone(text)}
            outlined={true}
            placeHolder="Phone"
            roundStr="mx-5 rounded-sm"
            outlinColor="border-transparent"
            translatePlaceHolderFull={true}
            bgColor="bg-[#FFFFFF2E]"
          />

          <TextField
            text={email}
            onChange={(text) => setEmail(text)}
            outlined={true}
            placeHolder="Email"
            roundStr="mx-5 rounded-sm"
            outlinColor="border-transparent"
            translatePlaceHolderFull={true}
            bgColor="bg-[#FFFFFF2E]"
          />

          <Text className="text-[#C6C6C6] text-center text-[10px] iphoneX:text-xs">
            The above details are required to proceed further.
          </Text>

          <AffirmationModal
            visible={showAffirmation}
            onClose={onCancel}
            onProceed={onPurchase}
            onDone={onDone}
          />

          <View className="flex flex-row justify-end px-4 pt-8 iphoneX:pt-16">
            <StartButton
              title="Purchase Now"
              bgColor={clsx(
                "bg-[#31FFB5] flex-1 ",
                !name || !phone || !email ? "opacity-50" : ""
              )}
              textColor="text-[#100F1A] "
              roundedStr="rounded-md"
              textStyle="py-2.5 px-8 text-center text-xs iphoneX:text-sm font-bold rounded-md"
              onPress={handlePurchaseNow}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default PurchaseFormMain;
