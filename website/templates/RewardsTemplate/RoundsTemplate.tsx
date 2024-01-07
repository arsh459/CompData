import Button from "@components/button";
import { useRoundDetails } from "@hooks/roundDetails/useRoundDetails";

import { format } from "date-fns";
import Link from "next/link";
// import { format } from "date-fns";

interface Props {
  gameId: string;
}

const RoundsTemplate: React.FC<Props> = ({ gameId }) => {
  const { roundDetails } = useRoundDetails(gameId);

  return (
    <div className="py-8 px-2">
      <div className="flex pb-4">
        <Link href={`/admin/games/${gameId}/rounddetails/add`}>
          <Button appearance="contained">Add New round details</Button>
        </Link>
      </div>

      <p>list of rounds</p>
      <div className="flex flex-wrap pt-4">
        <div className="flex flex-wrap">
          {roundDetails.map((item) => {
            return (
              <div key={item.id} className="border p-4 mr-4">
                <Link href={`/admin/games/${gameId}/rounddetails/${item.id}`}>
                  <p>{item.name}</p>
                  <p>{item.fpTarget}FP</p>
                  {item.start ? (
                    <p>
                      Starts: {format(new Date(item.start), "hh:mma dd-MM-yyy")}
                    </p>
                  ) : null}
                  {item.end ? (
                    <p>
                      Ends: {format(new Date(item.end), "hh:mma dd-MM-yyy")}
                    </p>
                  ) : null}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoundsTemplate;
