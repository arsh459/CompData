import { LocalUser } from "@models/User/User";
import { useEffect, useRef, useState } from "react";
import PlusMinus from "./PlusMinus";
import { getHeight, getIntialHeight } from "./utils";

const scaleEnd = 120;
const scaleWidth = 77;
const scaleHeight = 1095;
const scaleMarginY = 7;
const scaleIndicatorHeight = 3;
const scaleIndicatorSpaceBetween = 6;
const topFactor = 0.4;
const bottomFactor = 0.6;

interface Props {
  localUser?: LocalUser | undefined;
  onNumberFieldsUpdate: (val: number) => void;
}

const SetHeight: React.FC<Props> = ({ localUser, onNumberFieldsUpdate }) => {
  const container = useRef<HTMLDivElement>(null);
  const scaleScroll = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number>(0);
  const [isInit, setIsInit] = useState<boolean>(true);
  const [containerHeight, setContainerHeight] = useState<number>(400);

  const scrollSpacingTop = Math.round(
    containerHeight * topFactor - scaleMarginY - scaleIndicatorHeight / 2
  );
  const scrollSpacingBottom = Math.round(
    containerHeight * bottomFactor - scaleMarginY - scaleIndicatorHeight / 2
  );
  const multiplicationConst = scaleIndicatorSpaceBetween + scaleIndicatorHeight;

  const onPress = (val: number) => {
    const remoteHeight = Math.round((scaleEnd - val) * multiplicationConst);
    scaleScroll.current && scaleScroll.current.scrollTo(0, remoteHeight);
  };

  useEffect(() => {
    if (container.current) {
      setContainerHeight(container.current.clientHeight * 0.65);
    }
  }, [container]);

  useEffect(() => {
    if (isInit && (localUser?.height || localUser?.gender)) {
      const intialVal = getIntialHeight(localUser.height, localUser.gender);
      setSelected(intialVal);
      const remoteHeight = Math.round(
        (scaleEnd - intialVal) * multiplicationConst
      );
      if (scaleScroll.current) {
        scaleScroll.current && scaleScroll.current.scrollTo(0, remoteHeight);
        setIsInit(false);
      }
    }
  }, [
    localUser?.height,
    localUser?.gender,
    scaleScroll,
    multiplicationConst,
    isInit,
  ]);

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    const remoteHeight = scaleEnd - Math.round(scrollTop / multiplicationConst);
    setSelected(remoteHeight);
    onNumberFieldsUpdate(remoteHeight);
  };

  return (
    <div
      ref={container}
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <div
        className="w-full max-w-[75%] flex flex-row relative"
        style={{ height: containerHeight }}
      >
        <img
          src={
            localUser?.gender === "female"
              ? "https://ik.imagekit.io/socialboat/Component_2_ygVS_JimY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666003642479"
              : "https://ik.imagekit.io/socialboat/Component_1_nxybATCYHt.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666003813978"
          }
          className="h-full aspect-[113/352]"
          alt="person image"
        />
        <div
          ref={scaleScroll}
          onScroll={onScroll}
          style={{ width: scaleWidth }}
          className="h-full aspect-[160/352] overflow-y-scroll scrollbar-hide scroll-smooth"
        >
          <img
            src="https://ik.imagekit.io/socialboat/tr:w-77,c-maintain_ratio,fo-auto/Frame_3_nj0Xfp3PN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671784961281"
            style={{
              width: scaleWidth,
              height: scaleHeight,
              marginTop: scrollSpacingTop,
              marginBottom: scrollSpacingBottom,
            }}
            alt="scale image"
          />
        </div>
        <div className="w-full absolute right-0 top-[40%] -translate-y-1/2 flex flex-row justify-center items-center px-4 h-1 rounded-full bg-white pointer-events-none" />
        <div className="absolute right-0 top-[40%] -translate-y-1/2 flex flex-row justify-center items-center">
          <PlusMinus
            current={selected}
            onChange={onPress}
            currStr={getHeight(selected)}
            max={scaleEnd}
            vertical={true}
            btnRounded="rounded-lg"
          />
        </div>
        <div className="absolute left-0 right-0 top-0 h-12 bg-gradient-to-b from-[#232136] to-[#08080E00] pointer-events-none" />
        <div className="absolute left-0 right-0 bottom-0 h-12 bg-gradient-to-t from-[#232136] to-[#08080E00] pointer-events-none" />
      </div>
    </div>
  );
};

export default SetHeight;
