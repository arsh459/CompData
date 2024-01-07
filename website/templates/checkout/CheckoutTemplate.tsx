import clsx from "clsx";
// import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { formLabelValues } from "@components/drawers/constants";
import {
  internalPayRequest,
  internalSignatureVerify,
  RazorpayAuthorization,
} from "@utils/payments/payRequest";
import Script from "next/script";
import { useRouter } from "next/router";
// import Link from "next/link";
// import ConsumerText from "./Form/ConsumerText";
// import { usePreCheckout } from "@hooks/checkout/usePreCheckout";
// import { internalInviteRequest } from "@utils/payments/createInvite";
import LoadingModal from "@components/loading/LoadingModal";
import { useState } from "react";
import Header from "@templates/listing/Header/Header";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import Button from "@components/button";
import LineDivider from "@templates/editEvent/Form/SessionHolder/LineDivider";
// import { updateSocialBoatCommunityUser } from "@models/User/createUtils";
import { EventInterface } from "@models/Event/Event";
// import { updateSocialBoatCommunityUser } from "@models/User/createUtils";

export const razorpay_key_id_front = "rzp_live_N8tAbOcFSLnajr";

export interface CheckoutProps {
  // editing: boolean;
  // editingSection?: formLabelValues;
  // headerVideo?: string;
  heading?: string;
  // onSectionClick?: (newSection: formLabelValues) => void;
  // media: (CloudinaryMedia | AWSMedia)[];
  // id: string;
  // ownerUID: string;
  live?: boolean;
  // cohortId: string;
  // currency?: "₹";
  uid: string;
  // price?: number;
  leader: LeaderBoard | null;
  // name: string;
  // eventKey?: string;
  // acceptInvites?: boolean;
  // about?: string;
  phone: string;
  email: string;
  game: EventInterface;
  team: EventInterface | null;
  // onSuccess: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutTemplate: React.FC<CheckoutProps> = ({
  heading,
  leader,
  // cohortId,
  // id,
  // ownerUID,
  live,
  // eventKey,
  uid,
  // name,
  phone,
  email,
  // currency,
  // price,
  game,
  team,
}) => {
  // const { codeValid, cInviteCode, discountOnPage, discCodeId, setInviteCode } =
  //   usePreCheckout(game.id);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onPayRequestV2 = async () => {
    setLoading(true);
    const razorOrder = await internalPayRequest(game.id, "sub", 0);
    if (razorOrder) {
      const options = {
        key: razorpay_key_id_front, // Enter the Key ID generated from the Dashboard
        amount: razorOrder.amount.toString(),
        currency: razorOrder.currency,
        name: heading,
        order_id: razorOrder.id,
        prefill: {
          email: email,
          contact: phone,
        },
        handler: async function (response: RazorpayAuthorization) {
          try {
            setLoading(true);
            await internalSignatureVerify(
              game.id,
              razorOrder.id,
              // heading ? heading : "",
              // ownerUID,
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,

              uid,
              "sprintId",
              "roundId"
            );

            if (leader?.userKey) {
              router.push(
                `/${encodeURI(leader?.userKey)}/${encodeURI(
                  team?.eventKey ? team.eventKey : "teams"
                )}`
              );
            } else {
              router.push(
                `/confirmation?eventId=${game.id}&paymentId=${response.razorpay_payment_id}`
              );
            }
          } catch (error) {
            setLoading(false);
            console.log("error", error);
          }
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      setLoading(false);
    }
  };

  // const onPayRequest = async () => {
  //   if ((codeValid && discountOnPage === 1) || !price) {
  //     try {
  //       setLoading(true);
  //       const response = await internalInviteRequest(
  //         name,
  //         phone,
  //         email,
  //         cInviteCode,
  //         id,
  //         ownerUID,
  //         // cohortId,
  //         uid
  //       );

  //       //   console.log("response", response);

  //       if (response && response.registrationId && leader?.userKey) {
  //         // push community member

  //         router.push(`/${leader?.userKey}?eventId=${id}`);
  //       } else if (response && response.registrationId) {
  //         router.push(
  //           `/confirmation?eventId=${id}&registrationId=${response.registrationId}`
  //         );
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //     }
  //   } else if (id) {
  //     setLoading(true);
  //     const razorOrder = await internalPayRequest(
  //       game.id,
  //       "sub",
  //       discountOnPage
  //     );
  //     console.log("razorOrder", razorOrder);

  //     if (razorOrder) {
  //       const options = {
  //         key: razorpay_key_id_front, // Enter the Key ID generated from the Dashboard
  //         amount: razorOrder.amount.toString(),
  //         currency: razorOrder.currency,
  //         name: heading,
  //         order_id: razorOrder.id,
  //         prefill: {
  //           email: email,
  //           contact: phone,
  //         },
  //         handler: async function (response: RazorpayAuthorization) {
  //           try {
  //             setLoading(true);
  //             await internalSignatureVerify(
  //               id,
  //               razorOrder.id,
  //               heading ? heading : "",
  //               ownerUID,
  //               response.razorpay_order_id,
  //               response.razorpay_payment_id,
  //               response.razorpay_signature,
  //               // cohortId,
  //               uid,
  //               discCodeId
  //             );

  //             if (leader?.userKey) {

  //               router.push(`/${leader?.userKey}?eventId=${id}`);
  //             } else {
  //               router.push(
  //                 `/confirmation?eventId=${id}&paymentId=${response.razorpay_payment_id}`
  //               );
  //             }
  //           } catch (error) {
  //             setLoading(false);
  //             console.log("error", error);
  //           }
  //         },
  //       };

  //       const paymentObject = new window.Razorpay(options);
  //       paymentObject.open();

  //       setLoading(false);
  //     }
  //   }
  // };

  return (
    <div className={clsx("shadow-inner relative rounded-xl", "bg-white")}>
      {loading ? (
        <div className="h-screen absolute top-0 left-0 right-0 bottom-0">
          <LoadingModal fill="#ff735c" width={48} height={48} />
        </div>
      ) : null}
      {live ? (
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          type="text/javascript"
          strategy="afterInteractive"
        />
      ) : null}

      <div className={clsx("max-w-6xl mx-auto")}>
        <div className="sticky top-0 bg-white z-40">
          <div className={clsx("pl-4 pr-4")}>
            <Header
              headerItems={[]}
              name={leader?.name}
              userKey={leader?.userKey}
            />
          </div>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="p-4 pt-12">
            <h1 className="text-4xl font-semibold text-gray-700 text-center">
              Join the boat
            </h1>
            {/* <div className="flex justify-center">
              <Link href={`/events/${eventKey ? eventKey : ""}`}>
                
                  <p className="underline text=gray-700">{heading}</p>
                
              </Link>
            </div> */}
          </div>

          <div className="p-2 pt-4 pl-4 pr-4">
            {/* <ConsumerText
              type="text"
              name="inviteCode"
              success={codeValid}
              onBlur={() => {}}
              helperText={
                codeValid
                  ? `Congratulations! ${discountOnPage * 100}% discount applied`
                  : cInviteCode
                  ? `Code is invalid. `
                  : ""
              }
              heading="Invite code"
              value={cInviteCode}
              onChangeText={(e: any) => setInviteCode(e.target.value)}
            /> */}
          </div>

          <div className="p-2 pt-4 pl-4 pr-4">
            <div className="pb-4">
              <LineDivider />
            </div>
            <Button appearance="contained" onClick={onPayRequestV2}>
              <div className="py-1">
                <p className="font-bold text-lg">
                  <p>JOIN</p>
                  {/* {price && discountOnPage === 0
                    ? `Join for ${currency}${price}`
                    : price && discountOnPage > 0
                    ? `Join for ${currency}${Math.round(
                        price - price * discountOnPage
                      )}`
                    : "Join"} */}
                </p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutTemplate;
