import React from "react";

//local
import TermsPageTemplate from "@templates/TermsTemplate/TermsTemplate";
import DefaultLayout from "@layouts/DefaultLayout";
import { termsSEO } from "@constants/seo";
const Terms = () => {
  return (
    <DefaultLayout
      title={termsSEO.title}
      link={termsSEO.link}
      img={termsSEO.img}
      canonical={termsSEO.link}
      noIndex={termsSEO.noIndex}
      description={termsSEO.description}
    >
      <div className="flex items-center justify-center px-10">
        <TermsPageTemplate />
      </div>
    </DefaultLayout>
  );
};

export default Terms;
