import { weEventTrack } from "@analytics/webengage/user/userLog";
import Loading from "@components/loading/Loading";
import { socialboat } from "@constants/socialboatOrg";
import { useLocalUserV2 } from "@hooks/joinBoat/useLocalUserV2";
import { useGiftSection } from "@hooks/joinBoat/V5/useGiftSection";
import { AppSubscription } from "@models/AppSubscription/AppSubscription";
import { addPlanToGift, saveGift } from "@models/Gift/createUtils";
import { addGiftFlag } from "@models/User/createUtils";
import { UserInterface } from "@models/User/User";
import { deviceTypes } from "@templates/PaymentTemplate/SelectDevice";
import SelectPlan from "@templates/PaymentTemplate/SelectPlan";
import { useRouter } from "next/router";
import Script from "next/script";
import GiftExplainer from "./GiftExplainer/GiftExplainer";
import EnterName from "./V5/Components/EnterName";
import EnterPhone from "./V5/Components/EnterPhone";
import GiftDetails from "./V5/Components/GiftingFlow/GiftDetails";
import GiftMessage from "./V5/Components/GiftingFlow/GiftMessage";

interface Props {
  user: UserInterface;
  deviceType: deviceTypes;
}

const GiftTemplate: React.FC<Props> = ({ user, deviceType }) => {
  const { localUser, onNameUpdate, onPhoneUpdate, onEmailUpdate } =
    useLocalUserV2(user);

  const {
    section,
    gotoSection,
    onUserPhoneUpdate,
    onGiftCreate,
    onNameSave,
    localGift,
    onGiftUpdate,
  } = useGiftSection(user);

  const router = useRouter();

  const onSuccess = async (plan: AppSubscription) => {
    if (localGift) {
      await addPlanToGift(localGift.id, plan);
      await addGiftFlag(localGift.fromUID);

      weEventTrack("giftSuccessBuy_noClick", {});

      gotoSection("loading");
      router.push(`gift/${localGift.id}`);
    }
  };

  const onStartGifting = () => {
    gotoSection("name");
  };

  const onGiftMessageUpdate = async () => {
    localGift && (await saveGift(localGift));
    gotoSection("plans");
  };

  switch (section) {
    case "explainer":
      return (
        <div className="w-full h-full bg-[#100F1A] flex flex-col justify-center items-center">
          <GiftExplainer onNext={onStartGifting} />
        </div>
      );

    case "loading":
      return (
        <div className="w-full h-full bg-[#100F1A] flex flex-col justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      );

    case "name":
      return (
        <EnterName
          localUser={localUser}
          onNameUpdate={onNameUpdate}
          onNameSave={onNameSave}
        />
      );

    case "phone":
      return (
        <EnterPhone
          localUser={localUser}
          onPhoneUpdate={onPhoneUpdate}
          onUserPhoneUpdate={onUserPhoneUpdate}
        />
      );

    case "details":
      return (
        <GiftDetails
          localUser={localUser}
          onEmailUpdate={onEmailUpdate}
          onGiftCreate={onGiftCreate}
        />
      );

    case "message":
      return (
        <GiftMessage
          localUser={localUser}
          onGiftUpdate={onGiftUpdate}
          onGiftSave={onGiftMessageUpdate}
          // onEmailUpdate={onEmailUpdate}
          // onGiftCreate={onGiftCreate}
        />
      );

    case "plans":
      return (
        <div className="w-full h-full">
          <SelectPlan
            planData={socialboat}
            user={user}
            deviceType={deviceType}
            onSuccess={onSuccess}
            heading="Chose the Plan to Gift"
          />
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            type="text/javascript"
            strategy="afterInteractive"
          />
        </div>
      );

    default:
      return null;
  }
};

export default GiftTemplate;
