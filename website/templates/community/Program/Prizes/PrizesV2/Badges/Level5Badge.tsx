import { badgeTypes } from "@models/Prizes/PrizeV2";
import clsx from "clsx";

interface Props {
  effect?: "spin" | "ripple" | "glow";
  badgeType: badgeTypes;
  color: {
    color1: string;
    color2: string;
  };
}

const Level5Badge: React.FC<Props> = ({ badgeType, effect, color }) => {
  return (
    <svg className="w-full h-full" viewBox="0 0 174 174" fill="none">
      <g
        filter="url(#prefix__filter0_f_216_63)"
        className={clsx(
          "transition-opacity",
          effect === "glow" ? "opacity-100" : "opacity-0"
        )}
      >
        <path
          d="M90.501 158.745a8.995 8.995 0 01-6.888-.006L38.857 140.16a8.998 8.998 0 01-4.867-4.874L15.481 90.501a9 9 0 01.005-6.888l18.58-44.756a9 9 0 014.874-4.867l44.785-18.509a9 9 0 016.888.005l44.756 18.58a9.003 9.003 0 014.867 4.874l18.509 44.785a9 9 0 01-.005 6.888l-18.58 44.756a8.996 8.996 0 01-4.874 4.866l-44.785 18.51z"
          fill="url(#prefix__paint0_linear_216_63)"
        />
      </g>
      <path
        d="M89.935 158.631a9.004 9.004 0 01-6.889-.006l-43.655-18.123a8.998 8.998 0 01-4.867-4.874L16.469 91.944a9 9 0 01.006-6.888L34.597 41.4a9 9 0 014.875-4.867l43.684-18.055a9 9 0 016.888.006L133.7 36.607a9.003 9.003 0 014.867 4.874l18.054 43.684a9 9 0 01-.005 6.888l-18.123 43.656a8.998 8.998 0 01-4.874 4.867l-43.684 18.055z"
        fill="url(#prefix__paint1_linear_216_63)"
      />
      <g filter="url(#prefix__filter1_d_216_63)">
        <path
          d="M83.047 21.971a9 9 0 016.888 0l41.204 17.067a8.998 8.998 0 014.87 4.87l17.067 41.204a8.995 8.995 0 010 6.889l-17.067 41.203a8.995 8.995 0 01-4.87 4.871l-41.204 17.067a8.995 8.995 0 01-6.888 0l-41.204-17.067a8.997 8.997 0 01-4.87-4.871L19.904 92.001a9 9 0 010-6.889L36.972 43.91a9 9 0 014.871-4.87L83.047 21.97z"
          fill="url(#prefix__paint2_linear_216_63)"
        />
        <path
          d="M88.787 24.743L129.99 41.81a5.999 5.999 0 013.248 3.247l17.067 41.203a6 6 0 010 4.593l-17.067 41.203a6 6 0 01-3.248 3.247L88.787 152.37a6 6 0 01-4.592 0L42.99 135.303a6 6 0 01-3.247-3.247L22.677 90.853a6 6 0 010-4.593l17.067-41.203a6 6 0 013.247-3.247l41.204-17.067a6 6 0 014.592 0z"
          stroke="url(#prefix__paint3_linear_216_63)"
          strokeWidth={6}
        />
      </g>
      <path
        d="M104.057 62.616H85.792l-1.17 7.085a6.95 6.95 0 011.885-.39c.65-.087 1.408-.13 2.275-.13 2.34 0 4.42.346 6.24 1.04 1.863.693 3.402 1.711 4.615 3.055 1.257 1.3 2.145 2.903 2.665 4.81.52 1.863.607 3.965.26 6.305-.347 2.6-1.105 4.918-2.275 6.955a18.317 18.317 0 01-4.42 5.2c-1.733 1.386-3.727 2.448-5.98 3.185-2.253.736-4.637 1.105-7.15 1.105-3.987 0-7.193-.975-9.62-2.925-2.383-1.95-3.813-4.897-4.29-8.84l10.53-2.34c.043 1.646.542 2.99 1.495 4.03.997.996 2.34 1.495 4.03 1.495 2.08 0 3.835-.65 5.265-1.95 1.43-1.3 2.275-2.947 2.535-4.94.217-1.517.065-2.752-.455-3.705a5.455 5.455 0 00-2.08-2.34c-.91-.607-1.993-1.019-3.25-1.235a21.033 21.033 0 00-3.705-.325c-1.603 0-3.25.151-4.94.455a38.235 38.235 0 00-4.875 1.235l4.095-25.415h27.82l-1.235 8.58zM66.744 105.02h2.652l-1.343 9.588h4.913l-.34 2.448h-7.565l1.683-12.036zm15.03 10.608a4.876 4.876 0 01-1.717 1.207 4.99 4.99 0 01-1.989.425 4.857 4.857 0 01-1.75-.306 3.666 3.666 0 01-1.344-.867 3.68 3.68 0 01-.782-1.377c-.158-.533-.192-1.128-.102-1.785.09-.658.29-1.253.595-1.785a5.03 5.03 0 011.173-1.36 5.02 5.02 0 011.581-.884 5.573 5.573 0 011.836-.306c.59 0 1.11.102 1.564.306.454.204.822.498 1.105.884.284.374.476.827.578 1.36.113.532.125 1.127.034 1.785l-.119.799h-5.916c.034.487.198.878.493 1.173.306.283.709.425 1.207.425.42 0 .782-.091 1.088-.272a3.79 3.79 0 00.867-.731l1.598 1.309zm-1.649-3.638c.068-.431-.022-.799-.272-1.105-.25-.306-.606-.459-1.07-.459a2.038 2.038 0 00-1.36.493c-.17.136-.313.3-.426.493a1.832 1.832 0 00-.238.578h3.366zm3.693-3.196h2.754l1.292 5.61h.034l2.737-5.61h2.567l-4.42 8.262h-2.703l-2.261-8.262zm17.164 6.834a4.875 4.875 0 01-1.717 1.207 4.99 4.99 0 01-1.989.425 4.858 4.858 0 01-1.75-.306 3.667 3.667 0 01-1.344-.867 3.68 3.68 0 01-.782-1.377c-.158-.533-.192-1.128-.102-1.785.09-.658.29-1.253.595-1.785a5.033 5.033 0 011.173-1.36 5.02 5.02 0 011.581-.884 5.574 5.574 0 011.836-.306c.59 0 1.11.102 1.564.306.454.204.822.498 1.105.884.284.374.476.827.578 1.36.114.532.125 1.127.034 1.785l-.119.799h-5.916c.034.487.199.878.493 1.173.306.283.709.425 1.207.425.42 0 .782-.091 1.088-.272.318-.193.607-.437.867-.731l1.598 1.309zm-1.649-3.638c.068-.431-.022-.799-.272-1.105-.25-.306-.606-.459-1.07-.459a2.038 2.038 0 00-1.36.493c-.17.136-.312.3-.426.493a1.834 1.834 0 00-.238.578h3.366zm5.24-7.786h2.55l-1.802 12.852h-2.55l1.802-12.852z"
        fill="#4B4B4B"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_216_63"
          x1={87.056}
          y1={160.169}
          x2={87.17}
          y2={14.057}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BD99FF" />
          <stop offset={1} stopColor="#8B4DFF" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_216_63"
          x1={86.489}
          y1={160.054}
          x2={86.601}
          y2={17.055}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BD99FF" />
          <stop offset={1} stopColor="#8B4DFF" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_216_63"
          x1={86.491}
          y1={20.544}
          x2={86.491}
          y2={156.569}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2D2D2D" />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          id="prefix__paint3_linear_216_63"
          x1={86.491}
          y1={20.544}
          x2={86.491}
          y2={156.569}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#383838" />
          <stop offset={1} stopColor="#0C0C0C" />
        </linearGradient>
        <filter
          id="prefix__filter0_f_216_63"
          x={0.799}
          y={0.799}
          width={172.629}
          height={172.629}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            stdDeviation={7}
            result="effect1_foregroundBlur_216_63"
          />
        </filter>
        <filter
          id="prefix__filter1_d_216_63"
          x={15.22}
          y={21.286}
          width={142.541}
          height={142.541}
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
            result="effect1_dropShadow_216_63"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_216_63"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Level5Badge;
