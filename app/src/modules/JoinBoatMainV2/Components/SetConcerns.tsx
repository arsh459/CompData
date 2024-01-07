import { LocalUser } from "@hooks/user/useLocalUserV2";
import { fcsTypes } from "@models/User/User";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import clsx from "clsx";
import { Image, Text, TouchableOpacity, View } from "react-native";

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
    <View className="grid auto-rows-max gap-6 p-4">
      <TouchableOpacity
        className={clsx(
          "px-8 py-4 rounded-2xl flex flex-row items-center",
          hasVal("pcos") ? "bg-[#F1F1F1]" : "bg-[#262630]"
        )}
        onPress={() => onAddItem("pcos")}
      >
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/Group__1__L2_f9-xevO.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668264469875",
          }}
          className="w-6 aspect-square"
          resizeMode="contain"
        />
        <Text
          className={clsx(
            "pl-4 flex-1 text-xl iphoneX:text-2xl capitalize",
            hasVal("pcos") ? "text-[#100F1A]" : "text-[#F1F1F1]"
          )}
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          PCOS/PCOD Weight gain
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={clsx(
          " px-8 py-4 rounded-2xl flex flex-row items-center",
          hasVal("bodyToning") ? "bg-[#F1F1F1]" : "bg-[#262630]"
        )}
        onPress={() => onAddItem("bodyToning")}
      >
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/Vector__20__U_MjpzrtR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668264469866",
          }}
          className="w-6 aspect-square"
          resizeMode="contain"
        />
        <Text
          className={clsx(
            "flex-1 pl-4 text-xl iphoneX:text-2xl capitalize",
            hasVal("bodyToning") ? "text-[#100F1A]" : "text-[#F1F1F1]"
          )}
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          Body Toning & Mobility
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={clsx(
          " px-8 py-4 rounded-2xl flex flex-row items-center",
          hasVal("postPregnancy") ? "bg-[#F1F1F1]" : "bg-[#262630]"
        )}
        onPress={() => onAddItem("postPregnancy")}
      >
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/Mask_group_HM5BWTed_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668264469949",
          }}
          className="w-6 aspect-square"
          resizeMode="contain"
        />
        <Text
          className={clsx(
            "flex-1 pl-4 text-xl iphoneX:text-2xl capitalize",
            hasVal("postPregnancy") ? "text-[#100F1A]" : "text-[#F1F1F1]"
          )}
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          Recently Pregnant or Post
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={clsx(
          "px-8 py-4 rounded-2xl flex flex-row items-center",
          hasVal("perimenopause") ? "bg-[#F1F1F1]" : "bg-[#262630]"
        )}
        onPress={() => onAddItem("perimenopause")}
      >
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/Subtract_VGwAKLe20.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668264469872",
          }}
          className="w-6 aspect-square"
          resizeMode="contain"
        />
        <Text
          className={clsx(
            "flex-1 pl-4 text-xl iphoneX:text-2xl capitalize",
            hasVal("perimenopause") ? "text-[#100F1A]" : "text-[#F1F1F1]"
          )}
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          35-45+ Perimenopause
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetConcerns;
