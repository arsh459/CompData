import clsx from "clsx";
import React from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

interface Props {
  show: boolean;
  onExpand: () => void;
  children: React.ReactNode;
  headingText: string;
  color: string;
  highlightColor?: string;
  onEdit?: () => void;
}

const ListExpander: React.FC<Props> = ({
  onExpand,
  show,
  children,
  headingText,
  color,
  highlightColor,
  onEdit,
}) => {
  return (
    <div
      className="rounded-2xl py-4  mx-4 mb-4 shadow"
      style={{ backgroundColor: color }}
    >
      <div
        className={clsx(
          "flex-1 px-4 flex justify-between items-center",
          show ? "pb-4" : "pb-0"
        )}
      >
        <p className="hidden md:block"></p>
        <p className="text-[#383838] font-popM text-base flex justify-self-center ">
          {headingText}
        </p>

        <div className="flex-1 px-4">
          <button
            onClick={onEdit ? onEdit : () => {}}
            className="text-sm underline font-popM"
            style={{ color: highlightColor || "#000000" }}
          >
            {onEdit ? "Edit" : ""}
          </button>
        </div>

        <motion.button
          initial={{ rotate: 0 }}
          animate={{ rotate: show ? 360 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={onExpand}
        >
          {show ? (
            <ChevronUpIcon className="w-6 h-6" color="#5F647E" />
          ) : (
            <ChevronDownIcon className="w-6 h-6" color="#5F647E" />
          )}
        </motion.button>
      </div>
      {children}
    </div>
  );
};

export default ListExpander;
