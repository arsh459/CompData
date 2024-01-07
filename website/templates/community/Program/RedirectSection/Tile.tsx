export interface TileProps {
  text: string;
  subtitle: string;
  key: string;
  link?: string;
  icon?: string;
}

const Tile: React.FC<TileProps> = ({ text, subtitle, icon }) => {
  return (
    // <div className="">
    <div className="bg-white rounded-lg shadow-sm flex flex-col justify-center items-center p-2 cursor-pointer w-full h-full">
      {icon ? (
        <div className="pb-0.5">
          <img className="w-8 h-8 object-cover" src={icon} />
        </div>
      ) : null}
      <p className="text-base text-gray-700 font-medium text-center">{text}</p>
      <p className="text-sm text-gray-500 text-center">{subtitle}</p>
    </div>
    // </div>
  );
};

export default Tile;
