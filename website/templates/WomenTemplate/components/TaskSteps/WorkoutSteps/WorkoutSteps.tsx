import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {}

const post =
  "https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Group_892_5NfH88SuU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668868679926";
const transformation =
  "https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Component_24_qtZ-TaASp.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668868681751";

const WorkoutSteps: React.FC<Props> = ({}) => {
  const [selectedTab, setSelectedTab] = useState<"post" | "transformation">(
    "post"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedTab((p) => (p === "post" ? "transformation" : "post"));
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="md:pb-4 flex flex-1 flex-grow items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          className="w-3/4 h-full flex items-center flex-col "
          key={selectedTab ? selectedTab : "empty"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === "post" ? (
            <img
              src={post}
              className="object-contain px-4 h-3/4 max-h-[500px] mx-auto min-h-[500px]"
            />
          ) : (
            <img
              src={transformation}
              className="object-contain px-4 h-3/4 max-h-[500px] mx-auto min-h-[500px]"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WorkoutSteps;
