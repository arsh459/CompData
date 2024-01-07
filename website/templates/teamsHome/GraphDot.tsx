interface Props {
  props: any;
  color?: string;
}

const GraphDot: React.FC<Props> = ({ props, color }) => {
  const { cx, cy } = props;

  return (
    <>
      <circle cx={cx} cy={cy} r={8} stroke={color ? color : "#FFFFFF"} />
      <circle cx={cx} cy={cy} r={5} fill={color ? color : "#FFFFFF"} />
      <foreignObject x={cx - 50} y={cy - 50} width={100} height={100}>
        <div className="w-full h-full flex justify-center items-center">
          <div
            className="m-auto h-8 w-8 blur-lg rounded-full"
            style={{ backgroundColor: color ? color : "#FFFFFF" }}
          />
        </div>
      </foreignObject>
    </>
  );
};

export default GraphDot;
