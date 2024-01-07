import DetailInfo from "./DetailedInfo/DetailInfo";
import StarRating from "./DetailedInfo/StarRating";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
// import { useCallback, useRef, useState } from "react";

const rating = 5;
const reward = 6.2;
const cal = 82;
const duration = 2;
const transformations = 450;

interface Props {
  bgColor?: string;
  // shouldAnimate?: boolean;
}

const AppDetails: React.FC<Props> = ({ bgColor }) => {
  const ref = useRef<null>(null);
  // const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  // const targetRef = useCallback(
  //   (node) => {
  //     if (observer.current) observer.current?.disconnect();

  //     observer.current = new IntersectionObserver(
  //       (entries) => {
  //         entries.forEach((element) => {
  //           if (element.isIntersecting && !shouldAnimate) {
  //             setShouldAnimate(true);
  //           }
  //         });
  //       },
  //       { threshold: 0.5 }
  //     );

  //     if (node) observer?.current.observe(node);
  //   },
  //   [shouldAnimate]
  // );

  return (
    <div
      ref={ref}
      className="grid sm:grid-flow-col auto-cols-fr  py-16 sm:py-20 lg:py-24 gap-10 sm:gap-12 lg:gap-14 w-max mx-auto"
    >
      <DetailInfo
        bgColor="bg-[#FFFFFF26]"
        topTextNode={
          <p className="text-3xl sm:text-5xl lg:text-7xl font-baib">
            {inView ? (
              <CountUp end={rating} decimals={1} duration={duration} />
            ) : (
              <span>{!inView ? 0 : rating}</span>
            )}
            {/* <span>{rating}</span> */}
          </p>
        }
        mediumTextNode={<StarRating rating={rating} />}
        footerText="App Rating"
      />

      <DetailInfo
        bgColor="bg-[#FFFFFF26]"
        topTextNode={
          <p className="text-3xl sm:text-5xl lg:text-7xl font-bold font-baib">
            {inView ? (
              <CountUp
                suffix="+"
                end={transformations}
                decimals={0}
                duration={duration}
              />
            ) : (
              <span>{!inView ? 0 : reward}</span>
            )}
            {/* <span>{reward}</span> */}
          </p>
        }
        mediumTextNode={
          <p className="text-xl sm:text-2xl lg:text-3xl font-medium font-baim">
            Succesful
          </p>
        }
        footerText="Transformations"
      />

      {/* <DetailInfo
        bgColor="bg-[#FFFFFF26]"
        topTextNode={
          <p className="text-3xl sm:text-5xl lg:text-7xl font-bold font-baib">
            {inView ? (
              <CountUp end={reward} decimals={1} duration={duration} />
            ) : (
              <span>{!inView ? 0 : reward}</span>
            )}
          </p>
        }
        mediumTextNode={
          <p className="text-xl sm:text-2xl lg:text-3xl font-medium font-baim">
            Lakh +
          </p>
        }
        footerText="Rewards Claimed"
      /> */}
      <DetailInfo
        bgColor="bg-[#FFFFFF26]"
        topTextNode={
          <p className="text-3xl sm:text-5xl lg:text-7xl font-bold font-baib">
            {inView ? (
              <CountUp suffix="+" end={cal} duration={duration} />
            ) : (
              <span>{!inView ? 0 : cal}</span>
            )}
            {/* <span>{cal}</span> */}
          </p>
        }
        mediumTextNode={
          <p className="text-xl sm:text-2xl lg:text-3xl font-medium font-baim">
            Million
          </p>
        }
        footerText="Calories Burned"
      />
    </div>
  );
};

export default AppDetails;
