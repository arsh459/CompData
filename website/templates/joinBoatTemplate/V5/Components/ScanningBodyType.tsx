import { updateUserBadgeIdV2 } from "@models/User/updateUtils";
import { useEffect } from "react";

interface Props {
  onScaningNext: () => void;
  challenge: boolean;
  uid?: string;
}

const ScanningBodyType: React.FC<Props> = ({
  onScaningNext,
  uid,
  challenge,
}) => {
  useEffect(() => {
    if (uid) {
      updateUserBadgeIdV2(uid, challenge).then(() => {
        setTimeout(onScaningNext, 4000);
      });
    }
  }, [uid, challenge]);

  return (
    <div className="flex-1 h-full flex flex-col justify-center items-center">
      <div className="flex-1 max-h-[600px] flex flex-col justify-evenly items-center p-4">
        <div className="w-3/5 aspect-[100/100] relative z-0">
          <div className="absolute inset-0 z-10 border-4 border-[#59FFC3] rounded-full rotateZX" />
          <div className="absolute inset-2 z-10 border-4 border-[#3CD0FF] rounded-full rotateZY" />
          <div className="absolute inset-4 z-10 border-4 border-[#C668FF] rounded-full rotateXY" />
          <div className="absolute inset-8 z-0 flex justify-center items-center">
            <img
              src="https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,fo-auto/Union_dLCekVZ94U.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672141363992"
              className="h-full object-contain"
              alt="icon Stick Man With Open Arms"
            />
          </div>
        </div>
        <p
          className="opacity-0 text-center text-transparent text-2xl bg-clip-text font-baib bg-gradient-to-r from-[#48FFDE] via-[#48AFFF] to-[#9E71FF] font-black my-6 mx-2"
          style={{ animation: "visible 2s linear forwards 1s" }}
        >
          Analyzing your current parameters
        </p>
        <p
          className="opacity-0 text-center text-transparent text-2xl bg-clip-text font-baib bg-gradient-to-r from-[#48FFDE] via-[#48AFFF] to-[#9E71FF] font-black my-6 mx-2"
          style={{ animation: "visible 2s linear forwards 3s" }}
        >
          Creating achievable goals
        </p>
      </div>
    </div>
  );
};

export default ScanningBodyType;
