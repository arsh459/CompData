import {
  influencerArr,
  ProvenResultData,
} from "@templates/WomenTemplate/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ProvenResult = () => {
  const targetRef = useRef(null);

  const isInView = useInView(targetRef, {
    once: true,
    margin: "0px 100px -50px 0px",
    amount: 0.15,
  });

  return (
    <div
      ref={targetRef}
      className="w-full h-screen max-w-screen-xl mx-auto py-12 lg:py-8 overflow-hidden flex justify-center items-center lg:my-40"
    >
      <div className="h-full max-h-[550px] sm:max-h-[850px] aspect-[1200/800] grid grid-cols-7 grid-rows-4 gap-5 p-5">
        {isInView &&
          influencerArr.map((item, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              key={`${item.name} workout clip`}
              className="w-full h-full rounded-xl overflow-hidden"
            >
              <img
                src={item.media}
                alt={`${item.name} workout clip`}
                className="w-full h-full object-contain"
              />
            </motion.div>
          ))}
        {isInView ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="row-[2_/_span_2] col-[3_/_span_3] rounded-xl overflow-hidden flex justify-center items-center"
          >
            <div className=" flex flex-col justify-center">
              <h2 className="text-2xl sm:text-4xl font-popL pb-3.5">
                Proven results in over <br />
                <span className="text-[#FF33A1] font-popR">5000+ users</span>
              </h2>
              {ProvenResultData.map((item, index) => {
                return (
                  <div
                    key={`Proven Result text ${index}`}
                    className="w-full flex pb-3.5 md:px-2 justify-center items-center"
                  >
                    <img
                      src={item.media}
                      alt={`Proven Result icon ${index}`}
                      className="w-4 h-4 object-contain mr-4"
                    />
                    <p className="flex-1 text-xs sm:text-base font-popL">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default ProvenResult;
