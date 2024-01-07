interface Props {
  color?: string;
  opacity?: number;
}

const TripleArrowRightIcon: React.FC<Props> = ({ color, opacity }) => {
  return (
    <svg className="w-full h-full" viewBox="0 0 23 18" fill="none">
      <g
        clipPath="url(#prefix__clip0_5385_6970)"
        fill={color ? color : "#fff"}
        fillOpacity={opacity ? opacity : 1}
      >
        <path d="M2.783 1.336l6.989 7.536c.083.09.141.187.176.292.035.104.052.216.052.336 0 .12-.017.232-.052.336a.791.791 0 01-.176.292l-6.989 7.558a.948.948 0 01-.725.314.981.981 0 01-.747-.336A1.12 1.12 0 011 16.879c0-.3.104-.561.311-.785L7.408 9.5 1.31 2.906a1.096 1.096 0 01-.29-.773c0-.307.103-.572.31-.797.208-.224.45-.336.727-.336.276 0 .518.112.725.336z" />
        <path d="M9.585 1.336l6.212 7.536c.074.09.126.187.156.292.032.104.047.216.047.336 0 .12-.015.232-.046.336a.813.813 0 01-.157.292l-6.212 7.558A.802.802 0 018.94 18c-.258 0-.48-.112-.663-.336A1.2 1.2 0 018 16.879c0-.3.092-.561.277-.785L13.695 9.5l-5.42-6.594a1.178 1.178 0 01-.258-.773c0-.307.093-.572.277-.797.184-.224.4-.336.645-.336.246 0 .46.112.645.336z" />
        <path d="M15.783 1.336l6.989 7.536a.79.79 0 01.176.292c.035.104.052.216.052.336 0 .12-.017.232-.052.336a.79.79 0 01-.176.292l-6.989 7.558a.947.947 0 01-.725.314.981.981 0 01-.747-.336 1.12 1.12 0 01-.311-.785c0-.3.104-.561.311-.785L20.408 9.5 14.31 2.906a1.096 1.096 0 01-.29-.773c0-.307.103-.572.31-.797.208-.224.45-.336.727-.336.276 0 .518.112.725.336z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0_5385_6970">
          <path
            d="M0 0h23v18H0z"
            fill={color ? color : "#fff"}
            fillOpacity={opacity ? opacity : 1}
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TripleArrowRightIcon;
