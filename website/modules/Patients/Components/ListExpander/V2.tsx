import CancleIcon from "@components/SvgIcons/CancleIcon";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
  headingText: string;
  color: string;
  bgColor?: string;
}

const V2: React.FC<Props> = ({ children, headingText, color, bgColor }) => {
  const [show, setSetShow] = useState<boolean>(false);
  const remoteColor = show ? bgColor || color : color;

  return (
    <div
      className="p-4 rounded-xl backdrop-blur"
      style={{
        borderWidth: bgColor && !show ? 0 : 1,
        borderColor: `${remoteColor}${show ? "66" : ""}`,
        backgroundColor: show ? "#FFFFFF66" : bgColor,
      }}
    >
      <button className="w-full flex justify-between items-center">
        <p className="text-base font-nunitoM" style={{ color: remoteColor }}>
          {headingText}
        </p>
        <motion.button
          initial={{ rotate: 0 }}
          animate={{ rotate: show ? 360 : 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
          onClick={() => setSetShow((p) => !p)}
        >
          {show ? (
            <CancleIcon className="w-6 h-6 scale-50" color={remoteColor} />
          ) : (
            <ChevronDownIcon className="w-6 h-6" color={remoteColor} />
          )}
        </motion.button>
      </button>
      {show ? children : null}
    </div>
  );
};

export default V2;
