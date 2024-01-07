import { generalClickEvent } from "./generalClick";

export const profileClick = async () => {
  generalClickEvent("profile_click", {});
};

export const clapClick = async () => {
  generalClickEvent("user_clap", {});
};

export const replyClick = async () => {
  generalClickEvent("reply_click", {});
};

// export const mainCTAClick = async (
//   action: "start_workout" | "start_team" | "join_team" | "" | "go_to_team"
// ) => {
//   if (action) {
//     generalClickEvent(action, {});
//   }
// };

export const onTopNavClick = async (
  topNavState: "community" | "leaderboard" | "rules" | ""
) => {
  if (topNavState)
    generalClickEvent("top_nav_state", {
      view: topNavState,
    });
};
