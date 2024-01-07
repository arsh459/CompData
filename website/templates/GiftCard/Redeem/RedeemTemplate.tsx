import { weEventTrack } from "@analytics/webengage/user/userLog";
import WhatsAppChat from "@components/WhatsAppChat";
import { Gift } from "@models/Gift/Gift";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  gift: Gift;
}

const RedeemTemplate: React.FC<Props> = ({ gift }) => {
  const onNext = () => {
    weEventTrack("giftCard_clickRedeemRequest", {});
  };

  const onPaywallWAClick = () => {
    weEventTrack("giftCard_clickWhatsApp", {});
  };

  return (
    <div className=" h-screen w-full bg-black flex flex-col justify-center items-center text-white">
      <div className="flex items-center s">
        <p className="text-4xl sm:text-5xl lg:text-6xl font-popR text-center">
          Your Gift Card for
          <span className="text-[#FF4183] font-baiSb"> SocialBoat </span>
        </p>
      </div>

      <div className="py-10 md:w-1/3">
        <p className="text-2xl font-popR text-center opacity-70">
          Hi {gift.toName ? gift.toName : "there"}
        </p>
        <p className="text-xl text-light pt-4 text-center ">
          <span className="text-white">
            {gift.fromName ? gift.fromName : "Someone"}
          </span>{" "}
          <span className="opacity-70">
            just gifted you a subscription to SocialBoat.
          </span>
        </p>
        <p className="text-xl text-light pt-4 text-center opacity-70">
          SocialBoat is a health transformation app with fitness programs
          designed for women.
        </p>

        {gift.status === "REDEEMED" ? (
          <p className="text-xl text-light pt-4 text-center opacity-70">
            This card has been redeemed. Please contact us in case of a
            discrepancy
          </p>
        ) : null}

        {gift.toMessage ? (
          <p className="text-xl font-extralight text-center">
            {gift.toMessage}
          </p>
        ) : null}
      </div>

      <div className="flex justify-center items-center pt-4">
        <Link
          href={
            gift.status === "PAID"
              ? `/joinBoatV5?origin=giftCard&giftId=${gift.id}`
              : "https://api.whatsapp.com/send?phone=919958730020&text=Hi!"
          }
        >
          <div className="w-[240px]">
            <button
              className={clsx("rounded-full px-4 py-3  w-full", "bg-white")}
              onClick={onNext}
            >
              <p
                className="text-[#100F1A] text-base  iphoneX:text-xl text-center"
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                {gift.status === "PAID" ? "Unlock your gift" : "Contact us"}
              </p>
            </button>
          </div>
        </Link>
      </div>
      <WhatsAppChat
        redirectLink="https://api.whatsapp.com/send?phone=919958730020&text=Hi!"
        additionalFunc={onPaywallWAClick}
        position="right-10 bottom-10"
        popupMsg={`Have any questions?\nMessage us`}
      />
    </div>
  );
};

export default RedeemTemplate;
