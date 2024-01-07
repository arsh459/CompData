import Button from "@components/button";
// import CreateModal from "../Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import Divider from "@components/divider/Divider";
import { Link } from "@mui/material";
// import PhoneForm from "@templates/apply/Form/PhoneForm";
// import { UserInterface } from "@models/User/User";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import { RecaptchaVerifier } from "@firebase/auth";
// import { dashVisible } from "@templates/apply/Form/utils";

interface Props {
  //   isOpen: boolean;
  //   user?: UserInterface;
  //   leader?: LeaderBoard;
  //   recaptcha: RecaptchaVerifier;
  //   loadComplete?: boolean;
  enrolled?: boolean;
  cost?: number;
  seriesKey: string;
  //   communityName: string;
  //   onBackdrop: () => void;
  onCloseModal: () => void;
  onIntroduce: () => void;
}

const PrebuyModal: React.FC<Props> = ({
  //   recaptcha,
  //   hideAuth,
  //   isOpen,
  //   user,
  //   leader,
  //   communityName,
  cost,
  enrolled,
  seriesKey,
  //   onBackdrop,
  onCloseModal,
  onIntroduce,
  //   loadComplete,
  //   isAuthVisible,
}) => {
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
          {enrolled ? (
            <p className="text-2xl text-center font-semibold text-gray-700">
              You are already enrolled!
            </p>
          ) : (
            <p className="text-2xl text-center font-semibold text-gray-700">
              Cost of Program: ₹{`${cost ? cost : 0}`}
            </p>
          )}
          <div>
            <img
              className="w-24 h-24 object-cover"
              src="https://img.icons8.com/color/96/000000/stepper.png"
            />
          </div>
          {enrolled ? (
            <p className="text-gray-500 text-base pt-2 text-center">
              To start, click below
            </p>
          ) : (
            <p className="text-gray-500 text-base pt-2 text-center">
              To join the program click below
            </p>
          )}
        </div>
        <div className="flex justify-center pt-4">
          <div className="pr-2">
            <Button appearance="control" onClick={onCloseModal}>
              <p className="text-gray-700">Maybe later</p>
            </Button>
          </div>
          {cost && !enrolled ? (
            <Link href={`/checkoutSeries/${seriesKey}`} target="_blank">
              <Button type="button" appearance="contained">
                <p>Join program</p>
              </Button>
            </Link>
          ) : (
            <Button type="button" appearance="contained" onClick={onCloseModal}>
              <p>Join program</p>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default PrebuyModal;
