import { Link } from "@mui/material";
import clsx from "clsx";
interface Props {
  isClicked: boolean;
  onClick: (val: boolean) => void;
}
const SubscriptionTop: React.FC<Props> = ({ isClicked }) => {
  return (
    <div
      className="flex-1   bg-no-repeat  "
      style={{
        backgroundImage:
          "url(https://ik.imagekit.io/socialboat/Screenshot_2022-07-25_at_2.01_1__1__BZFt09JHN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658838777384)",

        backgroundSize: "contain",
      }}
    >
      <div
        className="fixed left-0 right-0  top-0 flex items-center p-2 iphoneX:p-4 justify-between z-50 max-w-md mx-auto"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.53) 1.79%, rgba(0, 0, 0, 0.21) 58.04%, rgba(0, 0, 0, 0) 100%)`,
        }}
      >
        <img
          src={
            "https://ik.imagekit.io/socialboat/Vector__16__TCdE80hiL.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658907677488"
          }
          className="w-2 h-4 iphoneX:w-3 iphoneX:h-7"
        />

        <Link
          href={"https://api.whatsapp.com/send?phone=919958730020&text=Hi!"}
        >
          <div className="w-20 h-6  iphoneX:w-24 iphoneX:h-8 flex items-center justify-center backdrop-blur-[11px] border rounded-full border-[#D1D1D1] ">
            <img
              src={
                "https://ik.imagekit.io/socialboat/Vector__3__VvwOQQYVf.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1657004613434"
              }
              alt="help message"
            />
            <span className="text-xs iphoneX:text-sm font-semibold text-[#D1D1D1] pl-1 ">
              HELP
            </span>
          </div>
        </Link>
      </div>
      <div
        className={clsx(
          "flex-1 bg-[#100F1AB8] backdrop-blur-[4px] rounded-3xl rounded-b-none   absolute bottom-0 left-0 right-0 ",
          "transform-all duration-100 ",
          isClicked
            ? "h-[90%] overflow-y-scroll  iphoneX:overflow-hidden"
            : "iphoneX:h-[50%] overflow-y-scroll"
        )}
      >
        <div className=" flex flex-col justify-around flex-1 px-4 py-2">
          <div className="text-[#FF5970] text-2xl iphoneX:text-[40px] py-5 iphoneX:py-8 font-semibold leading-10">
            Are you the Fittest Athlete?
          </div>
          {!isClicked ? (
            <p className="text-[#F5F5F7] text-xl iphoneX:text-2xl pb-4 iphoneX:pb-8">
              Choose Your Plan
            </p>
          ) : (
            <p />
          )}
        </div>
      </div>
    </div>
  );
};
export default SubscriptionTop;
