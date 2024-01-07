import { weEventTrack } from "@analytics/webengage/user/userLog";
import {
  monthStateInterface,
  weekStateInterface,
} from "@hooks/community/useChallengeWeeks";
import { communityQueryV3 } from "@hooks/community/v2/useCommunityParamsV3";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import clsx from "clsx";
import CloseBtn from "../Program/Feed/CloseBtn";

interface Props {
  gameName: string;
  urlState: communityQueryV3;
  isOpen: boolean;
  onCloseModal: () => void;
  period?: "month" | "week";
  current: string;
  leaderboard: weekStateInterface[] | monthStateInterface[];
  onQueryChange: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;
}

const PeriodModal: React.FC<Props> = ({
  gameName,
  urlState,
  isOpen,
  onCloseModal,
  period,
  current,
  leaderboard,
  onQueryChange,
}) => {
  const selected: string | undefined =
    period === "week" ? urlState.leaderboardWeek : urlState.leaderboardMonth;

  const handleQueryChange = (key: string) => {
    const query: communityQueryV3 = {};
    query.nav = urlState.nav;
    query.view = urlState.view;
    if (period === "week") {
      query.leaderboardWeek = key;
      query.period = "week";
      query.lS = `r_${Math.floor(Math.random() * 1000)}`;
      // query.lpg = "1";
      query.leaderboardMonth = urlState.leaderboardMonth;
    } else {
      query.leaderboardWeek = "overall";
      query.leaderboardMonth = key;
      query.period = "month";
      query.lS = `r_${Math.floor(Math.random() * 1000)}`;
      // query.lpg = "1";
    }
    onQueryChange(query);
    weEventTrack(
      period === "week"
        ? "gameLeaderboard_roundChange"
        : "gameLeaderboard_seasonChange",
      {
        gameName,
        selectedSeason: query.leaderboardMonth
          ? query.leaderboardMonth
          : "no_season",
        selectedRound: urlState.leaderboardWeek
          ? query.leaderboardWeek
          : "no_round",
      }
    );
  };

  return (
    <CreateModal
      onBackdrop={onCloseModal}
      onButtonPress={onCloseModal}
      isOpen={isOpen}
      heading=""
      onCloseModal={onCloseModal}
      bgData="bg-gradient-to-b from-white/40 to-[#C8C8C8]/40 backdrop-blur-2xl fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full h-full overflow-y-auto scrollbar-hide flex flex-col justify-center">
        <div className="place-self-end mx-8 pb-8">
          <CloseBtn onCloseModal={onCloseModal} tone="dark" />
        </div>
        <div className="w-full max-h-[70vh] overflow-y-auto">
          <div>
            {period === "week" ? (
              <div
                className={clsx(
                  "text-center mx-8 py-2.5 border-black/70 relative border-b cursor-pointer",
                  urlState.leaderboardWeek === "overall" && "font-bold"
                )}
                onClick={() => {
                  handleQueryChange("overall");
                  onCloseModal();
                }}
              >
                <h6 className="iphoneX:text-xl capitalize">overall</h6>
                <img
                  src={`https://ik.imagekit.io/socialboat/Group_129_vq_xrO-sj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652689883205`}
                  alt="selected icon"
                  className={clsx(
                    "w-3 iphoneX:w-5 absolute top-1/2 right-0 -translate-y-1/2 mx-4",
                    urlState.leaderboardWeek !== "overall" && "hidden"
                  )}
                />
              </div>
            ) : null}
            {leaderboard.map((each, index, arr) => {
              return (
                <div
                  key={each.key}
                  className={clsx(
                    "text-center mx-8 py-2.5 border-black/70 relative cursor-pointer",
                    index !== arr.length - 1 && "border-b",
                    each.key === selected && "font-bold"
                  )}
                  onClick={() => {
                    handleQueryChange(each.key);
                    onCloseModal();
                  }}
                >
                  {each.key === current ? (
                    <div className="flex justify-center">
                      <h6 className="iphoneX:text-xl capitalize">
                        {each.label}
                      </h6>
                      <h6 className="iphoneX:text-xl pl-2 font-normal text-gray-800 capitalize">
                        (Active)
                      </h6>
                    </div>
                  ) : (
                    <h6 className="iphoneX:text-xl capitalize">{each.label}</h6>
                  )}

                  <p className="text-[10px] iphoneX:text-sm">{`${each.value}`}</p>

                  <img
                    src={`https://ik.imagekit.io/socialboat/Group_129_vq_xrO-sj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652689883205`}
                    alt="selected icon"
                    className={clsx(
                      "w-3 iphoneX:w-5 absolute top-1/2 right-0 -translate-y-1/2 mx-4",
                      each.key !== selected && "hidden"
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </CreateModal>
  );
};

export default PeriodModal;
