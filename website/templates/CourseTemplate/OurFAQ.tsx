import { FAQDATA } from "@templates/joinBoatTemplate/utils";
import FAQComp from "@templates/joinBoatTemplate/V5/Components/FAQComp";

interface Props {
  courseFAQ?: FAQDATA[];
}

const OurFAQ: React.FC<Props> = ({ courseFAQ }) => {
  return courseFAQ && courseFAQ.length ? (
    <div className="w-full min-h-max max-w-5xl mx-auto px-4 sm:px-8 lg:px-0">
      <h2 className="text-[#F3F3F3] text-3xl mx-auto py-20 font-popR font-medium">
        Frequently Asked Questions
      </h2>
      {courseFAQ.map((faq) => (
        <FAQComp key={faq.id} faq={faq} />
      ))}
      <div className="w-16 aspect-1" />
    </div>
  ) : null;
};

export default OurFAQ;
