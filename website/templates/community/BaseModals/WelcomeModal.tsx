import Button from "@components/button";
import { Link } from "@mui/material";
import TopClose from "@templates/community/Program/Feed/TopClose";
import Divider from "@components/divider/Divider";

interface Props {
  state: "welcome" | "not-welcome";
  communityName: string;
  leaderKey?: string;
  eventKey?: string;
  onCloseModal: () => void;
  onIntroduce: () => void;
}

const WelcomeModal: React.FC<Props> = ({
  communityName,
  leaderKey,
  eventKey,
  onCloseModal,
  onIntroduce,
  state,
}) => {
  // console.log("eventKey", eventKey);
  return (
    <>
      <div className="p-4 bg-white">
        <div className="cursor-pointer">
          <TopClose onCloseModal={onCloseModal} />
          <div className="pt-2">
            <Divider />
          </div>
        </div>

        <div className="pt-2 flex flex-col items-center">
          <p className="text-2xl text-center font-semibold text-gray-700">{`Welcome to ${communityName}'s community!'`}</p>
          <div>
            <img
              className="w-24 h-24 object-cover"
              src={
                state === "welcome"
                  ? "https://img.icons8.com/emoji/96/000000/vulcan-salute-emoji.png"
                  : "https://img.icons8.com/emoji/96/000000/locked.png"
              }
            />
          </div>
          {state === "welcome" ? (
            <p className="text-gray-500 text-base pt-2 text-center">
              To get started, we advice you post a brief introduction about
              yourself
            </p>
          ) : (
            <p className="text-gray-500 text-base pt-2 text-center">
              You have not signed up for the program. Join the team by clicking
              below
            </p>
          )}
        </div>
        <div className="flex justify-center pt-4">
          {state === "welcome" ? (
            <>
              <div className="pr-2">
                <Button appearance="control" onClick={onCloseModal}>
                  <p className="text-gray-700">Maybe later</p>
                </Button>
              </div>
              <Button
                type="button"
                appearance="contained"
                onClick={onIntroduce}
              >
                <p>Introduce yourself</p>
              </Button>
            </>
          ) : (
            <Link href={`/joinBoat/${leaderKey}/${eventKey}`}>
              <Button appearance="contained">
                <p className="text-white font-medium text-lg">Join Team</p>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default WelcomeModal;
