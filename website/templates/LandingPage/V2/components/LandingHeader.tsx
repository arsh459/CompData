import React, { RefObject } from "react";
import LandingLinks from "./LandingLinks";
import LogoName from "./LogoName";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import useWindowDimensions from "@hooks/utils/useWindowDimensions";
import { useRouter } from "next/router";

const distance = 0.05;
const maxWidth = 1280;

interface Props {
  refObj?: RefObject<HTMLDivElement>;
  noAnimation?: boolean;
  route?: string;
  btnText?: string;
}

const LandingHeader: React.FC<Props> = ({
  refObj,
  noAnimation,
  route,
  btnText,
}) => {
  const { width } = useWindowDimensions();
  const { scrollYProgress } = useScroll({ target: refObj });
  const marginTop = useTransform(
    scrollYProgress,
    [0, distance],
    [0, noAnimation ? 0 : 16]
  );
  const borderWidth = useTransform(
    scrollYProgress,
    [0, distance],
    [0, noAnimation ? 0 : 1]
  );
  const borderRadius = useTransform(
    scrollYProgress,
    [0, distance],
    [0, noAnimation ? 0 : 1000]
  );
  const opacity1 = useTransform(
    scrollYProgress,
    [0, distance],
    [1, noAnimation ? 1 : 0]
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [0, distance / 2],
    [0, noAnimation ? 0 : 1]
  );
  const marginLeft = useTransform(
    scrollYProgress,
    [0, distance],
    [0, width > maxWidth ? (width - maxWidth) / 2 : 16]
  );
  const marginRight = useTransform(
    scrollYProgress,
    [0, distance],
    [0, width > maxWidth ? (width - maxWidth) / 2 : 16]
  );

  const router = useRouter();

  const q = router.query as { home?: string };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#100F1A]"
        style={{ opacity: opacity1 }}
      />
      <motion.div
        className="flex-1 border-[#5A5A5A] overflow-hidden relative"
        style={{
          marginTop,
          borderWidth,
          borderRadius,
          marginLeft,
          marginRight,
        }}
      >
        <motion.div
          className="absolute inset-0 -z-10 bg-[#100F1A]/60 backdrop-blur-[75px]"
          style={{ opacity: opacity2, borderRadius }}
        />
        <div
          className="w-full mx-auto flex items-center justify-between px-4 sm:px-10 py-3"
          style={{ maxWidth }}
        >
          <Link passHref href={q.home ? `/${q.home}` : `/`}>
            <LogoName />
          </Link>
          <LandingLinks route={route} btnText={btnText} />
        </div>
      </motion.div>
    </div>
  );
};

export default LandingHeader;
