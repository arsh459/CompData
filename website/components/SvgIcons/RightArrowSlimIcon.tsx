interface Props {
  color?: string;
}

const RightArrowSlimIcon: React.FC<Props> = ({ color }) => {
  return (
    <svg className="w-full h-full" viewBox="0 0 9 19" fill="none">
      <path
        d="M1.783.376l6.989 8.422a.91.91 0 01.176.326c.035.117.052.242.052.376s-.017.259-.052.376a.909.909 0 01-.176.326l-6.989 8.447a.905.905 0 01-.725.351c-.29 0-.54-.125-.747-.376A1.335 1.335 0 010 17.747c0-.334.104-.627.311-.878L6.408 9.5.31 2.13c-.193-.233-.29-.521-.29-.864 0-.343.103-.64.31-.89C.54.126.782 0 1.059 0c.276 0 .518.125.725.376z"
        fill={color ? color : "#FFF"}
      />
    </svg>
  );
};

export default RightArrowSlimIcon;
