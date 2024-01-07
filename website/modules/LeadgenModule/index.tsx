/* eslint-disable @next/next/no-img-element */
import { useTestimonials } from "@hooks/testimonials/useTestimonial";
import Transformations from "@templates/WomenTemplate/components/V2/Transformations";
import Testimonials from "@templates/WomenTemplate/components/V2/Testimonials";
import FundingFromV2 from "@templates/WomenTemplate/components/V3/FundingFromV2";
import { fundingFromV2 } from "@templates/WomenTemplate/utils";
import React, { useEffect, useRef, useState } from "react";
import HeroLeadgen from "./HeroLeadgen";
import JoinRevolutionV2 from "@templates/WomenTemplate/components/V2/JoinRevolutionV2";
import FooterV3 from "@modules/footer/FooterV3";
import { womenGroupImg } from "@constants/icons/iconURLs";
import Link from "next/link";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import LandingHeader from "@templates/WomenTemplate/components/V2/LandingHeader";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useInView } from "framer-motion";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  subtitle: string;
  strongTitle: string;
  title: string;
}

const LeadGenModule: React.FC<Props> = ({ strongTitle, title, subtitle }) => {
  const { testimonials, videoTestimonials } = useTestimonials();
  const { coachRef, utm_source } = useCoachAtt();
  const [isScreen1Visible, setIsScreen1Visible] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  useEffect(() => {
    // Update the state when the element is out of view
    setIsScreen1Visible(!isInView);
  }, [isInView]);

  const onBtnClick = () => weEventTrack("leadgen_clickStartJourney", {});
  const route = `/start?utm_source=${utm_source}`;

  return (
    <div className="w-screen h-screen relative z-0">
      <div
        className="fixed inset-0 -z-10 "
        style={{
          background: `linear-gradient(180deg, #300F86 0%, #6C26B7 25.26%, #B354DE 55.87%, #E997F3 81.25%, #F3BBF3 98.96%)`,
        }}
      />
      <LandingHeader
        coachRef={coachRef}
        noMiddleLinks={true}
        route={route} //{`/start${coachRef ? `&${coachRef}` : ""}`}
        btnText="Book Consultation"
        customStyle={{ background: "#9EFB8D" }}
        landingButtonStyleObj={{
          borderColor: "#9EFB8D",
          txtColor: "#000",
          styleTw: "text-3xl",
        }}
        hideOnMobile={true}
        onBtnClick={onBtnClick}
      />
      <div ref={ref}>
        <HeroLeadgen
          title={title}
          route={route}
          subtitle={subtitle}
          strongTitle={strongTitle}
        />
      </div>
      <FundingFromV2 data={fundingFromV2} showRaised={true} />
      {videoTestimonials ? (
        <Transformations
          videoTestimonials={videoTestimonials}
          showSuperWoman={true}
        />
      ) : null}
      <Link href={route}>
        <div className="hidden sm:block bg-white w-4/5 max-w-sm cursor-pointer text-center rounded-full mx-auto">
          <p className="text-black px-10 py-4 text-base font-popM">
            Book FREE consultation
          </p>
        </div>
      </Link>

      {testimonials ? (
        <Testimonials
          testimonials={testimonials}
          bgColor={`bg-[#553CA8B2]/50 backdrop-blur-xl`}
        />
      ) : null}
      <JoinRevolutionV2 origin="women" showChange={true} />
      <div className="w-32 aspect-1" />

      <div className="bg-[#FFFFFF1A] border-t border-white/30">
        <FooterV3 footerImg={womenGroupImg} />
      </div>

      {isScreen1Visible ? (
        <Link
          href={"/start"}
          className="sticky left-0 right-0 bottom-4 cursor-pointer"
        >
          <div className="block sm:hidden bg-[#9EFB8D] w-11/12 mx-auto  py-4  text-center rounded-xl ">
            <div className="flex items-center justify-center">
              <p className="text-black  text-base font-popM">
                Book consultation
              </p>
              <ChevronRightIcon color="#000" className="w-6 aspect-[10/7]" />
            </div>
          </div>
        </Link>
      ) : null}
    </div>
  );
};

export default LeadGenModule;
