import clsx from "clsx";
import WaveBtn from "@components/WaveBtn";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import HeaderWithSkipCta from "@templates/WomenTemplate/components/V2/LandingHeader/HeaderWithSkipCta";

interface Props {
  children: React.ReactNode;
  title?: string;
  nextBtnText?: string;
  onNext?: () => void;
  disabled?: boolean;
  progress?: number;
  oldCta?: boolean;
  styleTw?: string;
  note?: string;
  waveBtn?: boolean;
  onSkip?: () => void;
}

const JoinBoatWrapper: React.FC<Props> = ({
  children,
  title,
  nextBtnText,
  onNext,
  disabled,
  progress,
  oldCta,
  styleTw,
  note,
  waveBtn,
  onSkip,
}) => {
  const { coachRef } = useCoachAtt();
  // console.log(onNext);

  return (
    <>
      <HeaderWithSkipCta
        logoLink={coachRef ? `/?${coachRef}` : `/`}
        onSkip={onSkip}
      />

      <div className="w-full h-full bg-[#232136] flex flex-col pb-4 pt-20 sm:pt-[92px]">
        <div className="w-full flex-1 max-w-md mx-auto flex flex-col justify-around">
          <div className="px-4">
            {progress ? (
              <div className="w-full h-1 bg-white/25 rounded-full overflow-hidden mb-5">
                <div
                  className="h-full bg-[#FE3394] rounded-full"
                  style={{
                    width: `${
                      100 * (progress > 1 ? 1 : progress < 0 ? 0 : progress)
                    }%`,
                  }}
                />
              </div>
            ) : null}

            {title ? (
              <h1
                className={clsx(
                  "text-[#F1F1F1] text-xl iphoneX:text-2xl  font-popM mb-5",
                  styleTw
                )}
              >
                {title}
              </h1>
            ) : null}
          </div>

          <div className="flex-1">{children}</div>
          <p className="text-center text-xs font-nunitoB text-white/70 pb-5">
            {note}{" "}
          </p>
          {waveBtn && onNext ? (
            <div className="w-full sticky max-w-sm  mx-auto bottom-0 z-0">
              <WaveBtn
                text={nextBtnText ? nextBtnText : "Next"}
                textColor="#000000"
                gotoComponent={onNext}
                color1="#ffffff"
                textStyleTw="text-black text-base font-popM "
                styleContainerTw="max-w-sm  mx-auto "
              />
            </div>
          ) : (
            <>
              {onNext ? (
                <div className="w-full p-4 sticky bottom-0 z-20">
                  {oldCta ? (
                    <button
                      className={clsx(
                        "rounded-full px-4 py-3 text-[#232136] font-popR text-base iphoneX:text-xl text-center w-full",
                        disabled ? "bg-[#757575]" : "bg-white"
                      )}
                      onClick={onNext}
                      disabled={disabled}
                    >
                      {nextBtnText ? nextBtnText : "Next"}
                    </button>
                  ) : (
                    <button
                      className={clsx(
                        "rounded-2xl px-4 py-3 text-[#232136] font-popR text-base iphoneX:text-xl text-center w-full",
                        disabled
                          ? "bg-[#6D55D1]/20 text-white/40"
                          : "bg-[#6D55D1] text-white"
                      )}
                      onClick={onNext}
                      disabled={disabled}
                    >
                      {nextBtnText ? nextBtnText : "Next"}
                    </button>
                  )}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default JoinBoatWrapper;
