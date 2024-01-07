import { Link } from "@mui/material";
import IconCTA from "@templates/community/Program/GrowCommunity/IconCTA";

interface Props {}

const ComeBackLater: React.FC<Props> = ({}) => {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <p className="text-4xl text-center text-gray-600 font-semibold">
          Campaign Creation is ongoing
        </p>

        <p className="text-center text-gray-500 pt-4">
          In the meantime, you can reach out to us by booking a slot below
        </p>

        <div className="pt-2">
          <Link
            href="https://calendly.com/socialboat/consultation?month=2021-12&date=2021-12-15"
            target="_blank"
          >
            <IconCTA
              text="Talk to us"
              img="https://img.icons8.com/fluency/96/000000/calendar.png"
              onClick={() => {}}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComeBackLater;
