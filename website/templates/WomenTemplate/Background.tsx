import { MotionValue, motion, useTransform } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const Background: React.FC<Props> = ({ scrollYProgress }) => {
  const opacity1 = useTransform(scrollYProgress, [0, 0.09], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.09, 0.15], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.1, 0.15, 0.2], [0, 1, 0]);
  const opacity4 = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.5, 0.58],
    [0, 1, 1, 0]
  );
  const opacity5 = useTransform(scrollYProgress, [0.15, 0.2, 1], [0, 1, 1]);

  // background: "linear-gradient(180deg, #16004F 0%, #300F86 51.53%, #6C26B7 100%)";

  return (
    <>
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          opacity: opacity1,
          background:
            "linear-gradient(180deg, #300F86 0%, #6C26B7 25.26%, #B354DE 55.87%, #E997F3 81.25%, #F3BBF3 98.96%)",
        }}
      />
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          opacity: opacity2,
          background:
            "linear-gradient(180deg, #300F86 0%, #6C26B7 25.26%, #B354DE 55.87%, #F15BF1 98.96%)",
        }}
      />

      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          opacity: opacity3,
          background:
            "radial-gradient(108.19% 108.19% at 50.00% -1.66%, #170140 0%, #22044A 26.25%, #420D68 47.65%, #AD39D6 79.79%, #EA7CFF 100%)",
        }}
      />

      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          opacity: opacity4,
          background:
            "radial-gradient(158.23% 100% at 50.00% -0.00%, #16013D 0%, #4F17C6 52.31%, #EA29EE 100%)",
        }}
      />

      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          opacity: opacity5,
          background:
            "linear-gradient(180deg, #16004F 0%, #300F86 51.53%, #1E003E 100%)",
        }}
      />
    </>
  );
};

export default Background;
