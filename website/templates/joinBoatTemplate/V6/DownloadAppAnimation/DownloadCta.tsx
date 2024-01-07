import { motion } from "framer-motion";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import Link from "next/link";

interface Props {
  noContinue?: boolean;
  isAnimationDone?: boolean;
  onAnimationComplete: () => void;
  onClick: () => void;
  ctaText: string;
}

const DownloadCta: React.FC<Props> = ({
  noContinue,
  isAnimationDone,
  onAnimationComplete,
  onClick,
  ctaText,
}) => {
  return (
    <>
      <div className="h-36" />
      <motion.div
        initial={{ opacity: isAnimationDone ? 1 : 0 }}
        animate={isAnimationDone ? undefined : { opacity: 1 }}
        transition={{
          ease: "linear",
          duration: 1,
          delay: 3,
        }}
        onAnimationComplete={onAnimationComplete}
        className="fixed left-4 right-4 bottom-4 max-w-sm mx-auto"
      >
        {noContinue ? null : (
          <Link href="/myProgram" rel="noreferrer">
            <button
              className="w-full rounded-full px-4 py-3 text-transparent bg-clip-text font-popM text-xs iphoneX:text-sm text-center bg-gradient-to-r from-[#88FAFF] to-[#6D8EFF] mb-4"
              onClick={() =>
                weEventTrack(`fScanDownload_continue_on_browser`, {})
              }
            >
              Continue on Browser
            </button>
          </Link>
        )}
        {/* <a
          href="https://socialboat.app.link/download"
          target="_blank"
          rel="noreferrer"
        > */}
        <button
          className="w-full rounded-full px-4 py-3 text-[#29398A] font-popM text-xs iphoneX:text-sm text-center bg-white relative z-0"
          // onClick={() => weEventTrack(`fScanDownload_clickDownloadApp`, {})}
          onClick={onClick}
        >
          {ctaText}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scaleX: 1.08, scaleY: 1.6 }}
            transition={{
              ease: "linear",
              duration: 0.8,
              delay: 3,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="absolute inset-0 rounded-full border border-white/75"
          />
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scaleX: 1.08, scaleY: 1.6 }}
            transition={{
              ease: "linear",
              duration: 0.8,
              delay: 3.4,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="absolute inset-0 rounded-full border border-white/75"
          />
        </button>
        {/* </a> */}
      </motion.div>
    </>
  );
};

export default DownloadCta;
