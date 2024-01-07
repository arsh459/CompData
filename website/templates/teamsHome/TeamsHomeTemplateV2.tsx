// import { STUDENT_OLYMPICS } from "@constants/gameStats";
import { useActiveGames } from "@hooks/games/useActiveGames";
// import { Link } from "@mui/material";
import { UserInterface } from "@models/User/User";
import HeaderV4 from "@templates/community/Header/HeaderV4";
import DiscoverGamesV2 from "./DiscoverGamesV2";
// import HomeGoalWidget from "./GoalWidget/HomeGoalWidget";
// import SuggestedTask from "./SuggestedTask";
// import TeamsViewV2 from "./TeamsViewV2";
// import { useTeamsHomeData } from "./useTeamsHomeData";

interface Props {
  setAuthIsVisible: () => void;
  signedInUser?: UserInterface;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
}

const TeamsHomeTemplateV2: React.FC<Props> = ({
  setAuthIsVisible,
  signedInUser,
  authStatus,
}) => {
  // const {
  //   userEvents,
  //   onNext,
  //   gameTeams,
  //   //  suggestedTasks, loading
  // } = useTeamsHomeData(signedInUser);
  const { games } = useActiveGames();

  // return (
  //   <div className="max-w-md mx-auto text-[#203C51] h-full flex flex-col justify-center items-center">
  //     <p className="text-xl font-bold text-center">Select your Universe</p>
  //     {games.map((item) => {
  //       return (
  //         <div key={item.id} className="w-full">
  //           <Link
  //             href={
  //               item.id === STUDENT_OLYMPICS
  //                 ? "https://socialboat.page.link/FhSa"
  //                 : "https://socialboat.page.link/FhSa"
  //             }
  //           >
  //             <MediaTile
  //             <div className="border rounded-lg w-full cursor-pointer p-4 my-4">
  //               <p className="text-lg font-bold">{item.name}</p>
  //             </div>
  //           </Link>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );

  return (
    <div className="max-w-md mx-auto text-[#203C51]">
      <HeaderV4
        onSignIn={setAuthIsVisible}
        signedInUser={signedInUser}
        authStatus={authStatus}
        headingText={signedInUser ? "Hello, " : " Let's "}
        headingLightText={`${signedInUser ? signedInUser.name : "Workout"}!`}
        bgClassStr="bg-white "
        tone="dark"
        noSignIn={true}
      />
      <DiscoverGamesV2
        games={games}
        gameTeams={{}}
        vertical={true}
        signedInUser={signedInUser}
        authStatus={authStatus}
      />

      {/* {authStatus === "FAILED" ||
      !signedInUser ||
      userEvents.length === 0 ? null : (
        <>
          <div className="p-4 pb-8">
            <HomeGoalWidget
              user={signedInUser}
              gamesObj={gamesObj}
              userEvents={userEvents}
              gameTeams={gameTeams}
              allGames={games}
            />
          </div>
          <SuggestedTask
            suggestedTasks={suggestedTasks}
            gameTeams={gameTeams}
            loading={loading}
          />
          <TeamsViewV2 userEvents={userEvents} onNext={onNext} />
        </>
      )}
      <DiscoverGamesV2
        games={activeGames}
        gameTeams={gameTeams}
        vertical={userEvents.length === 0}
        signedInUser={signedInUser}
        authStatus={authStatus}
      /> */}
    </div>
  );
};

export default TeamsHomeTemplateV2;
