import { superwomanChallengeFaqContent } from "@templates/joinBoatTemplate/utils";
import FAQComp from "./FAQComp";
import clsx from "clsx";

interface Props {
  mobile?: boolean;
}

const FrequentlyAskedQuestions: React.FC<Props> = ({ mobile }) => {
  return (
    <div
      id="faqSection"
      className="w-screen  max-w-screen-xl mx-auto relative  mt-36"
    >
      <div className="h-20 sm:h-40" />
      <h2
        className={clsx(
          "font-pJSSB text-center xs:text-[28px] sm:text-4xl lg:text-5xl",
          "bg-clip-text text-[#DCCBFF]",
          "w-full xs:px-2 sm:px-4 xs:mb-16 sm:mb-24 lg:mb-32 py-2",
          "block opacity-100 xs:text-center sm:text-center "
        )}
      >
        Frequently Asked Questions
      </h2>
      <div className="w-full xs:w-[90%] sm:w-[70%] md:w-[60%] lg:w-[75%] mx-auto xs:px-2 sm:px-4 ">
        {superwomanChallengeFaqContent.map((faq, index) => (
          <FAQComp key={faq.id} faq={faq} mobile={mobile} />
        ))}
        {mobile ? null : <div className="w-16 aspect-1" />}
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
