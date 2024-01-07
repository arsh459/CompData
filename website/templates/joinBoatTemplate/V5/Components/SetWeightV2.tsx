// import { LocalUser } from "@models/User/User";
import Pendulum from "@components/SvgIcons/Pendulum";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import LeftRight from "./LeftRight";

// import PlusMinus from "./PlusMinus";
// import { getIntialWeight } from "./utils";

const scaleEnd = 200;
const scaleWidth = 2038;
const scaleHeight = 47;
const scaleMarginX = 14;
const scaleIndicatorWidth = 4;
const scaleIndicatorSpaceBetween = 6;

interface Props {
  // localUser: LocalUser | undefined;
  initialValue: number;
  onNumberFieldsUpdate: (val: number) => void;
  target: "weight" | "desiredWeight";
  selected: number;
  setSelected: (val: number) => void;
}

const SetWeightV2: React.FC<Props> = ({
  // localUser,
  onNumberFieldsUpdate,
  target,
  initialValue,
  selected,
  setSelected,
}) => {
  const scaleScroll = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(400);
  const [isInit, setIsInit] = useState<boolean>(true);

  const scrollSpacingX = Math.round(
    containerWidth / 2 - scaleMarginX - scaleIndicatorWidth / 2
  );
  const multiplicationConst = scaleIndicatorSpaceBetween + scaleIndicatorWidth;

  const onPress = (val: number) => {
    scaleScroll.current &&
      scaleScroll.current.scrollTo(val * multiplicationConst, 0);
  };

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = event.currentTarget.scrollLeft;
    const remoteWeight = Math.round(scrollLeft / multiplicationConst);
    setSelected(remoteWeight);
    onNumberFieldsUpdate(remoteWeight);
  };

  useEffect(() => {
    if (isInit && initialValue) {
      // const intialVal = getIntialWeight(
      //   target,
      //   localUser.height,
      //   localUser.gender,
      //   localUser.weight,
      //   localUser.desiredWeight,
      //   localUser.fitnessGoal
      // );

      const weightScrollPosition = Math.round(
        initialValue * multiplicationConst
      );
      if (scaleScroll.current) {
        scaleScroll.current &&
          scaleScroll.current.scrollTo(weightScrollPosition, 0);
        setIsInit(false);
      }
    }
  }, [initialValue, isInit, scaleScroll, multiplicationConst]);

  useEffect(() => {
    if (container.current) {
      setContainerWidth(container.current.clientWidth);
    }
  }, [container]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <LeftRight
        current={selected}
        onChange={onPress}
        max={scaleEnd}
        unit="kg"
      />
      <div className="h-16" />
      <div className="w-full relative z-0" ref={container}>
        <div
          ref={scaleScroll}
          onScroll={onScroll}
          style={{ height: scaleHeight }}
          className="w-full overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          <div
            style={{
              width: scaleWidth,
              height: scaleHeight,
              marginLeft: scrollSpacingX,
              marginRight: scrollSpacingX,
            }}
          >
            <img
              src="https://ik.imagekit.io/socialboat/tr:w-2038,c-maintain_ratio,fo-auto/Group%201000001194_KX8FOcQVl.png?updatedAt=1692609706815"
              className="w-full h-full"
              alt="scale image"
            />
          </div>
        </div>

        <div
          className={clsx(
            "w-full h-3 my-2 pointer-events-none bg-gradient-to-r relative z-0"
            // target === "desiredWeight"
            //   ? " from-[#BF69FC] via-[#ED6198] to-[#BF69FC]"
            //   : " from-[#FF706F] via-[#FFA66A] to-[#FF706F]"
          )}
        >
          <div className=" w-24 aspect-[99/233] rounded-3xl absolute -bottom-[250%] left-1/2 -translate-x-1/2 pointer-events-none">
            <div className="relative z-0 w-full h-full">
              <Pendulum />
              <div className="text-[#844866] font-nunitoB text-2xl  absolute left-0 right-0 top-0 bottom-3/4  text-center  flex flex-col justify-end  ">
                <p>{selected}</p>
              </div>
            </div>
          </div>
          {/* <div className="bg-white/60 rounded-full absolute top-[150%] left-1/2 -translate-x-1/2 pointer-events-none">
            <div className="bg-white w-5 aspect-1 rounded-full m-1" />
          </div> */}
        </div>

        {/* <div className="absolute bg-gradient-to-r from-[#232136] to-[#08080E00] left-0 bottom-0 top-0 z-10 w-12 pointer-events-none" />
        <div className="absolute bg-gradient-to-l from-[#232136] to-[#08080E00] top-0 right-0 bottom-0 z-10 w-12 pointer-events-none" /> */}
      </div>
      <div />
    </div>
  );
};

export default SetWeightV2;
