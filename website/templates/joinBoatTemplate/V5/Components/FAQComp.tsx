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
      className="flex flex-row justify-between items-start pb-8"
    >
      <div className="flex-[0.9]">
        <h4
          className={clsx(
            mobile ? "text-sm" : "text-base",
            "font-popR text-white"
          )}
        >
          {faq.heading}
        </h4>
        {isOpen ? (
          <p className="font-popL text-xs text-[#FFFFFF8C] mt-4">{faq.text}</p>
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
