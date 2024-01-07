import { homeImg2 } from "@constants/seo";
import { rectWomenImg } from "@constants/seoData";
import DefaultLayout from "@layouts/DefaultLayout";
import CalendlyTemplate from "@templates/CalendlyTemplate/CalendlyTemplate";
import React from "react";

// import CompanyDetailsPageTemplate from "@templates/companyDetails/index";

const CalendlyPage: React.FC = () => {
  return (
    <DefaultLayout
      title="SocialBoat Slot Reservation"
      description="Book a slot with our health expert to start your PCOS reversal journey"
      img={homeImg2}
      canonical="https://socialboat.live/calendly"
      link="https://socialboat.live/calendly"
      width={360}
      height={360}
      rectImg={rectWomenImg}
      noIndex={true}
      siteName="SocialBoat"
    >
      <CalendlyTemplate />
    </DefaultLayout>
  );
};

export default CalendlyPage;
