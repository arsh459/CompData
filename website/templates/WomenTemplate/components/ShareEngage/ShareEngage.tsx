import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {}

const post =
  "https://ik.imagekit.io/socialboat/tr:w-320,h-500,f-auto/Group_865_jyy6BcW478.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668258051264";
const transformation =
  "https://ik.imagekit.io/socialboat/tr:w-320,h-500,f-auto/Group_864_T1Nf9naWc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668258051408";

const ShareEngage: React.FC<Props> = ({}) => {
  const [selectedTab, setSelectedTab] = useState<"post" | "transformation">(
    "post"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedTab((p) => (p === "post" ? "transformation" : "post"));
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="md:pb-4 flex flex-1 flex-grow items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          className="w-3/4 h-full flex items-center flex-col"
          key={selectedTab ? selectedTab : "empty"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === "post" ? (
            <img
              src={post}
              className="object-contain px-4 w-3/4 max-w-[600px]"
              // className="object-contain px-4 w-full  h-full max-h-[50vh] md:max-h-[503px]"
            />
          ) : (
            <img
              src={transformation}
              className="object-contain px-4 w-3/4 max-w-[600px]"
              // className="object-contain px-4 w-full  h-full max-h-[50vh] md:max-h-[503px]"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ShareEngage;
