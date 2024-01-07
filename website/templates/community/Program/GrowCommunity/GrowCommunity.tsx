import { Link } from "@mui/material";
import IconCTA from "./IconCTA";

interface Props {
  eventKey: string;
  eventId: string;
}

const GrowCommunity: React.FC<Props> = ({ eventKey, eventId }) => {
  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-sm px-4 py-2">
        <div className="flex items-center justify-center">
          <p className="text-lg text-gray-700 font-semibold text-center">
            Grow your community
          </p>
          <p className="text-lg pl-2">🚀</p>
        </div>
        <div>
          <p className="text-base text-gray-500 text-center">
            Curated suggestions for you to grow 10x
          </p>
        </div>

        <div className="flex flex-wrap justify-evenly items-center p-4">
          <Link href={`/invite?eventId=${eventId}`} target="_blank">
            <IconCTA
              text="Invite users"
              img="https://img.icons8.com/color/96/000000/filled-message.png"
              onClick={() => {}}
            />
          </Link>
          {/* <Link href={`/campaign/${eventKey}`} target="_blank">
            <IconCTA
              text="Social posts"
              img="https://img.icons8.com/fluency/144/000000/instagram-new.png"
              onClick={() => {}}
            />
          </Link> */}
          <Link
            href="https://calendly.com/socialboat/consultation?month=2021-12&date=2021-12-15"
            target="_blank"
          >
            <IconCTA
              text="Consult us"
              img="https://img.icons8.com/fluency/96/000000/calendar.png"
              onClick={() => {}}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GrowCommunity;
