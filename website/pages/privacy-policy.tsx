import React from "react";

//local
import PrivacyTemplate from "@templates/PrivacyTemplate/PrivacyTemplate";
import DefaultLayout from "@layouts/DefaultLayout";
import { seoData } from "@constants/seoData";
const PrivacyPolicy = () => {
  return (
    <DefaultLayout
      title={seoData.privayPolicyPage.title}
      description={seoData.privayPolicyPage.description}
      link={seoData.privayPolicyPage.link}
      canonical={seoData.privayPolicyPage.link}
      img={seoData.privayPolicyPage.img}
      noIndex={false}
    >
      <div className="flex items-center justify-center px-10">
        <PrivacyTemplate />
      </div>
    </DefaultLayout>
  );
};

export default PrivacyPolicy;
