import { badgeTypes } from "@models/Prizes/Prizes";
import Svg, { Defs, G, LinearGradient, Path, Stop } from "react-native-svg";

interface Props {
  effect?: "spin" | "ripple" | "glow";
  badgeType: badgeTypes;
  color: {
    color1: string;
    color2: string;
  };
}

const RankBadgeMonthly: React.FC<Props> = ({ badgeType, effect, color }) => {
  return (
    <Svg className="w-full h-full" viewBox="30 30 158 158" fill="none">
      <Path
        d="M79.35 168.371a8.5 8.5 0 01-7.361-4.25l-29.54-51.164a8.5 8.5 0 010-8.5l29.54-51.163a8.5 8.5 0 017.361-4.25h59.079a8.501 8.501 0 017.361 4.25l29.539 51.163a8.502 8.502 0 010 8.5l-29.539 51.164a8.501 8.501 0 01-7.361 4.25H79.35z"
        fill={`url(#prefix__paint0_linear_${badgeType})`}
        stroke={`url(#prefix__paint0_linear_${badgeType})`}
      />
      <Path
        d="M77.935 171.193a8.5 8.5 0 01-7.362-4.25l-31.205-54.05a8.5 8.5 0 010-8.5l31.205-54.05a8.5 8.5 0 017.362-4.25h62.411a8.5 8.5 0 017.361 4.25l31.206 54.05a8.502 8.502 0 010 8.5l-31.206 54.05a8.499 8.499 0 01-7.361 4.25H77.935z"
        stroke={`url(#prefix__paint0_linear_${badgeType})`}
        strokeWidth={1.5}
      />
      <Path
        d="M75.992 174.302a8.749 8.749 0 01-7.578-4.375l-32.785-56.784a8.75 8.75 0 010-8.75l32.785-56.785a8.75 8.75 0 017.577-4.375h65.57a8.75 8.75 0 017.578 4.375l32.784 56.785a8.75 8.75 0 010 8.75l-32.784 56.784a8.749 8.749 0 01-7.578 4.375h-65.57z"
        stroke={`url(#prefix__paint0_linear_${badgeType})`}
        strokeWidth={1}
      />
      <Path
        d="M74.184 177.706a8.9 8.9 0 01-7.708-4.45l-34.634-59.988a8.9 8.9 0 010-8.9L66.476 44.38a8.9 8.9 0 017.708-4.45h69.268a8.9 8.9 0 017.708 4.45l34.634 59.988a8.904 8.904 0 010 8.9l-34.634 59.988a8.9 8.9 0 01-7.708 4.45H74.184z"
        stroke={`url(#prefix__paint0_linear_${badgeType})`}
        strokeOpacity={0.9}
        strokeWidth={0.5}
      />
      <Path
        d="M113.066 175.968a8.502 8.502 0 01-8.5 0l-51.621-29.804a8.501 8.501 0 01-4.25-7.361V79.195a8.5 8.5 0 014.25-7.361l51.621-29.804a8.5 8.5 0 018.5 0l51.622 29.804a8.5 8.5 0 014.25 7.36v59.609a8.501 8.501 0 01-4.25 7.361l-51.622 29.804z"
        fill={`url(#prefix__paint0_linear_${badgeType}`}
        stroke={`url(#prefix__paint0_linear_${badgeType}`}
      />
      <G>
        <Path
          d="M104.316 44.599a9 9 0 019 0l49.024 28.303a9 9 0 014.5 7.795v56.607a9 9 0 01-4.5 7.795l-49.024 28.303a8.999 8.999 0 01-9 0l-49.023-28.303a9 9 0 01-4.5-7.795V80.697a9 9 0 014.5-7.795L104.316 44.6z"
          fill={`url(#prefix__paint1_linear_${badgeType}`}
        />
        <Path
          d="M105.816 47.197a6 6 0 016 0L160.84 75.5a5.999 5.999 0 013 5.197v56.607a5.997 5.997 0 01-3 5.196l-49.024 28.304a5.999 5.999 0 01-6 0L56.793 142.5a5.998 5.998 0 01-3-5.196V80.697a6 6 0 013-5.197l49.023-28.303z"
          stroke={`url(#prefix__paint2_linear_${badgeType}`}
          strokeWidth={6}
        />
      </G>
      <Path
        d="M136.028 113.485h-11.78l8.589-8.881h14.65l-6.682 6.85a6.663 6.663 0 01-4.777 2.031zM81.281 104.609h11.783l-8.59 8.881H69.817l6.682-6.85a6.679 6.679 0 014.783-2.031z"
        fill={color.color1}
      />
      <Path
        d="M92.676 104.609h41.569l-9.128 8.878H83.698l8.978-8.878zM95.133 98.982H81.45l5.393-5.61a8.975 8.975 0 016.47-2.78h9.952l-8.133 8.39zM117.931 90.591h13.687l-5.392 5.61a8.97 8.97 0 01-6.467 2.78h-9.955l8.127-8.39z"
        fill={color.color1}
      />
      <Path
        d="M103.258 90.591h14.667l-8.127 8.39H95.131l8.127-8.39zM104.111 85.126H93.976l5.392-5.432a9.107 9.107 0 016.47-2.695h9.952l-5.619 5.62a8.546 8.546 0 01-6.06 2.507zM122.176 119.501h13.688l-5.393 5.609a8.973 8.973 0 01-6.458 2.781h-9.97l8.133-8.39zM99.38 127.891H85.69l5.393-5.61a8.985 8.985 0 016.467-2.78h9.955l-8.127 8.39z"
        fill={color.color1}
      />
      <Path
        d="M114.046 127.888H99.378l8.127-8.387h14.667l-8.126 8.387zM113.192 133.353h10.142l-5.392 5.432a9.104 9.104 0 01-6.467 2.695h-9.955l5.619-5.622a8.574 8.574 0 016.053-2.505z"
        fill={color.color1}
      />
      <Defs>
        <LinearGradient
          id={`prefix__paint0_linear_${badgeType}`}
          x1={108.816}
          y1={178.999}
          x2={108.816}
          y2={38.999}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color.color2} />
          <Stop offset={1} stopColor={color.color1} />
        </LinearGradient>
        <LinearGradient
          id={`prefix__paint1_linear_${badgeType}`}
          x1={108.816}
          y1={42.001}
          x2={108.816}
          y2={176}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2D2D2D" />
          <Stop offset={1} />
        </LinearGradient>
        <LinearGradient
          id={`prefix__paint2_linear_${badgeType}`}
          x1={108.816}
          y1={42.001}
          x2={108.816}
          y2={176}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#383838" />
          <Stop offset={1} stopColor="#0C0C0C" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default RankBadgeMonthly;
