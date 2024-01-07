// import Button from "@components/button";
// import { useChallengeSeriesOnly } from "@hooks/workouts/useChallengeSeriesOnly";
// import Premium from "./Premium";
// import Script from "next/script";
// import Loading from "@components/loading/Loading";
// import SubscribeButton from "./SubscribeButton";
// import {
// internalPayRequest,
// internalSignatureVerify,
// RazorpayAuthorization,
// } from "@utils/payments/payRequest";
// import { useState } from "react";
// import { razorpay_key_id_front } from "@templates/checkout/CheckoutSeries";
// import { useChallengeSeriesList } from "@hooks/workouts/useChallengeSeriesList";
// import InviteCodeModal from "./InviteCodeModal";
// import { RazorpayOrder } from "@utils/payments/interface";

interface Props {
  name: string;
  eventId: string;
  onSignFree: () => Promise<void>;
  onPaidSeries: (seriesId: string) => Promise<void>;
  userEmail?: string;
  userPhone?: string;
  ownerUID: string;
  uid: string;
  freeOptionHidden?: boolean;
}

const Subscription: React.FC<Props> = ({
  name,
  eventId,
  onSignFree,
  onPaidSeries,
  userEmail,
  userPhone,
  ownerUID,
  uid,
  freeOptionHidden,
}) => {
  // const { eventSeries, loading, dayActs, dayLives, dayNutrition } =
  //   useChallengeSeriesList(eventId);

  // const { eventSeries, loading } = useChallengeSeriesOnly(eventId);
  // const [modal, setModal] = useState<boolean>(false);
  // const [payModal, togglePayModal] = useState<boolean>(false);

  // const onCloseModal = () => togglePayModal(false);
  // const onOpenPayModal = async () => {
  //   // console.log("here", eventSeries);
  //   if (eventSeries.length === 0) {
  //     onSignFree();
  //   } else if (!eventSeries[0].cost) {
  //     setModal(true);
  //     await onPaidSeries(eventSeries[0].id);
  //     setModal(false);
  //   } else {
  //     togglePayModal(true);
  //   }
  // };

  return <></>;
};

export default Subscription;

// paid plan
