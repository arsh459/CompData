import Loading from "@components/loading/Loading";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import { CSSProperties, useState } from "react";

interface Props {
  visible: boolean;
  text: string;
  textColor?: string;
  loading?: boolean;
  onSchedule: () => void;
  onCancel: () => void;
  onProceed: () => void;
  ctaCancel?: string;
  ctaProceed?: string;
  ctaCancelColor?: string;
  ctaProceedColor?: string;
  scheduleCTA?: string;
  isActive?: "cancel" | "proceed" | "later";
}

const StatusModal: React.FC<Props> = ({
  visible,
  text,
  textColor,
  loading,
  onSchedule,
  onCancel,
  onProceed,
  ctaCancel,
  ctaProceed,
  ctaCancelColor,
  ctaProceedColor,
  scheduleCTA,
  isActive,
}) => {
  const [mouseOverOn, setMouseOverOn] = useState<
    "cancel" | "proceed" | "later"
  >();

  return (
    <CreateModal
      isOpen={visible}
      onCloseModal={onCancel}
      onBackdrop={onCancel}
      onButtonPress={onCancel}
      heading=""
      maxW="max-w-none"
      bgProp="w-full h-screen"
    >
      <div className="w-full h-full flex justify-center items-center bg-[#F6F6F6]/30 backdrop-blur-2xl">
        {loading ? (
          <Loading fill="#ff735c" height={30} width={30} />
        ) : (
          <div className="p-12 max-w-md">
            <p
              className="text-base md:text-xl font-popR my-4"
              style={{ color: textColor || "#0D0D0D" }}
            >
              {text}
            </p>

            <div className="my-4 flex flex-row gap-4">
              <button
                onClick={onSchedule}
                className="flex-1 rounded-lg py-2 cursor-pointer text-xs md:text-base font-popR text-center border"
                onMouseEnter={
                  isActive === "later"
                    ? undefined
                    : () => setMouseOverOn("later")
                }
                onMouseLeave={
                  isActive === "later"
                    ? undefined
                    : () => setMouseOverOn(undefined)
                }
                style={getCtaStyle(
                  ctaCancelColor,
                  isActive
                    ? isActive === "later"
                    : mouseOverOn
                    ? mouseOverOn === "later"
                    : undefined
                )}
              >
                {scheduleCTA}
              </button>

              <button
                onClick={onCancel}
                className="flex-1 rounded-lg py-2 cursor-pointer text-xs md:text-base font-popR text-center border"
                onMouseEnter={
                  isActive === "cancel"
                    ? undefined
                    : () => setMouseOverOn("cancel")
                }
                onMouseLeave={
                  isActive === "cancel"
                    ? undefined
                    : () => setMouseOverOn(undefined)
                }
                style={getCtaStyle(
                  ctaCancelColor,
                  isActive
                    ? isActive === "cancel"
                    : mouseOverOn
                    ? mouseOverOn === "cancel"
                    : undefined
                )}
              >
                {ctaCancel ? ctaCancel : "No"}
              </button>

              <button
                onClick={onProceed}
                className="flex-1 rounded-lg py-2 cursor-pointer text-xs md:text-base font-popR text-center border"
                onMouseEnter={
                  isActive === "proceed"
                    ? undefined
                    : () => setMouseOverOn("proceed")
                }
                onMouseLeave={
                  isActive === "proceed"
                    ? undefined
                    : () => setMouseOverOn(undefined)
                }
                style={getCtaStyle(
                  ctaProceedColor,
                  isActive
                    ? isActive === "proceed"
                    : mouseOverOn
                    ? mouseOverOn === "proceed"
                    : undefined
                )}
              >
                {ctaProceed ? ctaProceed : "Yes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </CreateModal>
  );
};

export default StatusModal;

const getCtaStyle = (color?: string, isActive?: boolean): CSSProperties => {
  if (isActive) {
    return {
      color: "#FFFFFF",
      borderColor: color || "#FFFFFF",
      backgroundColor: color || "transparent",
      outline: 0,
    };
  } else {
    return {
      color: color || "#FFFFFF",
      borderColor: color || "#FFFFFF",
      backgroundColor: "transparent",
      outline: 0,
    };
  }
};
