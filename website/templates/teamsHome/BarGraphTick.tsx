interface Props {
  props: any;
}

const BarGraphTick: React.FC<Props> = ({ props }) => {
  const { x, y, payload } = props;

  return (
    <foreignObject x={x - 14} y={y} width={28} height={28}>
      <div className="w-full h-full bg-[#999999]/30 rounded-full flex justify-center items-center">
        <span className="text-xs text-white/60">{payload.value}</span>
      </div>
    </foreignObject>
  );
};

export default BarGraphTick;
