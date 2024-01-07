import { weEventTrack } from "@analytics/webengage/user/userLog";
import LoadingModal from "@components/loading/LoadingModal";
import { socialboatV3 } from "@constants/socialboatOrg";
import { sectionTypes } from "@hooks/joinBoat/V6/useSection";
import { UserInterface } from "@models/User/User";
import { faqContent, listCard } from "@templates/joinBoatTemplate/utils";
import Script from "next/script";
import { useState } from "react";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import FAQComp from "../V5/Components/FAQComp";
import Plan from "./Plans/Plan";
import { useRouter } from "next/router";
import { createCalendlySession } from "@models/CalendlySession";

interface Props {
  user?: UserInterface;
  gotoSection: (sec: sectionTypes, replace?: boolean) => void;

  setDurationInDays: (val: number) => void;
}

const Plans: React.FC<Props> = ({ user, gotoSection, setDurationInDays }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const haveQuestions = async () => {
    if (user?.uid) {
      const id = await createCalendlySession(user.uid, user.name);
      router.push(`/calendly?id=${id}&height=800&navBack=1`);
    }

    weEventTrack("fScanPayment_bookSlot", {});
  };

  const { coachUID } = useCoachAtt();

  const onTap = (durationInDays: number) => {
    router.push(
      `/pay?duration=${durationInDays}&currency=INR&coach=${
        coachUID ? coachUID : ""
      }`
    );
    // setDurationInDays(durationInDays);
    // gotoSection("pay");
  };

  return (
    <>
      {loading ? (
        <LoadingModal fill="#ff735c" width={40} height={40} fixed={true} />
      ) : null}
      <div className="flex-1 text-white w-full relative z-0 bg-[#242237] rounded-t-3xl overflow-hidden">
        <video
          preload="auto"
          autoPlay
          playsInline
          loop
          muted={true}
          controls={false}
          src="https://s3.ap-south-1.amazonaws.com/www.socialboat.live/socialboat-pcod-treatment.mp4"
          className="absolute left-0 right-0 top-0 h-[50vh] -z-10 object-cover rounded-t-3xl"
          poster="https://ik.imagekit.io/socialboat/surya-namaskar-sunrise_imcIrb0H3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675749387154"
        />
        <div className="w-full h-[25vh] relative z-0">
          <button
            onClick={() => gotoSection("download")}
            className="absolute top-3 right-3 z-10 border border-white rounded-full bg-white/10 backdrop-blur-3xl px-4 py-0.5"
          >
            <p className="text-white text-sm">Skip for now</p>
          </button>
        </div>

        {user ? (
          <div className="w-full bg-gradient-to-t from-[#242237] via-[#242237] px-4 pt-12">
            <h1 className="text-white font-nunitoSB text-xl">
              SocialBoat Pricing Plans
            </h1>
            <div className="grid grid-cols-3 gap-4 py-4">
              {socialboatV3.plans.map((plan, index) => (
                <Plan
                  key={`${plan.id}-$${index}`}
                  plan={plan}
                  user={user}
                  setLoading={setLoading}
                  onTap={() => onTap(plan.durationInDays || 30)}
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="mx-4 my-8">
          <h1 className="text-white font-nunitoSB text-xl my-6">
            What will I Get?
          </h1>
          {listCard.map((plan, index) => (
            <div
              key={`${plan.heading}-${index}`}
              className="w-full flex items-center pb-4"
            >
              <img
                src={plan?.iconUri}
                className="w-1/6 aspect-1"
                alt={plan.heading}
              />

              <div className="w-8 aspect-1" />

              <div className="flex-1 flex flex-col">
                <h6
                  className="text-sm font-popM"
                  style={{ color: plan.textColor }}
                >
                  {plan.heading}
                </h6>

                <div>
                  {plan.list.map((list, index) => (
                    <p
                      className="text-xs text-[#FFFFFFF2] font-popL"
                      key={index}
                    >
                      <span className="text-lg align-middle">{`\u2022  `}</span>
                      {list}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full px-4 my-8">
          <h2 className="text-white font-nunitoSB text-xl my-8">
            Frequently Asked Questions
          </h2>
          {faqContent.map((faq) => (
            <FAQComp key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
      <div className="w-full p-4 sticky bottom-0 z-20 h-20 flex flex-col justify-end">
        <div className="absolute left-0 right-0 bottom-0 -z-10 bg-gradient-to-t from-[#242237] via-[#242237] h-40 pointer-events-none" />
        <button
          onClick={haveQuestions}
          className="rounded-full px-4 py-3 text-white font-nunitoR text-base text-center w-full bg-white/10 border border-white"
        >
          {/* <Link href={"https://calendly.com/socialboat/consultation"}> */}
          Book Health Consultation
          {/* </Link> */}
        </button>
      </div>

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        type="text/javascript"
        strategy="afterInteractive"
      />
    </>
  );
};

export default Plans;
