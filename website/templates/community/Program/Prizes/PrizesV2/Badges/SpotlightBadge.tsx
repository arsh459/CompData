import { badgeTypes } from "@models/Prizes/PrizeV2";

interface Props {
  effect?: "spin" | "ripple" | "glow";
  badgeType: badgeTypes;
  color: {
    color1: string;
    color2: string;
  };
}

const SpotlightBadge: React.FC<Props> = ({ badgeType, effect, color }) => {
  return (
    <svg className="w-full h-full" viewBox="0 0 162 162" fill="none">
      <circle
        r={71.5}
        transform="matrix(-1 0 0 1 81 81)"
        fill="#fff"
        fillOpacity={0.03}
        stroke="url(#prefix__paint0_linear_220_2)"
        strokeWidth={19}
      />
      <circle
        cx={81}
        cy={81}
        r={74.741}
        fill="url(#prefix__paint1_linear_220_2)"
        stroke="url(#prefix__paint2_linear_220_2)"
        strokeWidth={5}
      />
      <path
        d="M116.848 86.576H101.39l11.271-11.652h19.222l-8.767 8.988a8.745 8.745 0 01-6.268 2.664zM45.01 74.93h15.46L49.2 86.584H29.966l8.767-8.988a8.754 8.754 0 016.276-2.664z"
        fill="#404040"
      />
      <path
        d="M59.963 74.93h54.546L102.531 86.58H48.182L59.963 74.93zM63.187 67.546H45.234l7.076-7.361a11.777 11.777 0 018.49-3.648h13.059L63.187 67.546zM93.1 56.537h17.961l-7.076 7.36a11.773 11.773 0 01-8.486 3.649H82.437L93.1 56.536z"
        fill="#404040"
      />
      <path
        d="M73.848 56.537h19.246L82.431 67.546H63.183l10.664-11.01zM74.967 49.365h-13.3l7.076-7.128a11.962 11.962 0 018.49-3.536h13.06l-7.374 7.373a11.218 11.218 0 01-7.952 3.291zM98.672 94.47h17.961l-7.076 7.362a11.779 11.779 0 01-8.474 3.648H88l10.672-11.01zM68.758 105.48h-17.96l7.075-7.361a11.78 11.78 0 018.486-3.648h13.063L68.758 105.48z"
        fill="#404040"
      />
      <path
        d="M88.003 105.476H68.756L79.42 94.471h19.247l-10.664 11.005zM86.883 112.648h13.308l-7.076 7.128a11.96 11.96 0 01-8.486 3.536H71.566l7.374-7.377a11.251 11.251 0 017.943-3.287z"
        fill="#404040"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_220_2"
          x1={82.5}
          y1={-11}
          x2={81.438}
          y2={166.816}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#600FF5" />
          <stop offset={0.252} stopColor="#E44156" />
          <stop offset={0.499} stopColor="#F4B436" />
          <stop offset={0.755} stopColor="#CCDB2C" />
          <stop offset={1} stopColor="#60C5D9" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_220_2"
          x1={81}
          y1={3.759}
          x2={81}
          y2={158.242}
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset={1} stopColor="#1C1C1C" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_220_2"
          x1={81}
          y1={3.759}
          x2={81}
          y2={158.242}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#202020" />
          <stop offset={1} stopColor="#3A3A3A" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SpotlightBadge;
