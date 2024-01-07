import GamesHolder from "./GamesHolder";

interface Props {
  heading: string;
  subtitle?: string;
}

const DiscoverGames: React.FC<Props> = ({ heading, subtitle }) => {
  return (
    <div className=" py-2">
      <div className="pb-2 px-4 flex flex-col justify-center items-center">
        <p className="text-gray-700 text-center text-4xl font-semibold">
          {heading}
        </p>
        {subtitle ? (
          <p className="text-gray-500 pt-2 text-center text-2xl font-medium">
            {subtitle}
          </p>
        ) : null}
        <div className="pt-4">
          <img
            className="w-8 h-8 object-cover"
            src="https://img.icons8.com/external-prettycons-solid-prettycons/60/000000/external-down-arrow-orientation-prettycons-solid-prettycons.png"
          />
        </div>
      </div>

      <div>
        <GamesHolder />
      </div>
    </div>
  );
};

export default DiscoverGames;
