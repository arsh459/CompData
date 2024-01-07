import React from "react";
import { GetStaticProps } from "next";

// import LandingPageTemplate from "@templates/LandingPage";
import {
  LandingLeaderboard,
  LeaderBoard,
} from "@models/LeaderBoard/Leaderboard";
import { EventInterface } from "@models/Event/Event";
import { getTeamKPI, TeamKPI } from "server/landing/getTeamKPIs";

interface Props {
  leaders: LandingLeaderboard[];
}

const Home: React.FC<Props> = ({ leaders }) => {
  // console.log("leaders", leaders);
  return <div>{/* <LandingPageTemplate /> */}</div>;
};

export default Home;

export const getStaticProps: GetStaticProps = async ({}) => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

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
        totalCalories: tmpLeader.totalCalories ? tmpLeader.totalCalories : 0,
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
    } else {
    }
  }

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

  return {
    revalidate: 1,
    props: {
      leaders: returnLeaders.sort((a, b) =>
        a.rank && b.rank ? a?.rank - b?.rank : 0
      ),
      teamKPIs,
    },
  };
};
