import Loading from "@components/loading/Loading";
import { useFitnessPageParams } from "@hooks/fitness/useFitnessPageParams";

interface Props {}

const FitnessTemplate: React.FC<Props> = ({}) => {
  const { error } = useFitnessPageParams();
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {error ? (
        <p className="text-gray-700 text-3xl">{error}</p>
      ) : (
        <p className="text-gray-700 text-3xl">Connecting your device ...</p>
      )}
      <div className="pt-8">
        <Loading fill="#ff735c" width={48} height={48} />
      </div>
    </div>
  );
};

export default FitnessTemplate;
