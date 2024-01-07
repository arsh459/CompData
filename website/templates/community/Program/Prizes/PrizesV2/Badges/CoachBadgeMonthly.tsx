import { badgeTypes } from "@models/Prizes/PrizeV2";

interface Props {
  effect?: "spin" | "ripple" | "glow";
  badgeType: badgeTypes;
  color: {
    color1: string;
    color2: string;
  };
}

const CoachBadgeMonthly: React.FC<Props> = ({ badgeType, effect, color }) => {
  return (
    <svg className="w-full h-full" viewBox="0 0 117 120" fill="none">
      <g filter="url(#prefix__filter0_d_212_19)">
        <path
          d="M61.56 110.513a6.997 6.997 0 01-6.12 0L18.135 92.386a7 7 0 01-3.768-4.752L5.13 46.8a7 7 0 011.336-5.885l25.853-32.71a7 7 0 015.491-2.66h41.382a7 7 0 015.492 2.66l25.852 32.71a7.003 7.003 0 011.336 5.885l-9.237 40.834a7 7 0 01-3.768 4.752l-37.307 18.127z"
          fill="url(#prefix__paint0_linear_212_19)"
        />
      </g>
      <g filter="url(#prefix__filter1_d_212_19)">
        <path
          d="M62.309 107.935a8.995 8.995 0 01-7.88-.02l-33.696-16.51a9 9 0 01-4.824-6.122L7.634 48.195a9 9 0 011.732-7.552l23.477-29.61a9 9 0 017.075-3.408l37.406.094a9 9 0 017.058 3.444L107.71 40.89a9.001 9.001 0 011.694 7.56l-8.462 37.046a8.998 8.998 0 01-4.854 6.097l-33.78 16.341z"
          fill="url(#prefix__paint1_linear_212_19)"
        />
        <path
          d="M61.002 105.235a5.998 5.998 0 01-5.253-.014l-33.696-16.51a6 6 0 01-3.216-4.081l-8.275-37.088a6 6 0 011.155-5.035l23.477-29.61a6 6 0 014.717-2.272l37.406.094a6 6 0 014.705 2.296l23.328 29.727a6 6 0 011.129 5.04L98.018 84.83a6 6 0 01-3.237 4.065l-33.779 16.341z"
          stroke="url(#prefix__paint2_linear_212_19)"
          strokeWidth={6}
        />
      </g>
      <g filter="url(#prefix__filter2_d_212_19)" fill="#535353">
        <path d="M50.108 64.116l2.15.005-1.572 1.617-2.674-.006 1.223-1.248a1.215 1.215 0 01.873-.368zM60.098 65.76l-2.151-.005 1.572-1.617 2.675.007-1.222 1.247a1.22 1.22 0 01-.874.369z" />
        <path d="M58.017 65.756l-7.588-.02 1.67-1.615 7.561.019-1.643 1.616zM57.566 66.782l2.498.006-.987 1.022a1.639 1.639 0 01-1.183.504l-1.816-.004 1.488-1.528zM53.4 68.303l-2.498-.007.987-1.021a1.639 1.639 0 011.182-.505l1.817.005-1.487 1.528z" />
        <path d="M56.08 68.31l-2.678-.007 1.488-1.528 2.677.007-1.487 1.527zM55.921 69.307l1.85.005-.986.989a1.664 1.664 0 01-1.183.489l-1.816-.005 1.028-1.023a1.56 1.56 0 011.107-.455zM52.64 63.024l-2.499-.006.987-1.022a1.638 1.638 0 011.18-.504l1.82.004-1.488 1.528zM56.804 61.503l2.5.006-.988 1.022a1.638 1.638 0 01-1.182.504l-1.817-.004 1.487-1.528z" />
        <path d="M54.127 61.497l2.678.007-1.488 1.527-2.677-.007 1.487-1.527zM54.286 60.5l-1.851-.005.986-.99a1.664 1.664 0 011.182-.488l1.817.004-1.028 1.024a1.565 1.565 0 01-1.106.454z" />
      </g>
      <path
        d="M41.4 36.25l-4.05 2.95 5.725 7.8a20.57 20.57 0 014.8-1.8L41.4 36.25zM59.5 49.5v5H77v.725l-12.5 3.55v6.975A11.25 11.25 0 1153.25 54.5h1.25v-5h-1.25A16.25 16.25 0 1069.5 65.75v-3.975L87 57v-7.5H59.5zm13.1-13.25l-5.975 8.25H72.8l3.85-5.3-4.05-2.95zM54.5 32v12.5h5V32h-5z"
        fill="#535353"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_212_19"
          x1={59}
          y1={110.5}
          x2={58.5}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FD6F6F" />
          <stop offset={1} stopColor="#F1387B" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_212_19"
          x1={58.336}
          y1={121.074}
          x2={58.701}
          y2={-24.123}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2A2A2A" />
          <stop offset={0.784} stopColor="#050505" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_212_19"
          x1={58.364}
          y1={109.843}
          x2={58.635}
          y2={2.349}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0E0E0E" />
          <stop offset={1} stopColor="#373737" />
        </linearGradient>
        <filter
          id="prefix__filter0_d_212_19"
          x={0.957}
          y={5.546}
          width={115.087}
          height={113.672}
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
            result="effect1_dropShadow_212_19"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_212_19"
            result="shape"
          />
        </filter>
        <filter
          id="prefix__filter1_d_212_19"
          x={3.418}
          y={7.625}
          width={110.212}
          height={109.209}
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
            result="effect1_dropShadow_212_19"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_212_19"
            result="shape"
          />
        </filter>
        <filter
          id="prefix__filter2_d_212_19"
          x={44.012}
          y={59.017}
          width={22.182}
          height={19.773}
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
            result="effect1_dropShadow_212_19"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_212_19"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CoachBadgeMonthly;
