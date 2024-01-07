import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import ScaledBox from "./ScaledBox";
import DownloadCta from "./DownloadCta";
import WhatYouGetCard from "./WhatYouGetCard";
import PanCards from "./PanCards";
import CardsScatter from "./CardsScatter";
import Confetti from "react-confetti";
import useWindowDimensions from "@hooks/utils/useWindowDimensions";
import { useRouter } from "next/router";
import { downloadContent } from "./constants";
import axios from "axios";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import LoadingModal from "@components/loading/LoadingModal";

interface Props {
  name: string;
  uid?: string;
  noContinue?: boolean;
  challenge?: boolean;
}

const DownloadAppAnimation: React.FC<Props> = ({
  name,
  noContinue,
  challenge,
  uid,
}) => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const [animationState, setAnimationState] = useState<
    "done" | "scale" | "cards" | "confetti" | "none" | "loading"
  >("loading");

  useEffect(() => {
    const isAnimationNotDone = typeof router.query.ANI === "undefined";
    setAnimationState(isAnimationNotDone ? "scale" : "done");
  }, [router.query.ANI]);

  const handleAnimationDone = useCallback(() => {
    if (typeof router.query.ANI === "undefined") {
      router.replace(`${router.asPath}&ANI`);
      setAnimationState("done");
    }
  }, [router]);

  const { heading, cards } = downloadContent(name, challenge);
  const [loading, setLoading] = useState<boolean>(false);

  const onClick = async () => {
    if (uid && challenge) {
      setLoading(true);
      try {
        await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/rankUser`,
          method: "POST",
          data: {
            uid,
          },
          params: {
            uid,
          },
        });
      } catch (e) {}
      weEventTrack(`fScanDownload_clickJoinChallenge`, {});
      window.open("https://socialboat.app.link/download", "_blank");
      setLoading(false);
    } else {
      weEventTrack(`fScanDownload_clickDownloadApp`, {});
      window.location.href = "https://socialboat.app.link/download";
    }
  };

  return (
    <div className="fixed inset-0 z-10 overflow-hidden">
      {animationState === "scale" || animationState === "cards" ? (
        <ScaledBox setAnimationState={setAnimationState} />
      ) : null}
      {loading ? (
        <LoadingModal fill="#ff735c" width={48} height={48} noBg={false} />
      ) : null}

      {animationState !== "scale" && animationState !== "loading" ? (
        <motion.div
          key="cards"
          initial={{ opacity: animationState === "done" ? 1 : 0 }}
          animate={animationState === "done" ? undefined : { opacity: 1 }}
          transition={{
            ease: "linear",
            duration: 1,
          }}
          className="absolute inset-0 z-0 flex flex-col justify-center items-center"
        >
          <div className="h-20" />

          <h2 className="w-full sm:w-[30%] max-w-xs mx-auto text-white text-base iphoneX:text-xl sm:text-2xl font-qsB mb-12">
            {heading}
          </h2>

          <div className="w-full flex-1">
            <div className="w-full sm:w-[30%] max-w-xs max-h-[50vh] mx-auto aspect-[312/405] relative z-0">
              <motion.div
                className="absolute inset-0 -z-10"
                initial={{
                  filter:
                    animationState === "done" ? "blur(60px)" : "blur(0px)",
                }}
                animate={
                  animationState === "done"
                    ? undefined
                    : { filter: "blur(60px)" }
                }
                transition={{
                  ease: "linear",
                  duration: 1,
                  delay: 1,
                }}
                onAnimationComplete={
                  animationState === "done"
                    ? undefined
                    : () => setAnimationState("confetti")
                }
              >
                <WhatYouGetCard />
              </motion.div>

              <motion.div
                className="w-full h-full"
                initial={{ opacity: animationState === "done" ? 1 : 0 }}
                animate={animationState === "done" ? undefined : { opacity: 1 }}
                transition={{
                  ease: "linear",
                  duration: 1,
                  delay: 2,
                }}
              >
                <PanCards cards={cards} />

                <CardsScatter
                  cards={cards}
                  isAnimationDone={animationState === "done"}
                />
              </motion.div>
            </div>
          </div>

          {animationState === "confetti" ? (
            <Confetti
              width={width}
              height={height}
              recycle={false}
              numberOfPieces={500}
              tweenDuration={1000}
              onConfettiComplete={() => setAnimationState("none")}
            />
          ) : null}

          <DownloadCta
            // noContinue={noContinue}
            onClick={onClick}
            ctaText={challenge ? "Join & Download App" : "Download App"}
            noContinue={noContinue || challenge}
            isAnimationDone={animationState === "done"}
            onAnimationComplete={handleAnimationDone}
          />
        </motion.div>
      ) : null}
    </div>
  );
};

export default DownloadAppAnimation;
