import { Testimonial } from "@models/Testimonial/interface";
import { Background } from "@templates/WomenTemplate/components/Background";
import VideoOverlay from "./VideoOverlay";
import { UserInterface } from "@models/User/User";
import { deviceTypes } from "@templates/PaymentTemplate/SelectDevice";
import OurFAQ from "@templates/WomenTemplate/components/V2/OurFAQ";
import FooterV3 from "@modules/footer/FooterV3";
import { womenGroupImg } from "@constants/icons/iconURLs";
import Testimonials from "@templates/WomenTemplate/components/V2/Testimonials";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import ListPlanDetails from "./ListPlan/ListPlanDetails";
import ListPlanDetailsMobile from "./ListPlan/ListPlanDetailsMobile";
import { SbPlans } from "@models/SbPlans/interface";
import { useRouter } from "next/router";
// import { createCalendlySession } from "@models/CalendlySession";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import PlansHeader from "./Components/PlansHeader";

interface Props {
  testimonials: Testimonial[];
  plans: SbPlans[];
  user?: UserInterface;
  deviceType?: deviceTypes;
}

const OurPlans: React.FC<Props> = ({
  testimonials,
  user,
  deviceType,
  plans,
}) => {
  const { coachRef } = useCoachAtt();

  const router = useRouter();

  const haveQuestions = async () => {
    weEventTrack("fScanPayment_bookSlot", {});

    weEventTrack("slot_request", { source: "webPlans" });
    router.push("/consultation?appType=sales&navBack=1");
    // if (user?.uid) {
    //   const id = await createCalendlySession(user.uid, user.name);
    //   router.push(`/calendly?id=${id}&height=800&navBack=1`);
    // } else {
    //   router.push("https://calendly.com/socialboat/consultation");
    // }
  };

  return (
    <div className="bg-[#100F1A] text-white w-screen min-h-screen overflow-y-scroll scrollbar-hide relative z-0">
      <Background imgUrl="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/SB%20main%20website%2068_fLtUtiPXl.png?updatedAt=1690166057881" />
      <PlansHeader coachRef={coachRef} />

      <div className="w-full  h-screen relative z-0 ">
        {plans ? (
          <VideoOverlay
            allSbPlan={plans}
            coachRef={coachRef}
            user={user}
            deviceType={deviceType}
          />
        ) : null}
      </div>

      <div className="backdrop-blur">
        <div className="hidden sm:block">
          {plans && <ListPlanDetails plans={plans} />}
        </div>

        <div className=" block sm:hidden">
          {plans && <ListPlanDetailsMobile plans={plans} />}
        </div>

        <Testimonials
          testimonials={testimonials}
          bgColor={`bg-[#553CA8B2]/50 backdrop-blur-xl`}
        />

        <OurFAQ />

        <div className="w-20 aspect-1" />

        <div className="bg-[#FFFFFF1A] border-t border-white/30 z-20">
          <FooterV3 footerImg={womenGroupImg} />
        </div>
      </div>

      <div className="fixed hidden sm:flex flex-row bg-white bottom-0 left-0 right-0 items-center justify-center gap-x-4 py-4">
        <p className="text-[#343434] sm:text-sm lg:text-base font-popM ">
          Want to speak to our Health Expert to know more?
        </p>
        <button onClick={haveQuestions}>
          <div className=" bg-[#A056FF] rounded-[14px]   ">
            <p className="text-white text-sm font-popM py-2 px-4 text-center">
              Book FREE consultation
            </p>
          </div>
        </button>
      </div>

      <button
        onClick={haveQuestions}
        className="fixed block sm:hidden bottom-4 left-0 right-0 bg-white rounded-2xl py-4 mx-4"
      >
        <p className="text-[#003747] text-sm font-popSB  text-center">
          Book FREE consultation
        </p>
      </button>

      <div className="h-[88px] sm:h-16" />
    </div>
  );
};

export default OurPlans;
