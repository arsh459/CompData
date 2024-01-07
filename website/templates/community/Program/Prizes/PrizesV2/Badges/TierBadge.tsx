import { badgeTypes } from "@models/Prizes/PrizeV2";

interface Props {
  effect?: "spin" | "ripple" | "glow";
  badgeType: badgeTypes;
  color: {
    color1: string;
    color2: string;
  };
}

const TierBadge: React.FC<Props> = ({ badgeType, effect, color }) => {
  return (
    <svg className="w-full h-full" viewBox="0 0 114 114" fill="none">
      <g filter={`url(#prefix__filter0_d_${badgeType})`}>
        <path
          d="M62.472 106.983a6.999 6.999 0 01-9.944 0L6.884 60.927a7 7 0 010-9.855L52.528 5.017a7 7 0 019.944 0l45.644 46.055a6.998 6.998 0 010 9.855l-45.644 46.056z"
          fill={`url(#prefix__paint0_linear_${badgeType})`}
        />
      </g>
      <g filter={`url(#prefix__filter1_d_${badgeType})`}>
        <path
          d="M63.78 103.39a9 9 0 01-12.798-.032L10.581 62.307a9 9 0 01.032-12.658L51.22 8.8a9 9 0 0112.797.033l40.401 41.05a8.999 8.999 0 01-.032 12.659L63.779 103.39z"
          fill={`url(#prefix__paint1_linear_${badgeType})`}
        />
        <path
          d="M53.12 101.254L12.72 60.203a6 6 0 01.021-8.44l40.607-40.847a6 6 0 018.532.022l40.401 41.05a6 6 0 01-.021 8.44l-40.607 40.847a6 6 0 01-8.532-.021z"
          stroke={`url(#prefix__paint2_linear_${badgeType})`}
          strokeWidth={6}
        />
      </g>
      <g filter={`url(#prefix__filter2_d_${badgeType})`} fill="#535353">
        <path d="M41.819 53.381l6.885.018-5.033 5.178-8.563-.022 3.915-3.994a3.895 3.895 0 012.796-1.18zM73.806 58.65l-6.888-.017 5.034-5.178 8.568.021-3.915 3.994a3.902 3.902 0 01-2.8 1.18z" />
        <path d="M67.145 58.633l-24.298-.06 5.35-5.176 24.209.06-5.261 5.176zM65.701 61.919l7.997.02-3.16 3.27a5.247 5.247 0 01-3.786 1.616l-5.817-.014 4.766-4.893zM52.362 66.79l-8-.02 3.16-3.272a5.246 5.246 0 013.784-1.616l5.819.015-4.763 4.892z" />
        <path d="M60.94 66.81l-8.573-.02 4.763-4.893 8.573.022-4.763 4.892zM60.432 70.004l5.925.015-3.16 3.167a5.329 5.329 0 01-3.786 1.566l-5.817-.015 3.293-3.276a4.996 4.996 0 013.545-1.457zM49.925 49.886l-8.001-.02 3.16-3.271a5.247 5.247 0 013.78-1.616l5.827.015-4.766 4.892zM63.26 45.015l8.001.02-3.16 3.271a5.246 5.246 0 01-3.784 1.616l-5.819-.015 4.763-4.892z" />
        <path d="M54.688 44.995l8.574.022-4.763 4.89-8.573-.021 4.762-4.89zM55.197 41.8l-5.928-.014 3.16-3.167a5.328 5.328 0 013.784-1.566l5.818.015-3.292 3.278a5.012 5.012 0 01-3.542 1.455z" />
      </g>
      <defs>
        <linearGradient
          id={`prefix__paint0_linear_${badgeType}`}
          x1={58}
          y1={110.5}
          x2={57.5}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color.color2} />
          <stop offset={1} stopColor={color.color1} />
        </linearGradient>
        <linearGradient
          id={`prefix__paint1_linear_${badgeType}`}
          x1={57.336}
          y1={121.074}
          x2={57.701}
          y2={-24.124}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2A2A2A" />
          <stop offset={0.784} stopColor="#050505" />
        </linearGradient>
        <linearGradient
          id={`prefix__paint2_linear_${badgeType}`}
          x1={57.364}
          y1={109.843}
          x2={57.635}
          y2={2.349}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0E0E0E" />
          <stop offset={1} stopColor="#373737" />
        </linearGradient>
        <filter
          id={`prefix__filter0_d_${badgeType}`}
          x={0.855}
          y={2.944}
          width={113.289}
          height={114.112}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_209_17"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_209_17"
            result="shape"
          />
        </filter>
        <filter
          id={`prefix__filter1_d_${badgeType}`}
          x={3.995}
          y={6.147}
          width={107.008}
          height={107.898}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_209_17"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_209_17"
            result="shape"
          />
        </filter>
        <filter
          id={`prefix__filter2_d_${badgeType}`}
          x={31.108}
          y={37.053}
          width={53.412}
          height={45.699}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_209_17"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_209_17"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default TierBadge;
