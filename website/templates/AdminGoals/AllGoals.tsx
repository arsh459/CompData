import { useActiveGames } from "@hooks/games/useActiveGames";
// import { useAllGoals } from "@hooks/goals/useAllGoals";
// import { Button, Link } from "@mui/material";
// import clsx from "clsx";
import GameAdder from "./GameAdder";

// import { adminGamesQuery } from "./useAdminGames";

interface Props {
  // urlState?: adminGamesQuery;
  // onGameChange: (id: string) => void;
}

const AllGoals: React.FC<Props> = ({}) => {
  // const { goals } = useAllGoals();
  const { games } = useActiveGames();

  return (
    <div>
      {games.map((item) => {
        return (
          <div key={item.id} className="p-4 m-4 border">
            <p>{item.name}</p>
            <GameAdder
              gameId={item.id}
              selectedKPIs={
                item.configuration?.kpis ? item.configuration.kpis : []
              }
            />
          </div>
        );
      })}
    </div>
  );

  // return (
  //   <>
  //     <div className="pt-4 px-4 flex justify-start">
  //       <a href={`/addActivity/newGoal`}>
  //         <Button variant="contained">Create new</Button>
  //       </a>
  //     </div>
  //     <div className="flex flex-wrap p-4">
  //       {goals.map((item) => {
  //         // console.log(item.id);
  //         return (
  //           <div
  //             onClick={() => {}}
  //             key={item.id}
  //             className={clsx(
  //               "",
  //               "border p-4",
  //               // urlState?.gameId === item.id ? "font-bold" : "font-light",
  //               "cursor-pointer text-lg w-max py-1"
  //             )}
  //           >
  //             <p className="font-semibold">{item.name}</p>
  //             {item.goalKPIs?.map((item2) => {
  //               return (
  //                 <div
  //                   className="p-2 border-yellow-500 border"
  //                   key={`${item.id}-${item2.unitLabel}`}
  //                 >
  //                   <div className="flex">
  //                     <p>Target: {item2.targetVal}</p>
  //                     <p className="pl-2"> {item2.unitLabel}</p>
  //                   </div>
  //                   <p>Icon: {item2.iconType}</p>
  //                 </div>
  //               );
  //             })}

  //             <p>lvl: {item.level}</p>
  //             <p>FPs: {item.fitPoints}</p>

  //             <div>
  //               <GameAdder goal={item} games={games} />
  //             </div>

  //             <div>
  //               <Link href={`/addActivity/${item.id}`}>
  //                 <p>Edit</p>
  //               </Link>
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </>
  // );
};

export default AllGoals;
