import { orgTypes } from "@constants/organization";
import { useState } from "react";
import Hero from "./Hero";

import SelectPlan from "./SelectPlan";
import { useAuth } from "@hooks/auth/useAuth";
import Login from "./Login";
import { deviceTypes } from "./SelectDevice";
// import { useOrgDetails } from "@hooks/auth/useOrgDetails";
import Features from "@templates/LandingPage/leadgenComponents/Features";
import Footer from "@templates/LandingPage/leadgenComponents/Footer";
import Session from "@templates/LandingPage/leadgenComponents/Session";
import Rewards from "./Rewards";
import Script from "next/script";
import { Testimonial } from "@models/Testimonial/interface";
import TestimonialsLanding from "@templates/LandingPage/V2/LandingTestimonials";
import TransformationLanding from "@templates/LandingPage/V2/LandingTransformation";
import AppDetails from "@templates/LandingPage/V2/AppDetails";
import JoinRevolution from "@templates/LandingPage/V2/components/JoinRevolution";

export type paymentTabTypes = "hero" | "login";

interface Props {
  organization: orgTypes;
  ctaHidden?: boolean;
  orgKey: string;
  testimonials?: Testimonial[];
  videoTestimonials?: Testimonial[];
  ctaLink?: string;
}

const Body: React.FC<Props> = ({
  organization,
  ctaHidden,
  orgKey,
  testimonials,
  videoTestimonials,
  ctaLink,
}) => {
  const { authStatus, user } = useAuth();

  const [isProceeded, setIsProceeded] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState<deviceTypes>();

  // useOrgDetails(user?.uid);

  // console.log("c", ctaHidden);

  return (
    <>
      {isProceeded ? (
        <>
          <div className="w-full md:h-28" />
          {authStatus === "PENDING" ? (
            <></>
          ) : authStatus === "SUCCESS" && user && deviceType ? (
            <SelectPlan
              user={user}
              planData={{
                companyCode: organization.name,
                plansTitle: organization.plansTitle,
                plans: organization.plans,
              }}
              deviceType={deviceType}
            />
          ) : (
            <Login deviceType={deviceType} setDeviceType={setDeviceType} />
          )}
        </>
      ) : organization.leadgen ? (
        <div
          className="w-screen h-screen bg-[#100F1A] text-[#F5F8FF] overflow-x-hidden overflow-y-scroll relative z-0"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          <Hero
            orgKey={orgKey}
            leadgen={organization.leadgen}
            ctaText={organization.ctaText}
            ctaHidden={ctaHidden}
            ctaLink2={organization.ctaLink2}
            ctaText2={organization.ctaText2}
            onProceed={() => setIsProceeded(true)}
            ctaLink={ctaLink}
          />
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            type="text/javascript"
            strategy="afterInteractive"
          />
          {organization.rewards ? (
            <Rewards
              rewards={organization.rewards}
              rewardsHeading={organization.rewardsHeading}
            />
          ) : null}
          <Features
            leadgen={organization.leadgen}
            rounded="rounded-xl"
            centered={true}
            featuresHeading={organization.featuresHeading}
          />
          <Session leadgen={organization.leadgen} />
          {videoTestimonials && videoTestimonials.length ? (
            <TransformationLanding videoTestimonials={videoTestimonials} />
          ) : null}
          {testimonials && testimonials.length ? (
            <TestimonialsLanding testimonials={testimonials} />
          ) : null}

          <AppDetails />
          <JoinRevolution origin="marketingPage" />
          <Footer />
        </div>
      ) : null}
    </>
  );
};

export default Body;
