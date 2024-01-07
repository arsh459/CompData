import {
  lowerNormalSleepTime,
  upperNormalSleepTime,
} from "@modules/Bookings/AchievementPath/utils/constants";
import { useEffect, useRef, useState } from "react";

const itemSize = 80;

const data: number[] = Array.from(Array(17).keys()).slice(1);

interface Props {
  target: number;
  onChange: (val: number) => void;
}

const SetSleep: React.FC<Props> = ({ target, onChange }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [listOffsetY, setListOffsetY] = useState<number>(200);
  const [init, setInit] = useState<boolean>(true);

  useEffect(() => {
    if (scrollRef.current && init && target) {
      const width = scrollRef.current.clientWidth;
      const remoteListOffsetY = Math.round((width - itemSize) / 2);
      const intialScrollY = (target - 1) * itemSize;
      setListOffsetY(remoteListOffsetY);
      scrollRef.current.scrollTo(0, intialScrollY);
      setInit(false);
    }
  }, [scrollRef, target, init]);

  const onPress = (item: number) => {
    if (scrollRef.current) {
      const offset = Math.floor((item - 1) * itemSize);
      scrollRef.current.scrollTo({
        left: 0,
        top: offset,
        behavior: "smooth",
      });
    }
  };

  const renderItem = (item: number) => {
    return (
      <div
        key={keyExtractor(item)}
        onClick={() => onPress(item)}
        className="aspect-1 rounded-full flex flex-col justify-center items-center mx-auto snap-center cursor-pointer select-none"
        style={{
          width: itemSize,
        }}
      >
        <p
          style={{
            fontWeight: item === target ? "bold" : "normal",
            color: item === target ? "#FFFFFF" : "#FFFFFFB2",
            fontSize: `${item === target ? 30 : 20}px`,
            fontFamily: "Nunito-Regular",
            verticalAlign: "center",
            textAlign: "center",
            lineHeight: "40px",
          }}
        >
          {item}
        </p>
      </div>
    );
  };

  const keyExtractor = (item: number) => `item-${item}`;

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const remoteTarget =
      Math.floor(event.currentTarget.scrollTop / itemSize) + 1;
    if (remoteTarget !== target && !init) {
      onChange(remoteTarget);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full relative z-0">
        <div className="absolute left-0 right-0 top-0 bottom-0 -z-10">
          <img
            src="https://ik.imagekit.io/socialboat/Group_1758_14U2jjgJrX.png?updatedAt=1685442300223"
            className="w-full h-full object-contain pointer-events-none"
            alt=""
          />
        </div>
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="w-full aspect-1 overflow-y-scroll overflow-x-hidden scrollbar-hide snap-y snap-mandatory"
        >
          <div style={{ height: listOffsetY }} />
          {data.map((item) => renderItem(item))}
          <div style={{ height: listOffsetY }} />
        </div>
        <div className="absolute left-0 right-0 top-0 h-12 z-10 bg-gradient-to-b from-[#232136] to-[#23213600] pointer-events-none" />
        <div className="absolute left-0 right-0 bottom-0 h-12 z-10 bg-gradient-to-t from-[#232136] to-[#23213600] pointer-events-none" />
      </div>
      <div className="w-1/2 mx-auto mt-8">
        <p
          className="text-white/50 text-base text-center"
          style={{ fontFamily: "Nunito-Regular" }}
        >
          {`${lowerNormalSleepTime}-${upperNormalSleepTime} Hours is a considered to be a good sleep`}
        </p>
      </div>
    </div>
  );
};

export default SetSleep;
