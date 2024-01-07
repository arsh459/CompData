import React, { useState } from "react";
import clsx from "clsx";
import { FAQDATA } from "@templates/joinBoatTemplate/utils";
import { minusIconFAQ, plusIconFAQ } from "@constants/icons/iconURLs";
import { motion } from "framer-motion";

interface Props {
  faq: FAQDATA;
  borderColorTw?: string;
  dontShowLastLine?: boolean;
}

const FAQCompNew: React.FC<Props> = ({
  faq,
  borderColorTw,
  dontShowLastLine,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFaq = () => setIsOpen((prev) => !prev);
  const uri = isOpen ? minusIconFAQ : plusIconFAQ;

  return (
    <div className="px-4">
      <div onClick={toggleFaq} className="flex flex-row flex-1">
        <p className="flex-1 text-sm font-nunitoM text-white">{faq.heading}</p>
        <div className="pl-2">
          <motion.img
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? 360 : 0 }}
            src={uri}
            className="w-4 iphoneX:w-6 aspect-1"
            alt=""
          />
        </div>
      </div>
      {isOpen ? (
        <p className=" pt-4 font-nunitoR text-xs text-[#FFFFFF8C]">
          {faq.text}
        </p>
      ) : null}
      {dontShowLastLine ? (
        <div className={clsx("w-full", "mb-7 h-px")} />
      ) : (
        <div
          className={clsx(
            "w-full",
            "my-7 h-px",
            borderColorTw ? borderColorTw : "bg-[#4D4D4D]"
          )}
        />
      )}
    </div>
  );
};

export default FAQCompNew;
