import ContentCard from "./ContentCard";
import Loading from "@components/loading/Loading";
import { useGoalAchievments } from "./hook/useGoalAchievments";
import { UserInterface } from "@models/User/User";
import { AchivementPathHeader, ItemSeparatorComponent } from "./Helper";
import { GetDataType } from "./utils/constants";
import { createFBRequest } from "@analytics/webengage/fb/main";
import { format } from "date-fns";
import { useDeviceStore } from "@analytics/webengage/fb/store";
import { shallow } from "zustand/shallow";
import { useDeviceStoreDateInit } from "@analytics/webengage/fb/hooks/useDeviceStoreInit";

interface Props {
  type: GetDataType;
  ctaText?: string;
  onCtaPress?: () => void;
  dark?: boolean;
  user?: UserInterface;
}

const AchievementPath: React.FC<Props> = ({
  type,
  ctaText,
  onCtaPress,
  dark,
  user,
}) => {
  const { data, loading } = useGoalAchievments(type, user);
  useDeviceStoreDateInit();
  const { deviceData } = useDeviceStore(
    (state) => ({ deviceData: state.data }),
    shallow
  );

  const remoteColorArr = dark
    ? ["#232136", "#232136"]
    : ["#4846A6", "#9D5CEA", "#CD62FF"];

  const onFBConversionRequest = () => {
    if (onCtaPress) {
      onCtaPress();

      if (user?.uid) {
        createFBRequest(
          "Lead",
          user.uid,
          format(new Date(), "yyyy-MM-dd"),
          deviceData
        );
      }
    }
  };

  return (
    <div
      className="w-full h-full max-w-lg mx-auto relative z-0 overflow-hidden"
      style={{ background: `linear-gradient(to bottom, ${remoteColorArr})` }}
    >
      <img
        src={
          "https://ik.imagekit.io/socialboat/tr:w-800,c-maintain_ratio,fo-auto/Frame%201762%20(1)_ma55UDnzJ.png?updatedAt=1690205435129"
        }
        className="absolute inset-0 -z-10 object-cover"
      />

      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col overflow-y-scroll scrollbar-hide px-4 py-12">
          <AchivementPathHeader />

          {data.map((item, index) => (
            <div key={`item-${index}`}>
              {index !== 0 ? <ItemSeparatorComponent /> : null}
              <ContentCard item={item} dark={dark} />
            </div>
          ))}

          <div>
            <div className="w-full h-16" />
          </div>
        </div>
      )}

      {ctaText && onCtaPress ? (
        <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-[#BE60F9] to-[#BE60F900]">
          <button
            className="w-full rounded-xl text-[#6D55D1] text-base iphoneX:text-lg text-center px-4 py-3 font-popR bg-white shadow-lg"
            onClick={onFBConversionRequest}
          >
            {ctaText}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default AchievementPath;
