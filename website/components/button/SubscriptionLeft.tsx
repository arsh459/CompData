import clsx from "clsx";

interface Props {
  text: string;
  classStr?: string;
  onClick?: () => void;
}

const SubscriptionLeft: React.FC<Props> = ({ text, classStr, onClick }) => {
  return (
    <button
      className={clsx(classStr ? classStr : "w-20 h-20 text-xs")}
      onClick={onClick}
    >
      <div className="w-full h-full relative z-0">
        <svg className="w-full h-full" viewBox="0 0 74 74" fill="none">
          <g filter="url(#prefix__filter0_b_308_10)">
            <circle cx={37} cy={37} r={31} fill="#D34B5E" fillOpacity={0.8} />
            <circle cx={37} cy={37} r={30.5} stroke="#FFADAD" />
          </g>
          <g className="rippleCircleAnimation">
            <g filter="url(#prefix__filter1_b_308_10)">
              <circle cx={37} cy={37} r={33.5} stroke="#FFADAD" />
            </g>
            <g filter="url(#prefix__filter2_b_308_10)">
              <circle
                cx={37}
                cy={37}
                r={36.75}
                stroke="#FFADAD"
                strokeWidth={0.5}
              />
            </g>
          </g>
          <defs>
            <filter
              id="prefix__filter0_b_308_10"
              x={2}
              y={2}
              width={70}
              height={70}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImage" stdDeviation={2} />
              <feComposite
                in2="SourceAlpha"
                operator="in"
                result="effect1_backgroundBlur_308_10"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_backgroundBlur_308_10"
                result="shape"
              />
            </filter>
            <filter
              id="prefix__filter1_b_308_10"
              x={-1}
              y={-1}
              width={76}
              height={76}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImage" stdDeviation={2} />
              <feComposite
                in2="SourceAlpha"
                operator="in"
                result="effect1_backgroundBlur_308_10"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_backgroundBlur_308_10"
                result="shape"
              />
            </filter>
            <filter
              id="prefix__filter2_b_308_10"
              x={-4}
              y={-4}
              width={82}
              height={82}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImage" stdDeviation={2} />
              <feComposite
                in2="SourceAlpha"
                operator="in"
                result="effect1_backgroundBlur_308_10"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_backgroundBlur_308_10"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <div className="absolute inset-2.5 z-10 flex justify-center items-center">
          <p className="text-white font-bold text-center">{text}</p>
        </div>
      </div>
    </button>
  );
};

export default SubscriptionLeft;
