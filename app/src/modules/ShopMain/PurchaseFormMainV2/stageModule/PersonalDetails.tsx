import PurchaseFormWrapper from "../wrapper/PurchaseFormWrapper";
import { useNavigation } from "@react-navigation/native";
import { usePurchaseFormStore } from "../store/usePurchaseFormStore";
import FormInput from "../components/FormInput";
import { shallow } from "zustand/shallow";
import React from "react";
import { View } from "react-native";
// import { useUserStore } from "@providers/user/store/useUserStore";

const emailReg = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

const PersonalDetails = React.memo(() => {
  const navigation = useNavigation();
  // const { user } = useUserStore((state) => ({
  //   user: state.user
  // }))
  const {
    setFormStage,
    currentFormStage,
    userName,
    userEmail,
    userPhone,
    setDetails,
    onNextDisabled,
  } = usePurchaseFormStore(
    (state) => ({
      setFormStage: state.setFormStage,
      currentFormStage: state.formStage,
      userName: state.name,
      userPhone: state.phoneNumber,
      userEmail: state.email,
      setDetails: state.detailSetter,
      onNextDisabled: !(
        state.name.length !== 0 &&
        state.email.length !== 0 &&
        state.phoneNumber.length >= 10 &&
        emailReg.test(state.email)
      ),
    }),
    shallow
  );
  // const { onInitFunc } = usePurchaseFormStore((state) => ({
  //   onInitFunc: state.onInitFunc
  // }))
  // if(user && user.name) {
  //   const data:PurchaseDetails = {name: user.name, }
  //   // onInitFunc({user.name , user.email , phoneNumber:user.phone})
  // }
  const onNext = () => {
    setFormStage(currentFormStage + 1);
    navigation.navigate("PurchaseFormAddress");
  };

  return (
    <PurchaseFormWrapper
      disabled={onNextDisabled}
      onNext={onNext}
      formTitle="Personal Details"
    >
      <View className="pt-2">
        <FormInput
          formLabel="Name"
          value={userName}
          onChange={(text) => setDetails("name", text)}
        />
        <FormInput
          formLabel="Phone"
          value={userPhone}
          onChange={(text) =>
            text === ""
              ? setDetails("phoneNumber", text)
              : !isNaN(parseInt(text))
              ? setDetails("phoneNumber", `${parseInt(text)}`)
              : null
          }
        />
        <FormInput
          formLabel="Email"
          value={userEmail}
          onChange={(text) => setDetails("email", text)}
        />
      </View>
    </PurchaseFormWrapper>
  );
});

export default PersonalDetails;
