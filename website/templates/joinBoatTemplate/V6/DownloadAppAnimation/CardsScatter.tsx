import { motion } from "framer-motion";
import WhatYouGetCard from "./WhatYouGetCard";

interface Props {
  isAnimationDone?: boolean;
  cards: { text: string; img: string }[];
}

const CardsScatter: React.FC<Props> = ({ isAnimationDone, cards }) => {
  return (
    <div className="w-full h-full relative z-0 hidden md:block">
      <motion.div
        className="absolute inset-0"
        initial={{ translateX: isAnimationDone ? "-110%" : "0%" }}
        animate={isAnimationDone ? undefined : { translateX: "-110%" }}
        transition={{
          ease: "linear",
          duration: 1,
          delay: 3,
        }}
      >
        {cards[0] ? <WhatYouGetCard data={cards[0]} /> : null}
      </motion.div>

      <div className="absolute inset-0">
        {cards[1] ? <WhatYouGetCard data={cards[1]} /> : null}
      </div>

      <motion.div
        className="absolute inset-0"
        initial={{ translateX: isAnimationDone ? "110%" : "0%" }}
        animate={isAnimationDone ? undefined : { translateX: "110%" }}
        transition={{
          ease: "linear",
          duration: 1,
          delay: 3,
        }}
      >
        {cards[2] ? <WhatYouGetCard data={cards[2]} /> : null}
      </motion.div>
    </div>
  );
};

export default CardsScatter;
