import { Badge } from "@models/Prizes/PrizeV2";
import { UserInterface } from "@models/User/User";
import ProgramHero from "@modules/ProPlanModule/ProgramHero";
import React, { useRef, useState } from "react";
import PlanList from "./PlanList";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import { useScroll } from "framer-motion";
import LoadingModal from "@components/loading/LoadingModal";

interface Props {
  user: UserInterface;
  badge: Badge;
}
const ProgramHomeMain: React.FC<Props> = ({ badge, user }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container });

  const img = badge.bgImageMale; // ? badge.bgImageMale : badge.bgImageFemale;

  const handleBack = () => {
    if (container.current) {
      container.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  // console.log("badge", badge);

  return (
    <>
      <div className="fixed inset-0 -z-10 w-full h-full">
        {img ? (
          <MediaTile
            media={img}
            alt="media"
            width={2400}
            height={getHeight(img, 2400)}
            thumbnail={img}
            objectString="object-cover object-center"
            noControls={true}
            paused={true}
            muted={true}
          />
        ) : null}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div
        className="block fixed inset-0 z-0 overflow-y-scroll scrollbar-hide snap-y snap-mandatory"
        ref={container}
      >
        <ProgramHero badge={badge} gender={user?.gender} />

        <PlanList
          badge={badge}
          user={user}
          scrollYProgress={scrollYProgress}
          handleBack={handleBack}
          setLoading={setLoading}
        />
      </div>

      {loading ? (
        <LoadingModal fixed={true} fill="#ff735c" height={50} width={50} />
      ) : null}
    </>
  );
};

export default ProgramHomeMain;
