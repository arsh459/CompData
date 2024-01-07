import { badgeTypes } from "@models/Prizes/PrizeV2";

interface Props {
  effect?: "spin" | "ripple" | "glow";
  badgeType: badgeTypes;
  color: {
    color1: string;
    color2: string;
  };
}
const RookieBadge: React.FC<Props> = ({ badgeType, effect, color }) => {
  return (
    <svg className="w-full h-full" viewBox="30 22 70 70" fill="none">
      <path
        d="M42.4 85.94c-5.39 0-8.757-5.833-6.063-10.5L59.5 35.32c2.694-4.667 9.43-4.667 12.124 0L94.79 75.44c2.695 4.667-.673 10.5-6.062 10.5H42.399z"
        fill="url(#prefix__paint0_linear_5508_212)"
      />
      <path
        d="M40.422 87.833c-5.966 0-9.694-6.458-6.711-11.625l25.144-43.552c2.983-5.166 10.44-5.166 13.424 0l25.145 43.552c2.983 5.167-.746 11.625-6.712 11.625h-50.29z"
        stroke="url(#prefix__paint1_linear_5508_212)"
        strokeWidth={0.5}
      />
      <path
        d="M37.858 89.464c-6.082 0-9.883-6.584-6.842-11.85l27.71-47.997c3.041-5.266 10.643-5.266 13.684 0l27.711 47.997c3.04 5.266-.76 11.85-6.842 11.85H37.858z"
        stroke="url(#prefix__paint2_linear_5508_212)"
        strokeWidth={0.2}
      />
      <path
        d="M60.59 37.76c2.31-4 8.083-4 10.393 0L92.65 75.29c2.31 4-.577 9-5.196 9H44.118c-4.619 0-7.506-5-5.196-9L60.59 37.76z"
        fill="url(#prefix__paint3_linear_5508_212)"
        stroke="url(#prefix__paint4_linear_5508_212)"
        strokeWidth={2}
      />
      <path
        d="M74.36 64.469h-3.723l2.714-2.807h4.63l-2.112 2.165a2.106 2.106 0 01-1.51.642zM57.057 61.666h3.724l-2.715 2.806h-4.632l2.111-2.164a2.108 2.108 0 011.512-.642z"
        fill="#6D6D6D"
      />
      <path
        d="M60.658 61.666h13.136l-2.884 2.805H57.82l2.838-2.805zM61.433 59.888H57.11l1.704-1.773a2.837 2.837 0 012.045-.879h3.145l-2.57 2.652zM68.643 57.236h4.325l-1.704 1.773a2.837 2.837 0 01-2.044.879h-3.146l2.569-2.652zM64.006 57.236h4.635l-2.568 2.652h-4.635l2.568-2.652zM64.273 55.508H61.07l1.705-1.717a2.88 2.88 0 012.044-.851h3.145l-1.775 1.775a2.7 2.7 0 01-1.915.793zM69.98 66.373h4.326l-1.704 1.773a2.836 2.836 0 01-2.04.879H67.41l2.57-2.652zM62.775 69.025h-4.326l1.704-1.773a2.837 2.837 0 012.044-.879h3.146l-2.568 2.652z"
        fill="#6D6D6D"
      />
      <path
        d="M67.413 69.024h-4.636l2.569-2.651h4.635l-2.568 2.65zM67.142 70.75h3.205l-1.704 1.717a2.88 2.88 0 01-2.044.851h-3.146l1.776-1.776a2.71 2.71 0 011.913-.792z"
        fill="#6D6D6D"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_5508_212"
          x1={30.275}
          y1={85.94}
          x2={100.851}
          y2={45.193}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.367} stopColor="#55A8B9" />
          <stop offset={1} stopColor="#5EBE90" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_5508_212"
          x1={26.566}
          y1={88.084}
          x2={104.568}
          y2={43.049}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5AB6A2" />
          <stop offset={1} stopColor="#55A8BA" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_5508_212"
          x1={24.001}
          y1={89.564}
          x2={107.135}
          y2={41.566}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5AB6A2" />
          <stop offset={1} stopColor="#55A8BA" />
        </linearGradient>
        <linearGradient
          id="prefix__paint3_linear_5508_212"
          x1={65.787}
          y1={26.76}
          x2={65.787}
          y2={104.802}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#242424" />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          id="prefix__paint4_linear_5508_212"
          x1={65.787}
          y1={26.76}
          x2={65.787}
          y2={104.802}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#444" />
          <stop offset={1} stopColor="#202020" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default RookieBadge;
