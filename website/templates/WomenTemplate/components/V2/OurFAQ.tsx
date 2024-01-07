import { faqContent } from "@templates/joinBoatTemplate/utils";
import FAQComp from "@templates/joinBoatTemplate/V5/Components/FAQComp";
import clsx from "clsx";

interface Props {
  mobile?: boolean;
}

const OurFAQ: React.FC<Props> = ({ mobile }) => {
  return (
    <div
      className="w-full min-h-max max-w-5xl mx-auto px-4 sm:px-8 lg:px-0"
      id="faqSection"
    >
      <h2
        className={clsx(
          mobile ? "text-xl py-6 mt-12" : "text-3xl py-20",
          "mx-auto font-qsSB font-medium text-transparent bg-clip-text bg-gradient-to-br from-[#B269FF] via-[#E3C6FF] to-[#D45FFF]"
        )}
      >
        Frequently Asked Questions
      </h2>
      {faqContent.map((faq, index) => (
        <FAQComp key={faq.id} faq={faq} mobile={mobile} />
      ))}
      {mobile ? null : <div className="w-16 aspect-1" />}
    </div>
  );
};

export default OurFAQ;
