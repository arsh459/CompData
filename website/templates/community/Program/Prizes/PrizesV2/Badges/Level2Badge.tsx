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

const Level2Badge: React.FC<Props> = ({ badgeType, effect, color }) => {
  return (
    <svg className="w-full h-full" viewBox="20 15 162 162" fill="none">
      <g
        filter="url(#prefix__filter0_f_216_70)"
        className={clsx(
          "transition-opacity",
          effect === "glow" ? "opacity-100" : "opacity-0"
        )}
      >
        <path
          d="M65.752 160.059a9 9 0 01-8.649-6.094L33.84 85.743a9 9 0 013.124-10.108l57.694-43.207a9 9 0 0110.579-.153l58.919 41.519a9 9 0 013.415 10.014l-21.279 68.866a9 9 0 01-8.469 6.342l-72.071 1.043z"
          fill="url(#prefix__paint0_linear_216_70)"
        />
      </g>
      <path
        d="M65.853 158.983a9 9 0 01-8.649-6.094L34.297 85.712a9 9 0 013.124-10.109l56.81-42.545a9 9 0 0110.58-.153l58.018 40.883a9 9 0 013.414 10.014l-20.953 67.812a9 9 0 01-8.469 6.342l-70.968 1.027z"
        fill="url(#prefix__paint1_linear_216_70)"
      />
      <g filter="url(#prefix__filter1_d_216_70)">
        <path
          d="M95.216 36.46a9 9 0 0110.581 0L159.9 75.766a9 9 0 013.269 10.063l-20.665 63.602a9.001 9.001 0 01-8.56 6.219H67.069a9 9 0 01-8.56-6.219L37.844 85.83a9 9 0 013.27-10.063L95.215 36.46z"
          fill="url(#prefix__paint2_linear_216_70)"
        />
        <path
          d="M104.033 38.886l54.104 39.309a6.001 6.001 0 012.179 6.708l-20.665 63.602a6.001 6.001 0 01-5.707 4.146H67.069a6 6 0 01-5.707-4.146L40.697 84.903a6 6 0 012.18-6.709L96.98 38.887a6 6 0 017.053 0z"
          stroke="url(#prefix__paint3_linear_216_70)"
          strokeWidth={6}
        />
      </g>
      <path
        d="M82.615 101.797l20.15-16.055 1.56-1.3a12.17 12.17 0 001.495-1.495 9.384 9.384 0 001.235-1.69 5.19 5.19 0 00.65-1.95c.217-1.56-.173-2.773-1.17-3.64-.997-.91-2.253-1.365-3.77-1.365-1.82 0-3.315.563-4.485 1.69-1.17 1.126-1.928 2.513-2.275 4.16l-9.685-.715c.477-2.383 1.278-4.442 2.405-6.175 1.127-1.777 2.47-3.25 4.03-4.42 1.603-1.17 3.402-2.037 5.395-2.6 2.037-.607 4.182-.91 6.435-.91 2.08 0 3.987.303 5.72.91 1.733.563 3.185 1.43 4.355 2.6 1.17 1.127 2.015 2.556 2.535 4.29.52 1.733.628 3.748.325 6.045-.433 2.947-1.343 5.373-2.73 7.28-1.387 1.863-3.077 3.553-5.07 5.07l-15.665 12.025h20.41l-1.17 8.58h-32.11l1.43-10.335zM80.492 117.096h2.652l-1.343 9.588h4.913l-.34 2.448H78.81l1.683-12.036zm15.03 10.608a4.864 4.864 0 01-1.717 1.207 4.992 4.992 0 01-1.989.425 4.857 4.857 0 01-1.75-.306 3.665 3.665 0 01-1.344-.867 3.663 3.663 0 01-.782-1.377c-.158-.533-.192-1.128-.102-1.785.09-.657.29-1.252.595-1.785a5.03 5.03 0 011.173-1.36c.465-.385.992-.68 1.581-.884a5.573 5.573 0 011.836-.306c.59 0 1.11.102 1.564.306.454.204.822.499 1.105.884.284.374.476.827.578 1.36.114.533.125 1.128.034 1.785l-.119.799H90.27c.034.487.199.878.493 1.173.306.283.709.425 1.207.425.42 0 .782-.091 1.088-.272.318-.193.607-.436.867-.731l1.598 1.309zm-1.649-3.638c.068-.431-.022-.799-.272-1.105-.25-.306-.606-.459-1.07-.459a2.037 2.037 0 00-1.36.493c-.17.136-.312.3-.426.493a1.83 1.83 0 00-.238.578h3.366zm3.693-3.196h2.754l1.292 5.61h.034l2.737-5.61h2.567l-4.42 8.262h-2.703l-2.261-8.262zm17.164 6.834a4.86 4.86 0 01-1.717 1.207 4.989 4.989 0 01-1.989.425 4.861 4.861 0 01-1.751-.306 3.675 3.675 0 01-1.343-.867 3.669 3.669 0 01-.782-1.377c-.158-.533-.192-1.128-.102-1.785a4.896 4.896 0 01.595-1.785 5.054 5.054 0 011.173-1.36c.465-.385.992-.68 1.581-.884a5.579 5.579 0 011.836-.306c.59 0 1.111.102 1.564.306.454.204.822.499 1.105.884.284.374.476.827.578 1.36.114.533.125 1.128.034 1.785l-.119.799h-5.916c.034.487.199.878.493 1.173.306.283.709.425 1.207.425.42 0 .782-.091 1.088-.272.318-.193.607-.436.867-.731l1.598 1.309zm-1.649-3.638c.068-.431-.022-.799-.272-1.105-.249-.306-.606-.459-1.071-.459a2.04 2.04 0 00-1.36.493c-.17.136-.311.3-.425.493a1.855 1.855 0 00-.238.578h3.366zm5.24-7.786h2.55l-1.802 12.852h-2.55l1.802-12.852z"
        fill="#4B4B4B"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_216_70"
          x1={59.214}
          y1={160.153}
          x2={142.666}
          y2={41.726}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9EA92B" />
          <stop offset={1} stopColor="#CCDB2C" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_216_70"
          x1={59.315}
          y1={159.078}
          x2={141.685}
          y2={42.185}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9EA92B" />
          <stop offset={1} stopColor="#CCDB2C" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_216_70"
          x1={100.507}
          y1={32.616}
          x2={100.507}
          y2={168.64}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2D2D2D" />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          id="prefix__paint3_linear_216_70"
          x1={100.507}
          y1={32.616}
          x2={100.507}
          y2={168.64}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#383838" />
          <stop offset={1} stopColor="#0C0C0C" />
        </linearGradient>
        <filter
          id="prefix__filter0_f_216_70"
          x={23.358}
          y={20.632}
          width={154.615}
          height={149.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            stdDeviation={5}
            result="effect1_foregroundBlur_216_70"
          />
        </filter>
        <filter
          id="prefix__filter1_d_216_70"
          x={33.403}
          y={34.74}
          width={134.208}
          height={128.911}
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
            result="effect1_dropShadow_216_70"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_216_70"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Level2Badge;
