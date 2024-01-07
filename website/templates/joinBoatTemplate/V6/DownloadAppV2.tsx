import LoadingModal from "@components/loading/LoadingModal";
import { coches, freePlanSteps } from "@constants/planConst";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";
import { UserInterface } from "@models/User/User";
import clsx from "clsx";

import Link from "next/link";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import DownloadAppAnimation from "./DownloadAppAnimation";
import { useInteractionManager } from "@hooks/useInteractionManager";

interface Props {
  user?: UserInterface;
  noContinue?: boolean;
  challenge?: boolean;
}

const DownloadAppV2: React.FC<Props> = ({ user, noContinue, challenge }) => {
  const { expiryString } = usePaidStatus(user?.uid || "");
  const { coachUID } = useCoachAtt();
  const { interactionStatus } = useInteractionManager();

  const isPaid = expiryString === "NOT PAID";
  const coach = coachUID ? coches[coachUID] : undefined;

  return expiryString === "LOADING" || !interactionStatus ? (
    <LoadingModal
      fill="#ff735c"
      width={50}
      height={50}
      fixed={true}
      noBg={true}
    />
  ) : coach ? (
    <div className="h-full relative z-0 mx-4">
      <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden flex flex-col bg-white/10 border border-white/25">
        <div className="flex-1 overflow-y-scroll scrollbar-hide">
          <img src={coach.image} alt={coach.name} className="w-full h-2/5" />

          <div className="px-4">
            {isPaid ? (
              <>
                <h2 className="text-transparent text-xl sm:text-2xl bg-clip-text font-nunitoSB bg-gradient-to-r from-[#68FFFE] to-[#6FA0FF] my-4">
                  {`Welcome to Coach ${coach.name}'s Program`}
                </h2>
                <p className="text-white/80 font-nunitoR text-xs my-4">
                  Our Dietician will reach out to you on{" "}
                  <span className="text-[#40A9FF]">{coach.number}</span> to
                  create a custom diet plan for you.
                </p>
              </>
            ) : (
              <h2 className="text-white text-xl sm:text-2xl font-nunitoSB my-4">
                Browse a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#68FFFE] to-[#6FA0FF]">
                  free Program
                </span>{" "}
                by Coach Greesha
              </h2>
            )}

            <span className="text-white font-nunitoM text-lg">
              {isPaid ? "Next Steps:" : "What is in the free plan"}
            </span>

            <div className="w-full grid auto-cols-fr gap-8 py-4">
              {(isPaid ? coach.planSteps : freePlanSteps).map((each, index) => (
                <div key={`item-${index}`} className="w-full flex items-center">
                  <img
                    src={each.img}
                    alt={each.text}
                    className="w-10 aspect-1"
                  />

                  <div className="w-4 aspect-1" />

                  <p
                    className="flex-1 text-base text-white/80 font-nunitoL"
                    key={index}
                  >
                    {each.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {noContinue ? null : (
          <Link href="/myProgram" rel="noreferrer">
            <button
              className="w-full rounded-full px-4 pt-3 text-transparent bg-clip-text font-popM text-xs iphoneX:text-sm text-center bg-gradient-to-r from-[#88FAFF] to-[#6D8EFF]"
              onClick={() =>
                weEventTrack(`fScanDownload_continue_on_browser`, {})
              }
            >
              Continue on Browser
            </button>
          </Link>
        )}

        <button
          onClick={() => weEventTrack(`fScanDownload_clickDownloadApp`, {})}
          className={clsx(
            "font-popM bg-gradient-to-r from-[#69F8FE] to-[#6FA6FF] rounded-full text-lg text-white py-2 m-4"
          )}
        >
          <Link
            href="https://socialboat.app.link/download"
            target="_blank"
            rel="noreferrer"
          >
            Download App
          </Link>
        </button>
      </div>
    </div>
  ) : (
    <DownloadAppAnimation
      challenge={challenge}
      uid={user?.uid}
      noContinue={noContinue}
      name={user?.name || "User"}
    />
  );
};

export default DownloadAppV2;
