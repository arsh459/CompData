import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {}

const wkOut =
  "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Group_861_1_Di5tMMQke.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668158723582";
const meal =
  "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Group_860_1_sq13abBs6.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668158724055";
const walk =
  "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Group_859_1_rFSdqEFqA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668158724293";
const sbImg =
  "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Group_862_1_-4f46P3EL.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668158748257";

const FiveMinuteTasks: React.FC<Props> = ({}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });

  return (
    <div
      ref={ref}
      className="pb-4 md:pb-0 px-4 flex-1 flex-grow   flex items-center justify-center"
    >
      <div className="grid grid-cols-2 grid-rows-2">
        {isInView ? (
          <>
            <motion.div
              initial={{ x: 200, y: 0 }}
              transition={{ repeat: 0 }}
              animate={{ x: [200, 200, 0, 0], y: [0, 200, 200, 0] }}
              //   animate={{ x: [200, 0, 0], y: [-200, -200, 0] }}
              //   animate={{ x: [200, 200, 0, 0], y: [200, -200, -200, 0] }}
            >
              <img
                src={wkOut}
                className="object-contain p-2"
                width="200"
                height="200"
              />
            </motion.div>
            <motion.div>
              <img
                src={sbImg}
                className="object-contain p-2"
                width="200"
                height="200"
              />
            </motion.div>
            <motion.div
              initial={{ x: 200, y: 0 }}
              animate={{ x: [200, 200, 0], y: [-200, 0, 0] }}
              //   initial={{ x: 200, y: 0 }}
              //   animate={{ x: [200, 200, 0], y: [-200, 0, 0] }}
            >
              <img
                src={meal}
                className="object-contain p-2"
                loading="lazy"
                width="200"
                height="200"
              />
            </motion.div>
            <motion.div
              //  initial={{ x: 200, y: 0 }} animate={{ y: [-200, 0] }}
              initial={{ x: 0, y: 200 }}
              animate={{ y: [-200, 0] }}
            >
              <img
                src={walk}
                className="object-contain p-2"
                width="200"
                height="200"
              />
            </motion.div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default FiveMinuteTasks;
