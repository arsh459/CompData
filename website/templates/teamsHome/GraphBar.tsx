interface Props {
  props: any;
}

const GraphBar: React.FC<Props> = ({ props }) => {
  const { x, y, width, height, radius, fill } = props;
  console.log(props);

  return (
    <>
      {height > 0 ? (
        <foreignObject x={x} y={y} width={width} height={height}>
          <div
            style={{
              width: width,
              height: height,
              backgroundColor: fill,
              borderRadius: radius,
            }}
          />
        </foreignObject>
      ) : (
        <foreignObject x={x} y={y - 50} width={width} height={50}>
          <div
            style={{
              width: width,
              height: 50,
            }}
          >
            <img
              src={`https://ik.imagekit.io/socialboat/Vector__1__ZDrEQmPvc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655364753644`}
              alt="sleep icon"
            />
            <img
              src={`https://ik.imagekit.io/socialboat/Vector__1__ZDrEQmPvc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655364753644`}
              alt="sleep icon"
              className="my-4 w-2.5"
            />
          </div>
        </foreignObject>
      )}
    </>
  );
};

export default GraphBar;
