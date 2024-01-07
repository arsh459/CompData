import { weEventTrack } from "@analytics/webengage/user/userLog";
import { fcsTypes, LocalUser } from "@models/User/User";
import clsx from "clsx";

interface Props {
  localUser?: LocalUser | undefined;
  onConcernUpdate: (val: fcsTypes[]) => void;
}

const SetConcerns: React.FC<Props> = ({ localUser, onConcernUpdate }) => {
  const hasVal = (key: fcsTypes) => {
    if (localUser?.fitnessConcerns?.includes(key)) {
      return true;
    }
    return false;
  };

  const onAddItem = (fcs: fcsTypes) => {
    if (localUser?.fitnessConcerns && localUser.fitnessConcerns.includes(fcs)) {
      onConcernUpdate(localUser.fitnessConcerns.filter((item) => item !== fcs));
    } else if (localUser?.fitnessConcerns) {
      onConcernUpdate([...localUser.fitnessConcerns, fcs]);
    } else {
      onConcernUpdate([fcs]);
    }
    weEventTrack("fScanFitnessConcern_changeConcern", {});
  };

  return (
    <div className="grid auto-rows-max gap-6">
      <div
        className={clsx(
          "px-8 py-4 rounded-2xl flex flex-row items-center",
          hasVal("pcos") ? "bg-[#F1F1F1]" : "bg-[#262630]"
        )}
        onClick={() => onAddItem("pcos")}
      >
        <img
          src="https://ik.imagekit.io/socialboat/Group__1__L2_f9-xevO.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668264469875"
          alt="icon for health concerns PCOS/PCOD"
          className="w-6 aspect-1 object-contain"
        />
        <p
          className={clsx(
            "pl-4 flex-1 text-xl iphoneX:text-2xl capitalize",
            hasVal("pcos") ? "text-[#100F1A]" : "text-[#F1F1F1]"
          )}
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          PCOS/PCOD Weight gain
        </p>
      </div>

      <div
        className={clsx(
          " px-8 py-4 rounded-2xl flex flex-row items-center",
          hasVal("bodyToning") ? "bg-[#F1F1F1]" : "bg-[#262630]"
        )}
        onClick={() => onAddItem("bodyToning")}
      >
        <img
          src="https://ik.imagekit.io/socialboat/Vector__20__U_MjpzrtR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668264469866"
          alt="icon for Body Toning & Mobility"
          className="w-6 aspect-1 object-contain"
        />
        <p
          className={clsx(
            "flex-1 pl-4 text-xl iphoneX:text-2xl capitalize",
            hasVal("bodyToning") ? "text-[#100F1A]" : "text-[#F1F1F1]"
          )}
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          Body Toning & Mobility
        </p>
      </div>

      <div
        className={clsx(
          " px-8 py-4 rounded-2xl flex flex-row items-center",
          hasVal("postPregnancy") ? "bg-[#F1F1F1]" : "bg-[#262630]"
        )}
        onClick={() => onAddItem("postPregnancy")}
      >
        <img
          src="https://ik.imagekit.io/socialboat/Mask_group_HM5BWTed_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668264469949"
          alt="icon of Pregnant lady"
          className="w-6 aspect-1 object-contain"
        />
        <p
          className={clsx(
            "flex-1 pl-4 text-xl iphoneX:text-2xl capitalize",
            hasVal("postPregnancy") ? "text-[#100F1A]" : "text-[#F1F1F1]"
          )}
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          Recently Pregnant or Post
        </p>
      </div>

      <div
        className={clsx(
          "px-8 py-4 rounded-2xl flex flex-row items-center",
          hasVal("perimenopause") ? "bg-[#F1F1F1]" : "bg-[#262630]"
        )}
        onClick={() => onAddItem("perimenopause")}
      >
        <img
          src="https://ik.imagekit.io/socialboat/Subtract_VGwAKLe20.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668264469872"
          alt="icon for 35-45+ Perimenopause"
          className="w-6 aspect-1 object-contain"
        />
        <p
          className={clsx(
            "flex-1 pl-4 text-xl iphoneX:text-2xl capitalize",
            hasVal("perimenopause") ? "text-[#100F1A]" : "text-[#F1F1F1]"
          )}
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          35-45+ Perimenopause
        </p>
      </div>
    </div>
  );
};

export default SetConcerns;
