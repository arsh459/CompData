import { badgeTypes } from "@models/Prizes/PrizeV2";

interface Props {
  effect?: "spin" | "ripple" | "glow";
  badgeType: badgeTypes;
  color: {
    color1: string;
    color2: string;
  };
}

const CoachBadge: React.FC<Props> = ({ badgeType, effect, color }) => {
  return (
    <svg className="w-full h-full" viewBox="0 0 113 119" fill="none">
      <g filter="url(#prefix__filter0_d_210_2)">
        <path
          d="M60.639 108.966a7 7 0 01-8.278 0L7.788 76.29A7 7 0 015.264 68.5l17.05-52.95a7 7 0 016.664-4.854h55.044a7 7 0 016.663 4.854l17.051 52.95a7 7 0 01-2.524 7.791l-44.573 32.676z"
          fill="url(#prefix__paint0_linear_210_2)"
        />
      </g>
      <g filter="url(#prefix__filter1_d_210_2)">
        <path
          d="M61.702 105.943a9 9 0 01-10.656-.026l-39.935-29.49a9 9 0 01-3.216-10.015l15.442-47.636a9 9 0 018.584-6.224l49.375.124a9 9 0 018.553 6.268l15.202 47.713a9.001 9.001 0 01-3.265 9.999l-40.084 29.287z"
          fill="url(#prefix__paint1_linear_210_2)"
        />
        <path
          d="M59.932 103.521a6 6 0 01-7.104-.018L12.893 74.015a6 6 0 01-2.144-6.677l15.442-47.636a6 6 0 015.723-4.15l49.375.124a6 6 0 015.701 4.178l15.203 47.713a6.002 6.002 0 01-2.177 6.667L59.932 103.52z"
          stroke="url(#prefix__paint2_linear_210_2)"
          strokeWidth={6}
        />
      </g>
      <path
        d="M39.4 36.25l-4.05 2.95 5.725 7.8a20.57 20.57 0 014.8-1.8L39.4 36.25zM57.5 49.5v5H75v.725l-12.5 3.55v6.975A11.25 11.25 0 1151.25 54.5h1.25v-5h-1.25A16.25 16.25 0 1067.5 65.75v-3.975L85 57v-7.5H57.5zm13.1-13.25l-5.975 8.25H70.8l3.85-5.3-4.05-2.95zM52.5 32v12.5h5V32h-5z"
        fill="#535353"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_210_2"
          x1={57}
          y1={110.5}
          x2={56.5}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FD6F6F" />
          <stop offset={1} stopColor="#F1387B" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_210_2"
          x1={56.336}
          y1={121.074}
          x2={56.701}
          y2={-24.123}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2A2A2A" />
          <stop offset={0.784} stopColor="#050505" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_210_2"
          x1={56.364}
          y1={109.843}
          x2={56.635}
          y2={2.349}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0E0E0E" />
          <stop offset={1} stopColor="#373737" />
        </linearGradient>
        <filter
          id="prefix__filter0_d_210_2"
          x={0.927}
          y={10.695}
          width={111.147}
          height={107.625}
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
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_210_2" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_210_2"
            result="shape"
          />
        </filter>
        <filter
          id="prefix__filter1_d_210_2"
          x={3.456}
          y={12.552}
          width={106.02}
          height={103.125}
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
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_210_2" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_210_2"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CoachBadge;
