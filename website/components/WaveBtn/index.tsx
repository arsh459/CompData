// import clsx from "clsx";

import clsx from "clsx";
import { ReactElement } from "react";

interface Props {
  gotoComponent?: () => void;
  text: string;
  color1?: string;
  color2?: string;
  textColor?: string;
  styleContainerTw?: string;
  textStyleTw?: string;
  svgComp?: ReactElement;
}

const WaveBtn: React.FC<Props> = ({
  gotoComponent,
  text,
  color1,
  color2,
  textColor,
  styleContainerTw,
  textStyleTw,
  svgComp,
}) => {
  return (
    <div
      className={clsx(
        "relative cursor-pointer flex justify-center items-center ",
        styleContainerTw
      )}
      onClick={gotoComponent}
    >
      {svgComp ? (
        svgComp
      ) : (
        <svg className="w-full h-full" viewBox="0 0 211 60" fill="none">
          <rect
            x="9"
            y="6"
            width="193"
            height="47.4759"
            rx="23.738"
            fill="url(#paint_linear)"
          />
          <g className="rippleRectAnimation">
            <rect
              x="6.5"
              y="4.5"
              width="198"
              height="51"
              rx="25.5"
              stroke="url(#paint_linear)"
              strokeWidth="2"
            />
            <rect
              x="3.25"
              y="2.25"
              width="204.5"
              height="55.5"
              rx="27.75"
              stroke="url(#paint_linear)"
              strokeWidth="1"
            />
            <rect
              x="0.1"
              y="0.1"
              width="210.8"
              height="59.8"
              rx="29.9"
              stroke="url(#paint_linear)"
              strokeWidth="0.5"
            />
          </g>

          <defs>
            <linearGradient id="paint_linear" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor={color1 ? color1 : "#F19B38"} />
              <stop
                offset="100%"
                stopColor={color2 ? color2 : color1 ? color1 : "#FD6F6F"}
              />
            </linearGradient>
          </defs>
        </svg>
      )}
      <p
        className={clsx(
          "absolute inset-0 z-10 flex justify-center items-center text-base iphoneX:text-xl font-baib",
          textColor ? textColor : "text-white",
          textStyleTw
        )}
      >
        {text}
      </p>
    </div>
  );
};

export default WaveBtn;
