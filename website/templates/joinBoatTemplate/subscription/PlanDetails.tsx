import { goldenCrown } from "@constants/icons/iconURLs";
import clsx from "clsx";

interface Props {
  isClicked: boolean;
  onSubscribe: () => Promise<void>;
  whatWillYouGet: { icon: string; text: string }[];
}
const PlanDetails: React.FC<Props> = ({
  onSubscribe,
  isClicked,
  whatWillYouGet,
}) => {
  return (
    <>
      <div className=" flex flex-col justify-around flex-1 py-2">
        <p className="text-[#F5F5F7]  iphoneX:text-lg pb-4 iphoneX:pb-8">
          Unlock all games for INR 999/month Win rewards upto{" "}
          <span className="text-[#FF5970] iphoneX:text-xl"> INR 1,00,000</span>
        </p>
        <div
          className={clsx(
            "flex flex-row items-center",
            isClicked ? "pb-1 iphoneX:pb-2" : "pb-4 phoneX:pb-8"
          )}
        >
          <img
            src={goldenCrown}
            className="h-5 w-5 object-contain"
            alt="crown"
          />
          <div
            className={clsx(
              "text-[#f5f5f7]  font-medium flex-1 pl-2 ",
              isClicked ? "iphoneX:text-2xl" : "iphoneX:text-xl"
            )}
          >
            What will you get?
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-col ">
        {isClicked
          ? whatWillYouGet.map((item) => {
              return (
                <div
                  className="flex flex-row  justify-center py-2 iphoneX:py-4"
                  key={item.text}
                >
                  <img
                    src={item.icon}
                    className="h-5 w-5  object-contain"
                    alt="crown"
                  />
                  <div className="text-[#f5f5f7] text-base iphoneX:text-xl font-medium flex-1 pl-4">
                    {item.text}
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};
export default PlanDetails;
