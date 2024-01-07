import { homeImg2 } from "@constants/seo";
import { rectWomenImg } from "@constants/seoData";
import DefaultLayout from "@layouts/DefaultLayout";
import CalendlyTemplateV2 from "@templates/CalendlyTemplate/CalendlyTemplateV2";
import React from "react";

// import CompanyDetailsPageTemplate from "@templates/companyDetails/index";

const CalendlyPage: React.FC = () => {
  return (
    <DefaultLayout
      title="SocialBoat General Slot Reservation"
      description="Book a slot with a gynaec, diet expert, health coach or sales consultant"
      img={homeImg2}
      canonical="https://socialboat.live/calendlyV2"
      link="https://socialboat.live/calendlyV2"
      width={360}
      height={360}
      rectImg={rectWomenImg}
      noIndex={true}
      siteName="SocialBoat"
    >
      <CalendlyTemplateV2 />
    </DefaultLayout>
  );
};

export default CalendlyPage;
