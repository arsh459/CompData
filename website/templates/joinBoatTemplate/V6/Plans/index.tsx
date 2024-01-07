import LoadingModal from "@components/loading/LoadingModal";
import { sectionTypes } from "@hooks/joinBoat/V6/useSection";
import { UserInterface } from "@models/User/User";
import Script from "next/script";
import { useState } from "react";
import SkipNow from "./SkipNow";
import OurPlans from "./OurPlans";
import PlanFeatures from "./PlanFeatures";
import OurFAQ from "@templates/WomenTemplate/components/V2/OurFAQ";
import TestimonialsComp from "./TestimonialsComp";
import PlanCta from "./PlanCta";

interface Props {
  user?: UserInterface;
  gotoSection: (sec: sectionTypes, replace?: boolean) => void;
}

const Plans: React.FC<Props> = ({ user, gotoSection }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div id="root">
      {loading ? (
        <LoadingModal fill="#ff735c" width={40} height={40} fixed={true} />
      ) : null}

      <div className="flex-1 text-white w-full relative z-0 bg-[#232136] rounded-t-3xl overflow-hidden">
        <div className="w-full h-[50vh] relative z-0">
          <video
            preload="auto"
            autoPlay
            playsInline
            loop
            muted={true}
            controls={false}
            src="https://s3.ap-south-1.amazonaws.com/www.socialboat.live/socialboat-pcod-treatment.mp4"
            className="w-full h-full object-cover rounded-t-3xl"
            poster="https://ik.imagekit.io/socialboat/surya-namaskar-sunrise_imcIrb0H3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675749387154"
          />

          <SkipNow gotoSection={gotoSection} />

          <OurPlans
            user={user}
            gotoSection={gotoSection}
            setLoading={setLoading}
          />
        </div>

        <PlanFeatures />

        <TestimonialsComp />

        <div className="px-4">
          <OurFAQ mobile={true} />
        </div>
      </div>

      <PlanCta user={user} gotoSection={gotoSection} setLoading={setLoading} />

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        type="text/javascript"
        strategy="afterInteractive"
      />
    </div>
  );
};

export default Plans;
