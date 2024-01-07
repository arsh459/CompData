import clsx from "clsx";
import { TimelineInterface } from "../utils/interface";

interface Props {
  timeline: TimelineInterface;
  dark?: boolean;
}

const Timeline: React.FC<Props> = ({ timeline, dark }) => {
  const doneColor = dark ? "#51FF8C" : "#1FAF20";

  return (
    <div
      className={clsx(
        "w-full flex",
        timeline.align === "end" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "w-1/2 flex items-center",
          timeline.align === "end" ? "flex-row-reverse" : "flex-row",
          timeline.align === "end" ? "-translate-x-[1px]" : "translate-x-[1px]"
        )}
      >
        <div
          className="flex-1 flex flex-row items-center px-4 py-2 bg-[#EFDFFF]/25 rounded-xl border border-[#EFDFFF] shadow"
          style={{
            backgroundColor:
              timeline.status === "DONE" ? `${doneColor}33` : "#EFDFFF33",
            borderColor: timeline.status === "DONE" ? doneColor : "#EFDFFF",
          }}
        >
          <img
            src={timeline.icon}
            alt={timeline.icon}
            className="w-5 aspect-1 mr-2 object-contain"
          />
          <p
            className="flex-1 text-white text-xs leading-3 line-clamp-2"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {timeline.text}
          </p>
        </div>
        <div className="w-1/4 flex flex-row items-center">
          <div
            style={{
              width: "100%",
              borderColor: "#F3E8FF",
              borderWidth: 1,
              borderStyle: "dotted",
            }}
          />
        </div>
        <div
          style={{
            height: 70,
            borderColor: "#F3E8FF",
            borderWidth: 1,
            borderStyle: "dotted",
          }}
        />
      </div>
    </div>
  );
};

export default Timeline;
