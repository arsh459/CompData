import { badgeTypes } from "@models/Prizes/PrizeV2";

interface Props {
  badgeType: badgeTypes;
  effect?: "spin" | "ripple" | "glow";
  color: {
    color1: string;
    color2: string;
  };
}

const RankBadge: React.FC<Props> = ({ badgeType, effect, color }) => {
  return (
    <svg className="w-full h-full" viewBox="-10 -2 160 160" fill="none">
      <path
        d="M76.75 147.526a13.503 13.503 0 01-13.5 0l-50.086-28.918a13.499 13.499 0 01-6.75-11.691V49.083a13.5 13.5 0 016.75-11.691L63.25 8.474a13.5 13.5 0 0113.5 0l50.086 28.918a13.5 13.5 0 016.75 11.69v57.835c0 4.823-2.573 9.28-6.75 11.691L76.75 147.526z"
        stroke={`url(#prefix__paint0_linear_${badgeType})`}
        strokeWidth={1.5}
        style={{
          transformOrigin: "42% 42%",
          animation:
            effect === "spin"
              ? "spinBadge 5s linear 500ms infinite"
              : effect === "ripple"
              ? "rippleBadge 2s linear infinite"
              : "",
        }}
      />
      <path
        d="M76.875 150.742a13.751 13.751 0 01-13.75 0l-52.684-30.417a13.75 13.75 0 01-6.875-11.908V47.583a13.75 13.75 0 016.875-11.908L63.125 5.258a13.75 13.75 0 0113.75 0l52.684 30.417a13.75 13.75 0 016.875 11.908v60.834c0 4.912-2.621 9.452-6.875 11.908l-52.684 30.417z"
        stroke={`url(#prefix__paint0_linear_${badgeType})`}
        strokeWidth={1}
        style={{
          transformOrigin: "42% 42%",
          animation:
            effect === "spin"
              ? "spinBadge 5s linear 275ms infinite"
              : effect === "ripple"
              ? "rippleBadge 2s linear infinite"
              : "",
        }}
      />
      <path
        d="M76.95 153.872a13.9 13.9 0 01-13.9 0L7.768 121.955a13.9 13.9 0 01-6.95-12.038V46.083a13.9 13.9 0 016.95-12.038L63.05 2.128a13.9 13.9 0 0113.9 0l55.282 31.917a13.9 13.9 0 016.95 12.038v63.834a13.9 13.9 0 01-6.95 12.038L76.95 153.872z"
        stroke={`url(#prefix__paint0_linear_${badgeType})`}
        strokeOpacity={0.9}
        strokeWidth={0.5}
        style={{
          transformOrigin: "42% 42%",
          animation:
            effect === "spin"
              ? "spinBadge 5s linear 0ms infinite"
              : effect === "ripple"
              ? "rippleBadge 2s linear infinite"
              : "",
        }}
      />
      <path
        d="M74.5 145.402a8.999 8.999 0 01-9 0l-51.622-29.804a9 9 0 01-4.5-7.794V48.196a9 9 0 014.5-7.794L65.5 10.598a9 9 0 019 0l51.622 29.804a9.001 9.001 0 014.5 7.794v59.608a9.002 9.002 0 01-4.5 7.794L74.5 145.402z"
        fill={`url(#prefix__paint0_linear_${badgeType})`}
      />
      <g filter={`url(#prefix__filter0_i_${badgeType})`}>
        <path
          d="M65.5 13.598a9 9 0 019 0l49.024 28.304a9.001 9.001 0 014.5 7.794v56.608a9.002 9.002 0 01-4.5 7.794L74.5 142.402a8.999 8.999 0 01-9 0l-49.024-28.304a9 9 0 01-4.5-7.794V49.696a9 9 0 014.5-7.794L65.5 13.598z"
          fill={`url(#prefix__paint1_linear_${badgeType})`}
        />
        <path
          d="M67 16.196a6 6 0 016 0L122.024 44.5a6 6 0 013 5.196v56.608a6.002 6.002 0 01-3 5.196L73 139.804a5.999 5.999 0 01-6 0L17.976 111.5a6 6 0 01-3-5.196V49.696a6 6 0 013-5.196L67 16.196z"
          stroke={`url(#prefix__paint2_linear_${badgeType})`}
          strokeWidth={6}
        />
      </g>
      <path
        d="M98.213 82.486h-11.78l8.589-8.88h14.649l-6.681 6.85a6.672 6.672 0 01-4.777 2.03zM43.465 73.61h11.783l-8.59 8.881H32l6.682-6.85a6.671 6.671 0 014.783-2.03z"
        fill={color.color1}
      />
      <path
        d="M54.861 73.61H96.43L87.3 82.489H45.883l8.978-8.877zM57.317 67.983H43.636l5.392-5.61a8.974 8.974 0 016.47-2.78h9.952l-8.133 8.39zM80.114 59.593h13.688l-5.392 5.61a8.976 8.976 0 01-6.468 2.78h-9.955l8.127-8.39z"
        fill={color.color1}
      />
      <path
        d="M65.442 59.593H80.11l-8.127 8.39H57.315l8.127-8.39zM66.296 54.127H56.16l5.393-5.432a9.116 9.116 0 016.47-2.694h9.952l-5.62 5.619a8.552 8.552 0 01-6.06 2.507zM84.36 88.502h13.688l-5.392 5.61a8.977 8.977 0 01-6.458 2.78h-9.97l8.133-8.39zM61.564 96.892H47.876l5.392-5.61a8.975 8.975 0 016.468-2.78h9.955l-8.127 8.39z"
        fill={color.color1}
      />
      <path
        d="M76.23 96.89H61.562l8.127-8.388h14.668l-8.127 8.387zM75.376 102.355h10.142l-5.393 5.432a9.117 9.117 0 01-6.467 2.695h-9.955l5.62-5.622a8.573 8.573 0 016.053-2.505z"
        fill={color.color1}
      />
      <defs>
        <linearGradient
          id={`prefix__paint0_linear_${badgeType}`}
          x1={70}
          y1={148}
          x2={70}
          y2={8}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color.color2} />
          <stop offset={1} stopColor={color.color1} />
        </linearGradient>
        <linearGradient
          id={`prefix__paint1_linear_${badgeType}`}
          x1={70}
          y1={11}
          x2={70}
          y2={145}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2D2D2D" />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          id={`prefix__paint2_linear_${badgeType}`}
          x1={70}
          y1={11}
          x2={70}
          y2={145}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#383838" />
          <stop offset={1} stopColor="#0C0C0C" />
        </linearGradient>
        <filter
          id={`prefix__filter0_i_${badgeType}`}
          x={11.976}
          y={12.392}
          width={116.048}
          height={135.216}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_205_42" />
        </filter>
      </defs>
    </svg>
  );
};

export default RankBadge;
