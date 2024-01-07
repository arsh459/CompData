import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useHomeBadgesV2 } from "@hooks/badges/useHomeBadgesV2";
import { UserInterface } from "@models/User/User";
import ExploreAllHero from "@modules/ExploreAll/Components/ExploreAllHero";
import ExploreBadgeList from "@modules/ExploreAll/Components/ExploreBadgeList";
import { Background } from "@templates/WomenTemplate/components/Background";
import { useScroll } from "framer-motion";
import { useRef } from "react";

interface Props {
  signOut: () => Promise<void>;
  user: UserInterface;
}

const ExploreTemplate: React.FC<Props> = ({ signOut, user }) => {
  const { badges } = useHomeBadgesV2(TEAM_ALPHABET_GAME);
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container });

  const handleBack = () => {
    if (container.current) {
      container.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Background imgUrl="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/sakhi_website__5__krxrsjHCf.png?updatedAt=1686908995439" />

      <div
        ref={container}
        className="text-white scrollbar-hide overflow-y-scroll snap-y snap-mandatory fixed inset-0 z-0 px-4"
      >
        <ExploreAllHero scrollYProgress={scrollYProgress} />
        <ExploreBadgeList
          badges={badges}
          scrollYProgress={scrollYProgress}
          handleBack={handleBack}
        />
      </div>
    </>
  );
};

export default ExploreTemplate;
