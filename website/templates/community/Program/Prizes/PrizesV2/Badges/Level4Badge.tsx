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

const Level4Badge: React.FC<Props> = ({ badgeType, effect, color }) => {
  return (
    <svg className="w-full h-full" viewBox="20 19 160 160" fill="none">
      <g
        filter="url(#prefix__filter0_f_217_8)"
        className={clsx(
          "transition-opacity",
          effect === "glow" ? "opacity-100" : "opacity-0"
        )}
      >
        <path
          d="M135.143 164.344a9.003 9.003 0 01-7.051 3.359l-56.136-.233a8.997 8.997 0 01-7.023-3.418l-34.818-44.034a9 9 0 01-1.706-7.621L41.127 57.72a9 9 0 014.895-6.086L96.7 27.487a9 9 0 017.81.033l50.476 24.566a8.998 8.998 0 014.844 6.126l12.264 54.781a9 9 0 01-1.769 7.607l-35.182 43.744z"
          fill="url(#prefix__paint0_linear_217_8)"
        />
      </g>
      <path
        d="M133.771 161.473a9.001 9.001 0 01-7.051 3.36l-53.376-.222a8.997 8.997 0 01-7.022-3.418l-33.107-41.869a9 9 0 01-1.706-7.621l12.093-51.99a9 9 0 014.895-6.085l48.186-22.96a9 9 0 017.81.033l47.995 23.358a9.004 9.004 0 014.844 6.126l11.661 52.088a9 9 0 01-1.769 7.607l-33.453 41.593z"
        fill="url(#prefix__paint1_linear_217_8)"
      />
      <g filter="url(#prefix__filter1_d_217_8)">
        <path
          d="M96.344 34.174a9 9 0 017.81 0l45.365 21.846a9.002 9.002 0 014.869 6.106l11.204 49.088a9 9 0 01-1.738 7.614l-31.393 39.366a9 9 0 01-7.036 3.389h-50.35a9.002 9.002 0 01-7.037-3.389l-31.393-39.366a8.999 8.999 0 01-1.738-7.614L46.11 62.126a9 9 0 014.87-6.106l45.363-21.846z"
          fill="url(#prefix__paint2_linear_217_8)"
        />
        <path
          d="M102.853 36.877l45.364 21.846a5.999 5.999 0 013.246 4.07l11.204 49.089a6.003 6.003 0 01-1.158 5.076l-31.393 39.365a6 6 0 01-4.691 2.26h-50.35a6 6 0 01-4.692-2.26L38.99 116.958a6 6 0 01-1.158-5.076l11.204-49.088a6 6 0 013.246-4.07l45.364-21.847a6.001 6.001 0 015.207 0z"
          stroke="url(#prefix__paint3_linear_217_8)"
          strokeWidth={6}
        />
      </g>
      <path
        d="M100.023 102.573H79.938l1.17-8.19 22.815-28.6h10.66l-4.03 28.6h5.915l-1.17 8.19h-5.915l-1.235 9.23h-9.36l1.235-9.23zm3.38-24.05h-.13l-12.415 15.86h10.335l2.21-15.86zM82.635 116.767h2.652l-1.343 9.588h4.913l-.34 2.448h-7.565l1.683-12.036zm15.03 10.608a4.876 4.876 0 01-1.717 1.207 4.99 4.99 0 01-1.99.425 4.858 4.858 0 01-1.75-.306 3.667 3.667 0 01-1.343-.867 3.68 3.68 0 01-.782-1.377c-.159-.533-.193-1.128-.102-1.785.09-.658.289-1.253.595-1.785a5.033 5.033 0 011.173-1.36 5.02 5.02 0 011.58-.884 5.574 5.574 0 011.837-.306c.59 0 1.11.102 1.564.306.453.204.822.498 1.105.884.283.374.476.827.578 1.36.113.532.124 1.127.034 1.785l-.12.799h-5.915c.034.487.198.878.493 1.173.306.283.708.425 1.207.425.42 0 .782-.091 1.088-.272.317-.193.606-.437.867-.731l1.598 1.309zm-1.65-3.638c.069-.431-.022-.799-.271-1.105-.25-.306-.606-.459-1.071-.459a2.038 2.038 0 00-1.36.493c-.17.136-.312.3-.425.493a1.834 1.834 0 00-.238.578h3.366zm3.694-3.196h2.754l1.292 5.61h.034l2.737-5.61h2.567l-4.42 8.262h-2.703l-2.261-8.262zm17.164 6.834a4.873 4.873 0 01-1.717 1.207 4.989 4.989 0 01-1.989.425 4.857 4.857 0 01-1.751-.306 3.666 3.666 0 01-1.343-.867 3.684 3.684 0 01-.782-1.377c-.159-.533-.193-1.128-.102-1.785a4.884 4.884 0 01.595-1.785 5.02 5.02 0 011.173-1.36c.465-.386.992-.68 1.581-.884a5.57 5.57 0 011.836-.306c.589 0 1.111.102 1.564.306.453.204.822.498 1.105.884.283.374.476.827.578 1.36.113.532.125 1.127.034 1.785l-.119.799h-5.916c.034.487.198.878.493 1.173.306.283.708.425 1.207.425.419 0 .782-.091 1.088-.272.317-.193.606-.437.867-.731l1.598 1.309zm-1.649-3.638c.068-.431-.023-.799-.272-1.105-.249-.306-.606-.459-1.071-.459a2.04 2.04 0 00-1.36.493c-.17.136-.312.3-.425.493a1.832 1.832 0 00-.238.578h3.366zm5.24-7.786h2.55l-1.802 12.852h-2.55l1.802-12.852z"
        fill="#4B4B4B"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_217_8"
          x1={132.426}
          y1={167.721}
          x2={68.18}
          y2={32.884}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8797" />
          <stop offset={1} stopColor="#D74559" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_217_8"
          x1={131.055}
          y1={164.851}
          x2={69.544}
          y2={35.756}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF8797" />
          <stop offset={1} stopColor="#D74559" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_217_8"
          x1={100.249}
          y1={32.294}
          x2={100.249}
          y2={168.318}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2D2D2D" />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          id="prefix__paint3_linear_217_8"
          x1={100.249}
          y1={32.294}
          x2={100.249}
          y2={168.318}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#383838" />
          <stop offset={1} stopColor="#0C0C0C" />
        </linearGradient>
        <filter
          id="prefix__filter0_f_217_8"
          x={15.175}
          y={13.612}
          width={170.137}
          height={167.091}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            stdDeviation={6.5}
            result="effect1_foregroundBlur_217_8"
          />
        </filter>
        <filter
          id="prefix__filter1_d_217_8"
          x={30.681}
          y={33.283}
          width={139.136}
          height={136.3}
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
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_217_8" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_217_8"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Level4Badge;
