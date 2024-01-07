import Heading from "../Heading/Heading";

interface Props {
  heading: string;
  subtitle: string;
}

const HorizontalCarousel: React.FC<Props> = ({
  heading,
  subtitle,
  children,
}) => {
  return (
    <div>
      <Heading heading={heading} subtitle={subtitle} />
      <div className="pt-10 flex overflow-x-auto scrollbar-hide">
        {children}
      </div>
    </div>
  );
};

export default HorizontalCarousel;
