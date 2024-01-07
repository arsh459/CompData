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

const Level1Badge: React.FC<Props> = ({ badgeType, effect, color }) => {
  return (
    <svg className="w-full h-full" viewBox="0 0 163 163" fill="none">
      <g
        filter="url(#prefix__filter0_f_216_42)"
        className={clsx(
          "transition-opacity",
          effect === "glow" ? "opacity-100" : "opacity-0"
        )}
      >
        <path
          d="M87.864 146.636a9 9 0 01-12.728 0L16.364 87.864a9 9 0 010-12.728l58.772-58.772a9 9 0 0112.728 0l58.772 58.772a9 9 0 010 12.728l-58.772 58.772z"
          fill="url(#prefix__paint0_linear_216_42)"
        />
      </g>
      <path
        d="M87.864 146.636a9 9 0 01-12.728 0L16.364 87.864a9 9 0 010-12.728l58.772-58.772a9 9 0 0112.728 0l58.772 58.772a9 9 0 010 12.728l-58.772 58.772z"
        fill="url(#prefix__paint1_linear_216_42)"
      />
      <g filter="url(#prefix__filter1_d_216_42)">
        <path
          d="M75.135 19.852a9 9 0 0112.728 0l55.284 55.284a9 9 0 010 12.728l-55.284 55.284a9 9 0 01-12.728 0L19.851 87.864a9 9 0 010-12.728l55.284-55.284z"
          fill="url(#prefix__paint2_linear_216_42)"
        />
        <path
          d="M85.742 21.973l55.284 55.284a6 6 0 010 8.486l-55.284 55.284a6 6 0 01-8.486 0L21.972 85.743a6 6 0 010-8.486l55.284-55.284a6 6 0 018.486 0z"
          stroke="url(#prefix__paint3_linear_216_42)"
          strokeWidth={6}
        />
      </g>
      <path
        d="M81.595 57.9L71.26 66.025l-4.615-6.37 16.77-12.675h9.1L86.08 93h-9.36l4.875-35.1zM64.492 97.964h2.652l-1.343 9.588h4.913l-.34 2.448H62.81l1.683-12.036zm15.03 10.608a4.864 4.864 0 01-1.717 1.207 4.992 4.992 0 01-1.989.425 4.857 4.857 0 01-1.75-.306 3.665 3.665 0 01-1.344-.867 3.663 3.663 0 01-.782-1.377c-.158-.533-.192-1.128-.102-1.785.09-.657.29-1.252.595-1.785a5.03 5.03 0 011.173-1.36c.465-.385.992-.68 1.581-.884a5.573 5.573 0 011.836-.306c.59 0 1.11.102 1.564.306.454.204.822.499 1.105.884.284.374.476.827.578 1.36.114.533.125 1.128.034 1.785l-.119.799H74.27c.034.487.199.878.493 1.173.306.283.709.425 1.207.425.42 0 .782-.091 1.088-.272.318-.193.607-.436.867-.731l1.598 1.309zm-1.649-3.638c.068-.431-.022-.799-.272-1.105-.25-.306-.606-.459-1.07-.459a2.037 2.037 0 00-1.36.493c-.17.136-.312.3-.426.493a1.83 1.83 0 00-.238.578h3.366zm3.693-3.196h2.754l1.292 5.61h.034l2.737-5.61h2.567L86.53 110h-2.703l-2.261-8.262zm17.164 6.834a4.864 4.864 0 01-1.717 1.207 4.992 4.992 0 01-1.989.425 4.857 4.857 0 01-1.75-.306 3.665 3.665 0 01-1.344-.867 3.663 3.663 0 01-.782-1.377c-.158-.533-.192-1.128-.102-1.785.09-.657.29-1.252.595-1.785a5.03 5.03 0 011.173-1.36c.465-.385.992-.68 1.581-.884a5.573 5.573 0 011.836-.306c.59 0 1.11.102 1.564.306.454.204.822.499 1.105.884.284.374.476.827.578 1.36.114.533.125 1.128.034 1.785l-.119.799h-5.916c.034.487.199.878.493 1.173.306.283.709.425 1.207.425.42 0 .782-.091 1.088-.272.318-.193.607-.436.867-.731l1.598 1.309zm-1.649-3.638c.068-.431-.022-.799-.272-1.105-.25-.306-.606-.459-1.07-.459a2.037 2.037 0 00-1.36.493c-.17.136-.312.3-.426.493a1.83 1.83 0 00-.238.578h3.366zm5.24-7.786h2.55L103.069 110h-2.55l1.802-12.852z"
        fill="#4B4B4B"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_216_42"
          x1={81.5}
          y1={153}
          x2={81.5}
          y2={10}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#89C3CE" />
          <stop offset={1} stopColor="#61C5D9" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_216_42"
          x1={81.5}
          y1={153}
          x2={81.5}
          y2={10}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#89C3CE" />
          <stop offset={1} stopColor="#61C5D9" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_216_42"
          x1={81.499}
          y1={13.488}
          x2={81.499}
          y2={149.512}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2D2D2D" />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          id="prefix__paint3_linear_216_42"
          x1={81.499}
          y1={13.488}
          x2={81.499}
          y2={149.512}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#383838" />
          <stop offset={1} stopColor="#0C0C0C" />
        </linearGradient>
        <filter
          id="prefix__filter0_f_216_42"
          x={0.728}
          y={0.728}
          width={161.544}
          height={161.544}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            stdDeviation={6.5}
            result="effect1_foregroundBlur_216_42"
          />
        </filter>
        <filter
          id="prefix__filter1_d_216_42"
          x={13.215}
          y={17.216}
          width={136.568}
          height={136.568}
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
            result="effect1_dropShadow_216_42"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_216_42"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Level1Badge;
