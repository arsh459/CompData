import { format } from "date-fns";

interface Props {
  gameStarts?: number;
}

const now = Date.now();

const TrialPeriod: React.FC<Props> = ({ gameStarts }) => {
  return (
    <div>
      {gameStarts && gameStarts > now ? (
        <div className="w-full pt-2">
          <p className="text-center text-xl font-semibold text-gray-700">
            Game starts {`${format(new Date(gameStarts), "hh:mmaaa dd MMM")}`}
          </p>
          <p className="text-center text-gray-500 text-lg">Trial tasks below</p>
        </div>
      ) : null}
    </div>
  );
};

export default TrialPeriod;
