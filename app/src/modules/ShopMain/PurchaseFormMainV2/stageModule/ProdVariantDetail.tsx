import PurchaseFormWrapper from "../wrapper/PurchaseFormWrapper";
import { usePurchaseFormStore } from "../store/usePurchaseFormStore";
import { shallow } from "zustand/shallow";
import { useNavigation } from "@react-navigation/native";
import FormInput from "../components/FormInput";
import { useUserStore } from "@providers/user/store/useUserStore";
import { onPurchaseNowV2 } from "@modules/ShopMain/utils";
import AffirmationModal from "@modules/ShopMain/AffirmationModal";
import { useState } from "react";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const ProdVariantDetail = () => {
  const [showAffirmation, setShowAffirmation] = useState(false);
  const {
    setFormStage,
    currentFormStage,
    prodVariant,
    setProd,
    products,
    purchaseVoucher,
    getPurchaseDetails,
  } = usePurchaseFormStore(
    (state) => ({
      setFormStage: state.setFormStage,
      currentFormStage: state.formStage,
      prodVariant: state.selectedProductVariant,
      setProd: state.selectProdVariant,
      products: state.productVariants,
      purchaseVoucher: state.voucher,
      getPurchaseDetails: state.getPurchaseDetails,
    }),
    shallow
  );
  const {
    name,
    phoneNumber,
    email,
    state,
    city,
    pincode,
    fullAddress,
    selectedProductVariant,
  } = getPurchaseDetails();
  const { uid, profileImage } = useUserStore(
    (state) => ({
      uid: state.user?.uid,
      profileImage: state.user?.profileImage,
    }),
    shallow
  );
  const navigation = useNavigation();

  const onBack = () => {
    setFormStage(currentFormStage - 1);
    navigation.navigate("PurchaseFormAddress");
  };

  const onNext = async () => {
    if (uid && purchaseVoucher) {
      setShowAffirmation(true);

      navigation.navigate("PurchasedVoucherScreen", {
        voucherId: purchaseVoucher.id,
      });
    }
  };

  const onPurchase = async () => {
    weEventTrack("PurchaseForm_clickProceed", {});
    if (uid && name && purchaseVoucher) {
      try {
        await onPurchaseNowV2(
          uid,
          name,
          email,
          phoneNumber,
          state,
          city,
          pincode,
          fullAddress,
          purchaseVoucher,
          profileImage,
          selectedProductVariant
        );
        navigation.navigate("PurchasedVoucherScreen", {
          voucherId: purchaseVoucher.id,
        });
      } catch (error: any) {
        setShowAffirmation(false);
        console.log("error in purchases", error);
        navigation.goBack();
      }
    }
  };

  const onCancel = () => {
    setShowAffirmation(false);
    weEventTrack("PurchaseForm_clickCancel", {});
  };

  const onDone = () => {
    if (purchaseVoucher) {
      setShowAffirmation(false);
      setTimeout(
        () =>
          navigation.navigate("PurchasedVoucherScreen", {
            voucherId: purchaseVoucher.id,
          }),
        0
      );
    }
  };

  return (
    <PurchaseFormWrapper
      onBack={onBack}
      onNext={onNext}
      formTitle="Product Details"
    >
      <AffirmationModal
        visible={showAffirmation}
        onClose={onCancel}
        onProceed={onPurchase}
        onDone={onDone}
      />
      <FormInput
        formLabel="Size of Product"
        value={prodVariant.name}
        isOptions={true}
        optionValues={products}
        onOptionChange={(item) => setProd(item)}
      />
    </PurchaseFormWrapper>
  );
};

export default ProdVariantDetail;
