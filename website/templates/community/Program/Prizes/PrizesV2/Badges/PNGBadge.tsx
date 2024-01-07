interface Props {
  img: string;
}

const PNGBadge: React.FC<Props> = ({ img }) => {
  return <img src={img} className="w-full h-full object-cover" />;
};

export default PNGBadge;
