interface Props {
  starts?: number;
  ends?: number;
}

const now = Date.now();

const PrizeTime: React.FC<Props> = ({ starts, ends }) => {
  return (
    <div>
      {starts && starts > now ? (
        <>
          <p className="text-gray-500 text-center font-semibold text-xs">{`Starts ${new Date(
            starts
          ).toLocaleString("default", {
            month: "short",
            hour: "numeric",
            day: "numeric",
            hour12: true,
            minute: "2-digit",
          })}`}</p>
        </>
      ) : ends && ends < now ? (
        <p className="text-gray-700 text-center font-semibold text-xs">{`Finished ${new Date(
          ends
        ).toLocaleString("default", {
          month: "short",
          hour: "numeric",
          day: "numeric",
          hour12: true,
          minute: "2-digit",
        })}`}</p>
      ) : starts && ends && now > starts && now < ends ? (
        <p className="text-orange-500 text-center font-semibold text-xs">{`Ends ${new Date(
          ends
        ).toLocaleString("default", {
          month: "short",
          hour: "numeric",
          day: "numeric",
          hour12: true,
          minute: "2-digit",
        })}`}</p>
      ) : null}
    </div>
  );
};

export default PrizeTime;
