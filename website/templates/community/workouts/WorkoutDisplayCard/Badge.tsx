interface Props {
  text: string;
}

const Badge: React.FC<Props> = ({ text }) => {
  return (
    <div className="flex">
      <div className="bg-green-500 p-1 px-2 rounded-md">
        <p className="text-white font-semibold text-xs">{text}</p>
      </div>
    </div>
  );
};

export default Badge;
