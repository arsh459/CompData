import {
  lowerNormalCycleLength,
  lowerNormalPeriodLength,
  upperNormalCycleLength,
  upperNormalPeriodLength,
} from "@modules/Bookings/AchievementPath/utils/constants";
import { useEffect, useRef, useState } from "react";
import SetCycleLength from "./SetCycleLength";

const arrowWidth = 7;
const itemSize = 80;

const getData = (isCycle?: boolean): number[] => {
  return Array.from(Array(isCycle ? 71 : 17).keys()).slice(1);
};

const getCurrent = (
  length: number,
  isCycle?: boolean
): { text: string; color: string } => {
  if (length < (isCycle ? lowerNormalCycleLength : lowerNormalPeriodLength)) {
    return { text: "Short", color: "#FF7676" };
  } else if (
    length > (isCycle ? upperNormalCycleLength : upperNormalPeriodLength)
  ) {
    return { text: "Long", color: "#BA76FF" };
  } else {
    return { text: "Normal", color: "#81FF76" };
  }
};

interface Props {
  target: number;
  onChange: (val: number) => void;
  title: string;
  highlightedTitle: string;
  highlightedColor: string;
  currentText: string;
  isCycle?: boolean;
  isIrregulerCycle?: boolean;
}

const SetLength: React.FC<Props> = ({
  target,
  onChange,
  title,
  highlightedTitle,
  highlightedColor,
  currentText,
  isCycle,
  isIrregulerCycle,
}) => {
  const current = getCurrent(target, isCycle);
  const scrollRef = useRef<HTMLDivElement>(null);
  const splidedTitle = `__${title}__`.split(highlightedTitle);
  const [cycleIrregular, setCycleIrregular] = useState<boolean>(
    !!isIrregulerCycle
  );
  const [listOffsetX, setListOffsetX] = useState<number>(200);
  const [init, setInit] = useState<boolean>(true);

  useEffect(() => {
    if (scrollRef.current && init && target) {
      const width = scrollRef.current.clientWidth;
      const remoteListOffsetX = Math.round((width - itemSize) / 2);
      const intialScrollX = (target - 1) * itemSize;
      setListOffsetX(remoteListOffsetX);
      scrollRef.current.scrollTo(intialScrollX, 0);
      setInit(false);
    }
  }, [scrollRef, target, init]);

  useEffect(() => {
    if (isCycle && !cycleIrregular) {
      setInit(true);
    }

    return () => {
      setInit(true);
    };
  }, [isCycle, cycleIrregular]);

  const onPress = (item: number) => {
    if (scrollRef.current) {
      const offset =
        Math.floor((item - 1) * itemSize) + Math.round(arrowWidth / 2);
      scrollRef.current.scrollTo({
        left: offset,
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const renderItem = (item: number) => {
    return (
      <div key={keyExtractor(item)} className="snap-center">
        <div
          onClick={() => onPress(item)}
          className="aspect-1 rounded-full flex justify-center items-center cursor-pointer select-none"
          style={{ width: itemSize }}
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
      </div>
    );
  };

  const keyExtractor = (item: number) => `item-${item}`;

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const remoteTarget =
      Math.floor(event.currentTarget.scrollLeft / itemSize) + 1;
    if (remoteTarget !== target && !init) {
      onChange(remoteTarget);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <p
        className="text-[#F1F1F1] text-xl px-4"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {splidedTitle[0].replaceAll("__", "")}
        <span
          style={{ color: highlightedColor }}
        >{` ${highlightedTitle} `}</span>
        {splidedTitle[1].replaceAll("__", "")}
      </p>

      {isCycle && cycleIrregular ? (
        <div className="flex-1 flex flex-col justify-center">
          <SetCycleLength target={target} onChange={onChange} />
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full relative z-0">
            <div className="absolute inset-0 -z-10 flex justify-center items-center">
              <div
                style={{
                  width: itemSize - arrowWidth,
                  height: itemSize - arrowWidth,
                  borderRadius: itemSize,
                  backgroundColor: highlightedColor || "transparent",
                }}
              />
            </div>
            <div
              ref={scrollRef}
              onScroll={onScroll}
              className="w-full flex overflow-x-scroll overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
            >
              <div className="opacity-0">
                <div style={{ width: listOffsetX }} />
              </div>
              {getData(isCycle).map((item) => renderItem(item))}
              <div className="opacity-0">
                <div style={{ width: listOffsetX }} />
              </div>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[#232136] to-[#23213600] pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[#232136] to-[#23213600] pointer-events-none" />
          </div>
          <div
            className="mx-auto mb-8"
            style={{
              width: 0,
              height: 0,
              borderBottomWidth: arrowWidth * 4,
              borderBottomColor: "white",
              borderRightWidth: arrowWidth,
              borderRightColor: "transparent",
              borderLeftWidth: arrowWidth,
              borderLeftColor: "transparent",
            }}
          />
          <p
            className="text-[#B8B8B8] text-lg text-center px-4"
            style={{ fontFamily: "Nunito-Regular" }}
          >
            {currentText}
            <span style={{ color: current.color }}>{current.text}</span>
          </p>
        </div>
      )}

      {isCycle && !isIrregulerCycle ? (
        <div className="px-4">
          <p
            onClick={() => setCycleIrregular(!cycleIrregular)}
            className="text-[#957BFF] text-xl text-center"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {cycleIrregular
              ? "I can specify an exact length"
              : "Cycle is irregular?"}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default SetLength;
