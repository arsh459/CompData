import React from "react";
import FAQCompNew from "./FAQCompNew";
import { faqContent } from "./utils";

const FaqProList = () => {
  return (
    <div className="p-4">
      <p className="text-sm iphoneX:text-base md:text-3xl font-nunitoB py-4 text-white">
        FAQs
      </p>
      <div className="flex-1">
        {faqContent.map((faq, index) => (
          <div key={faq.id}>
            <FAQCompNew faq={faq} dontShowLastLine={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqProList;
