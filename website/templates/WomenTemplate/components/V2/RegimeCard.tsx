import { RegimeType } from "@templates/WomenTemplate/utils";
interface Props {
  data: RegimeType;
}
const RegimeCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full aspect-[0.8] p-4 pb-0 rounded-3xl bg-black/25 backdrop-blur-3xl flex flex-col">
      <p className="text-2xl font-popR font-normal text-[#FFFFFF]">
        {data.name}
      </p>
      <p className="text-xs font-popR font-light text-[#FFFFFFBF]">
        {data.knownFor}
      </p>
      <img
        src={data.media}
        alt={`${data.name} image`}
        className="flex-1 object-contain"
      />
    </div>
  );
};

export default RegimeCard;
