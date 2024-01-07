interface Props {
  color?: string;
  percent?: number;
}

const HexaPercentIcon: React.FC<Props> = ({ color, percent = 80 }) => {
  // Calculate the stroke opacity based on the provided percent value
  const strokeOpacity = (100 - percent) / 100;
  return (
    <svg
      className="w-full h-full"
      fill="none"
      viewBox="0 0 30 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#prefix__filter0_b_5685_8384)">
        <path
          d="M11.78 1.86c1.185-.685 1.778-1.027 2.409-1.158a4 4 0 011.622 0c.631.13 1.224.473 2.409 1.157l7.416 4.282c1.186.684 1.778 1.026 2.207 1.507a4 4 0 01.811 1.405c.202.612.202 1.296.202 2.665v8.564c0 1.369 0 2.053-.202 2.665a4 4 0 01-.811 1.405c-.429.48-1.021.823-2.207 1.507l-7.416 4.282c-1.185.684-1.778 1.026-2.409 1.157a4 4 0 01-1.622 0c-.631-.13-1.224-.473-2.409-1.157l-7.416-4.282c-1.186-.684-1.778-1.026-2.207-1.508a4 4 0 01-.811-1.404c-.202-.612-.202-1.296-.202-2.665v-8.564c0-1.368 0-2.053.202-2.665a4 4 0 01.811-1.405c.429-.48 1.021-.823 2.207-1.507l7.416-4.282z"
          fill="url(#prefix__paint0_linear_5685_8384)"
        />
        <path
          d="M11.78 1.86c1.185-.685 1.778-1.027 2.409-1.158a4 4 0 011.622 0c.631.13 1.224.473 2.409 1.157l7.416 4.282c1.186.684 1.778 1.026 2.207 1.507a4 4 0 01.811 1.405c.202.612.202 1.296.202 2.665v8.564c0 1.369 0 2.053-.202 2.665a4 4 0 01-.811 1.405c-.429.48-1.021.823-2.207 1.507l-7.416 4.282c-1.185.684-1.778 1.026-2.409 1.157a4 4 0 01-1.622 0c-.631-.13-1.224-.473-2.409-1.157l-7.416-4.282c-1.186-.684-1.778-1.026-2.207-1.508a4 4 0 01-.811-1.404c-.202-.612-.202-1.296-.202-2.665v-8.564c0-1.368 0-2.053.202-2.665a4 4 0 01.811-1.405c.429-.48 1.021-.823 2.207-1.507l7.416-4.282z"
          stroke="#fff"
          strokeOpacity={strokeOpacity}
        />
        <path
          d="M11.78 1.86c1.185-.685 1.778-1.027 2.409-1.158a4 4 0 011.622 0c.631.13 1.224.473 2.409 1.157l7.416 4.282c1.186.684 1.778 1.026 2.207 1.507a4 4 0 01.811 1.405c.202.612.202 1.296.202 2.665v8.564c0 1.369 0 2.053-.202 2.665a4 4 0 01-.811 1.405c-.429.48-1.021.823-2.207 1.507l-7.416 4.282c-1.185.684-1.778 1.026-2.409 1.157a4 4 0 01-1.622 0c-.631-.13-1.224-.473-2.409-1.157l-7.416-4.282c-1.186-.684-1.778-1.026-2.207-1.508a4 4 0 01-.811-1.404c-.202-.612-.202-1.296-.202-2.665v-8.564c0-1.368 0-2.053.202-2.665a4 4 0 01.811-1.405c.429-.48 1.021-.823 2.207-1.507l7.416-4.282z"
          stroke="url(#prefix__paint1_angular_5685_8384)"
        />
      </g>
      <defs>
        <radialGradient
          id="prefix__paint1_angular_5685_8384"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 16 -16 0 15 16)"
        >
          <stop offset={0.368} stopColor={color ? color : "#FFFFFF"} />
          <stop
            offset={0.371}
            stopColor={color ? color : "#FFFFFF"}
            stopOpacity={0}
          />
          <stop
            offset={0.5}
            stopColor={color ? color : "#FFFFFF"}
            stopOpacity={0}
          />
          <stop offset={0.502} stopColor={color ? color : "#FFFFFF"} />
        </radialGradient>
        <linearGradient
          id="prefix__paint0_linear_5685_8384"
          x1={11.318}
          y1={0.635}
          x2={15}
          y2={32}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6D55D1" />
          <stop offset={1} stopColor="#6745F5" />
        </linearGradient>
        <filter
          id="prefix__filter0_b_5685_8384"
          x={-11.359}
          y={-11.883}
          width={52.719}
          height={55.766}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation={6} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_5685_8384"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_5685_8384"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default HexaPercentIcon;
