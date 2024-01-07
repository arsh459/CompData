import Button from "@components/button";
import { Link } from "@mui/material";

interface Props {
  heading: string;
  icon: string;
  buttonText: string;
  buttonLink?: string;
  subtext: string;
  onClick?: () => void;
}

const WorkoutPlaceholder: React.FC<Props> = ({
  heading,
  subtext,
  icon,
  buttonLink,
  buttonText,
  onClick,
}) => {
  return (
    <div>
      <div className="flex flex-col items-center py-4">
        <p className="text-2xl text-center font-semibold text-gray-700">
          {heading}
        </p>
        <div>
          <img className="w-24 h-24 object-cover" src={icon} />
        </div>
        <p className="text-gray-500 text-base pt-2 text-center">{subtext}</p>
        <div className="flex py-4">
          {buttonLink ? (
            <Link href={buttonLink}>
              <Button appearance="contained">{buttonText}</Button>
            </Link>
          ) : (
            <Button onClick={onClick} appearance="contained">
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlaceholder;
