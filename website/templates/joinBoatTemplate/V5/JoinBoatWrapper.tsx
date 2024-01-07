import { weEventTrack } from "@analytics/webengage/user/userLog";
import clsx from "clsx";
import { useRouter } from "next/router";
import JoinBoatProgress from "../V4/JoinBoatProgress";

interface Props {
  children: React.ReactNode;
  headText?: string;
  title?: string;
  nextBtnText?: string;
  onNext?: () => void;
  current?: number;
  disabled?: boolean;
  skip?: JSX.Element;
  noBack?: boolean;
  noSpace?: boolean;
}

const JoinBoatWrapperV2: React.FC<Props> = ({
  children,
  headText,
  title,
  nextBtnText,
  onNext,
  current,
  disabled,
  skip,
  noBack,
  noSpace,
}) => {
  const router = useRouter();

  // console.log("disabled", disabled);

  const onBack = () => {
    router.back();
    weEventTrack("fScan_goBack", {});
  };

  return (
    <div className="w-full h-full bg-[#100F1A] flex flex-col">
      <div className="w-full max-w-md mx-auto flex justify-between items-center p-4 bg-[#100F1A] sticky top-0 z-20">
        <img
          src={`https://ik.imagekit.io/socialboat/Vector_qeTUiyHTG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658904429443`}
          className={clsx(
            "w-6 iphoneX:w-8 h-6 iphoneX:h-8 object-contain cursor-pointer",
            noBack && "pointer-events-none opacity-0"
          )}
          onClick={onBack}
          alt="back Icon"
        />
        <div className="flex-1 flex flex-col justify-center items-center">
          <h6 className="text-xs text-[#F1F1F1]">{headText}</h6>
          <JoinBoatProgress current={current ? current : 0} total={12} />
        </div>
        <div className="w-6 iphoneX:w-8 h-6 iphoneX:h-8 opacity-0" />
      </div>
      <div
        className="w-full flex-1 max-w-md mx-auto flex flex-col justify-around"
        style={{ paddingInline: noSpace ? undefined : 16 }}
      >
        {title ? (
          <p
            className="text-center text-[#F1F1F1]  text-xl iphoneX:text-2xl"
            style={{
              fontFamily: "BaiJamjuree-Bold",
              paddingInline: noSpace ? undefined : 16,
            }}
          >
            {title}
          </p>
        ) : null}
        <div className={clsx("flex-1", noSpace ? "py-4" : "p-4")}>
          {children}
        </div>
        <div className="w-full py-3 px-4 sticky bottom-0 z-20">
          {onNext ? (
            <button
              className={clsx(
                "rounded-full px-4 py-3  w-full",
                disabled ? "bg-[#757575]" : "bg-white"
              )}
              onClick={onNext}
              disabled={disabled}
            >
              <p
                className="text-[#100F1A] text-base  iphoneX:text-xl text-center"
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                {nextBtnText ? nextBtnText : "Next"}
              </p>
            </button>
          ) : null}
        </div>
        {skip}
      </div>
    </div>
  );
};

export default JoinBoatWrapperV2;
