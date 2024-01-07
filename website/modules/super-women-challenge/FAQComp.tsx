import { useState } from "react";
import { FAQDATA } from "@templates/joinBoatTemplate/utils";
import { faqMinusIcon, faqPlusIcon } from "@constants/icons/iconURLs";
import { motion } from "framer-motion";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import clsx from "clsx";

interface Props {
  faq: FAQDATA;
  mobile?: boolean;
}

const FAQComp: React.FC<Props> = ({ faq, mobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFaq = () => {
    setIsOpen((prev) => !prev);
    weEventTrack("landing_faq", {});
  };
  const uri = isOpen ? faqMinusIcon : faqPlusIcon;

  return (
    <div
      onClick={toggleFaq}
      className="flex flex-row justify-between items-start pb-8 w-full mx-auto"
    >
      <div className="flex-[0.9]">
        <h4
          className={clsx(
            "xs:text-xs sm:text-sm md:text-lg",
            "font-pJSR text-[#DCCBFF] leading-6"
          )}
        >
          {faq.heading}
        </h4>
        {isOpen ? (
          <p className="font-pJSL xs:text-[10px] sm:text-xs md:text-sm text-[#ffffff99] mt-4 leading-5 tracking-wide">
            {faq.text}
          </p>
        ) : null}
      </div>
      <motion.img
        src={uri}
        alt="expand/collapse icon"
        className="w-5 iphoneX:w-7 aspect-1 cursor-pointer"
        initial={{ rotate: 0 }}
        animate={{ rotate: isOpen ? 360 : 0 }}
      />
    </div>
  );
};

export default FAQComp;
