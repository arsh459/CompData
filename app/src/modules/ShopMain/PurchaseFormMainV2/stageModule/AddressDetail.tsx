import PurchaseFormWrapper from "../wrapper/PurchaseFormWrapper";
import { usePurchaseFormStore } from "../store/usePurchaseFormStore";
import { shallow } from "zustand/shallow";
import { useNavigation } from "@react-navigation/native";
import FormInput from "../components/FormInput";
import { statesName } from "../utils/statesNames";
import { onPurchaseNowV2 } from "@modules/ShopMain/utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import AffirmationModal from "@modules/ShopMain/AffirmationModal";
import { useState } from "react";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const AddressDetails = () => {
  const [showAffirmation, setShowAffirmation] = useState(false);
  const {
    setFormStage,
    currentFormStage,
    setDetails,
    userState,
    userCity,
    userPinCode,
    userFullAddress,
    onNextDisabled,
    productVariants,
    getPurchaseDetails,
    purchaseVoucher,
  } = usePurchaseFormStore(
    (state) => ({
      setFormStage: state.setFormStage,
      currentFormStage: state.formStage,
      setDetails: state.detailSetter,
      userState: state.state,
      userCity: state.city,
      userPinCode: state.pincode,
      userFullAddress: state.fullAddress,
      onNextDisabled: !(
        state.fullAddress.length !== 0 &&
        state.city.length !== 0 &&
        state.pincode.length !== 0 &&
        state.state.length !== 0
      ),
      productVariants: state.productVariants,
      getPurchaseDetails: state.getPurchaseDetails,
      purchaseVoucher: state.voucher,
    }),
    shallow
  );

  const { uid, profileImage } = useUserStore(
    (state) => ({
      uid: state.user?.uid,
      profileImage: state.user?.profileImage,
    }),
    shallow
  );
  const navigation = useNavigation();
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

  const onBack = () => {
    setFormStage(currentFormStage - 1);
    navigation.navigate("PurchaseForm");
  };

  const onNext = async () => {
    if (productVariants.length) {
      setFormStage(currentFormStage + 1);

      navigation.navigate("PurchaseProdVariant");
    } else if (uid && purchaseVoucher) {
      setShowAffirmation(true);
    }

    // Complete function @KRISHANU
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
      onNext={onNext}
      onBack={onBack}
      formTitle="Location Details"
      disabled={onNextDisabled}
    >
      <AffirmationModal
        visible={showAffirmation}
        onClose={onCancel}
        onProceed={onPurchase}
        onDone={onDone}
      />
      <FormInput
        formLabel="State"
        value={userState}
        isOptions={true}
        optionValues={statesName}
        onOptionChange={(text) => setDetails("state", text.name)}
      />
      <FormInput
        formLabel="City"
        value={userCity}
        onChange={(text) => setDetails("city", text)}
      />
      <FormInput
        formLabel="Pincode"
        value={userPinCode}
        onChange={(text) =>
          text === ""
            ? setDetails("pincode", text)
            : !isNaN(parseInt(text)) && text.length <= 6
            ? setDetails("pincode", `${parseInt(text)}`)
            : null
        }
      />
      <FormInput
        formLabel="Address"
        value={userFullAddress}
        onChange={(text) => setDetails("fullAddress", text)}
      />
    </PurchaseFormWrapper>
  );
};

export default AddressDetails;
