import { usePaidUsers } from "@hooks/paidStatus/usePaidUsers";
import { useWatchUsers } from "@hooks/paidStatus/useWatchUsers";
import Link from "next/link";
import PaidCardComponent from "./PaidCard";

const PaidUsers: React.FC = ({}) => {
  const { paidCards } = usePaidUsers();
  const watching = useWatchUsers();
  return (
    <>
      <div className="pt-8">
        <div>
          <p className="px-4 text-red-500 font-bold">WEB ACTIVE PAID</p>
        </div>
      </div>
      <div className="flex flex-wrap">
        {paidCards.map((item) => {
          return (
            <Link key={item.uid} href={`/admin/u/${item.uid}/recs`}>
              <PaidCardComponent card={item} />
            </Link>
          );
        })}
      </div>

      <div className="pt-8">
        <div>
          <div className="flex">
            <p className="px-4 text-red-500 font-bold">WATCH USERS</p>
            <Link href={`/admin/u/watchList`}>
              <p className="px-4 underline text-blue-500">Edit Watchlist</p>
            </Link>
          </div>
          <div className="flex flex-wrap">
            {watching.paidCards.map((item) => {
              return (
                <Link key={item.uid} href={`/admin/u/${item.uid}/recs`}>
                  <PaidCardComponent check={true} card={item} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaidUsers;
