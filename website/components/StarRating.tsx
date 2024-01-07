const count = 5;

interface IconProps {
  fillColor: string;
}

const StarIcon: React.FC<IconProps> = ({ fillColor }) => {
  return (
    <svg
      viewBox="0 0 20 20"
      className="w-full h-full"
      aria-hidden="true"
      fill={fillColor}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
};

interface Props {
  keyStr: string;
  rating: number;
  fillColor: string;
  backgroundColor: string;
  size: number;
}

const StarRating: React.FC<Props> = ({
  keyStr,
  rating,
  fillColor,
  backgroundColor,
  size,
}) => {
  return (
    <div className="w-max overflow-hidden relative z-0">
      <div className="flex">
        {Array.from(Array(count)).map((_, index) => (
          <div
            key={`${keyStr}-star-${index}`}
            style={{ width: size, height: size }}
          >
            <StarIcon fillColor={fillColor} />
          </div>
        ))}
      </div>
      <div
        className="absolute inset-0"
        style={{ backgroundColor, transform: `translateX(${size * rating}px)` }}
      />
    </div>
  );
};

export default StarRating;
