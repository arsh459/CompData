import clsx from "clsx";

export type arrowDirectionType = "top" | "bottom" | "left" | "right";

interface Props {
  direction?: arrowDirectionType;
  color1?: string;
  color2?: string;
  color3?: string;
  opacity?: number;
}

const ArrowCountIcon: React.FC<Props> = ({
  direction,
  color1,
  color2,
  color3,
  opacity,
}) => {
  const remoteOpacity = opacity
    ? opacity > 1
      ? 1
      : opacity < 0
      ? 0
      : opacity
    : 1;
  return (
    <svg
      className={clsx(
        "h-full w-full",
        direction === "top"
          ? "-rotate-90"
          : direction === "bottom"
          ? "rotate-90"
          : direction === "left"
          ? "rotate-180"
          : "rotate-0"
      )}
      viewBox="0 0 13 11"
    >
      <defs>
        <linearGradient
          id="gradient"
          x1={1.454}
          y1={3.5}
          x2={12.461}
          y2={3.597}
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor={color1 ? color1 : "#FF7EC0"}
            stopOpacity={remoteOpacity}
          />
          <stop
            offset="0.41"
            stopColor={color2 ? color2 : "#D96FFF"}
            stopOpacity={remoteOpacity}
          />
          <stop
            offset="0.962"
            stopColor={color3 ? color3 : "#73A2FF"}
            stopOpacity={remoteOpacity}
          />
        </linearGradient>
      </defs>
      <path
        fill="url(#gradient)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.793.218l3.106 4.876c.036.058.063.12.078.188S4 5.422 4 5.5c0 .077-.008.15-.023.218a.591.591 0 01-.078.188l-3.106 4.89C.707 10.933.599 11 .47 11s-.24-.073-.332-.218A.927.927 0 010 10.274c0-.193.046-.362.138-.508L2.848 5.5.138 1.234a.915.915 0 01-.129-.5c0-.2.046-.371.138-.516C.24.073.347 0 .47 0S.7.073.793.218zm4.198 0l3.882 4.876c.046.058.079.12.098.188.02.068.029.14.029.218 0 .077-.01.15-.029.218a.534.534 0 01-.098.188l-3.882 4.89a.495.495 0 01-.403.204.515.515 0 01-.415-.218.793.793 0 01-.173-.508c0-.193.058-.362.173-.508L7.56 5.5 4.173 1.234a.78.78 0 01-.161-.5c0-.2.057-.371.172-.516C4.3.073 4.434 0 4.588 0c.153 0 .288.073.403.218zm7.908 4.876L9.793.218C9.7.073 9.593 0 9.47 0s-.23.073-.323.218a.94.94 0 00-.138.515c0 .198.043.365.13.5L11.847 5.5l-2.71 4.266a.927.927 0 00-.138.508c0 .194.046.363.138.508.092.145.203.218.332.218.13 0 .237-.068.323-.203l3.106-4.89a.592.592 0 00.078-.19A.974.974 0 0013 5.5a.974.974 0 00-.023-.218.592.592 0 00-.078-.188z"
      />
    </svg>
  );
};

export default ArrowCountIcon;
