// import LandingPageTemplate from "@templates/LandingPage";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  LeaderBoard,
  LandingLeaderboard,
} from "@models/LeaderBoard/Leaderboard";
import { EventInterface } from "@models/Event/Event";

import { getTeamKPI, TeamKPI } from "server/landing/getTeamKPIs";
import { UserInterface } from "@models/User/User";
// import { LandingDataProvider } from "@templates/LandingPage/V2/providers/LandingDataProvider";

interface Props {
  leaders: LandingLeaderboard[];
  leader: UserInterface;
}

export type modalStateType = "none" | "auth" | "welcome" | "post";

const UserPage: React.FC<Props> = ({ leaders, leader }) => {
  // console.log("leaders", leaders.length);

  return <div />;
};
export default UserPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { userKey: "standardLandingPage" } }],
    // fallback: true,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const host = params ? params.userKey : "";
  //   const host = params ? params.userKey : "";
  // console.log("host", host);

  try {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    let leaderObj: UserInterface | null = null;
    // console.log("hi");

    if (host) {
      const profileLeader = await db
        .collection("users")
        .where("userKey", "==", host)
        .get();
      // console.log("profileLeader", profileLeader);

      if (profileLeader.docs.length > 0) {
        // console.log(profileLeader.docs, "profileLeadeerrr");

        leaderObj = profileLeader.docs[0].data() as UserInterface;
        // console.log("le", leaderObj);
      }
    }

    // console.log("hi 2");

    const [allLeaders, remTeams] = await Promise.all([
      db
        .collection("leaderBoard")
        .where("socialBoat", "==", true)
        .orderBy("manualRank", "asc")
        .limit(30)
        .get(),
      db.collection("sbEvents").orderBy("manualRank", "asc").get(),
    ]);

    const returnLeaders: LandingLeaderboard[] = [];
    for (const leader of allLeaders.docs) {
      const tmpLeader = leader.data() as LeaderBoard;

      if (typeof tmpLeader.manualRank === "number") {
        returnLeaders.push({
          id: tmpLeader.uid,
          wins: tmpLeader.wins ? tmpLeader.wins : 0,
          teamWins: tmpLeader.teamWins ? tmpLeader.teamWins : 0,
          totalCalories: tmpLeader?.totalCalories ? tmpLeader.totalCalories : 0,
          totalFitPoints: tmpLeader.totalFitPointsV2
            ? tmpLeader.totalFitPointsV2
            : 0,
          rank: tmpLeader.manualRank,
          userLevel: tmpLeader.userLevelV2 ? tmpLeader.userLevelV2 : 0,
          name: tmpLeader.name ? tmpLeader.name : "",
          progress: tmpLeader.progressV2 ? tmpLeader.progressV2 : 0,
          media: tmpLeader.profileImage ? [tmpLeader.profileImage] : [],
          text: tmpLeader.testimonial
            ? tmpLeader.testimonial
            : tmpLeader.bio
            ? tmpLeader.bio
            : "",
        });
      }
    }

    // console.log("hi 3");

    const teamKPIs: {
      [id: string]: TeamKPI;
    } = {};
    for (const remTeam of remTeams.docs) {
      const team = remTeam.data() as EventInterface;

      const teamKPI = await getTeamKPI(db, team);

      returnLeaders.push({
        id: team.id,
        wins: teamKPI.wins,
        teamWins: teamKPI.teamWins,
        totalCalories: teamKPI.totalCalories,
        totalFitPoints: teamKPI.totalFitPoints,
        rank: team.manualRank ? team.manualRank : 100,
        userLevel: teamKPI.level,
        name: team.name,
        media: teamKPI.media,
        text: team.description ? team.description : "",
        progress: teamKPI.progress,
      });
    }

    // console.log("hi 4", returnLeaders.length);

    return {
      revalidate: 1,
      props: {
        leader: leaderObj,
        leaders: returnLeaders.sort((a, b) =>
          a.rank && b.rank ? a?.rank - b?.rank : 0
        ),
        teamKPIs,
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      revalidate: 1,
      props: {
        leaders: [],
        leader: undefined,
      },
    };
  }
};
