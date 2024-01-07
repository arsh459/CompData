import Button from "@components/button";
// import { useRewardReminders } from "@hooks/messages/useRewardReminders";
import { getGameNameReadable } from "@templates/TaskTemplate/utils";
import { Link } from "@mui/material";
// import { format } from "date-fns";
import { useBenefits } from "@hooks/benefits/useBenefits";

interface Props {
  gameId: string;
}

const BenefitsTemplate: React.FC<Props> = ({ gameId }) => {
  const { benefits } = useBenefits(gameId);
  return (
    <div className="py-8 px-2">
      <div className="flex pb-4">
        <Link href={`/admin/games/${gameId}/benefits/add`}>
          <Button appearance="contained">Add New Benefit</Button>
        </Link>
      </div>

      <div className="flex flex-wrap">
        {benefits.map((item) => {
          return (
            <div
              key={item.id}
              className="w-full md:w-1/2 lg:w-1/3 p-4 shadow-sm mb-4 border rounded-md"
            >
              <Link href={`/admin/games/${gameId}/benefits/${item.id}`}>
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>

                  <p className="font-medium text-red-500 capitalize pt-1">
                    {item.description}
                  </p>
                  <p className="font-medium">Min Badges: {item.minNumBadges}</p>
                  <p className="font-medium">Strategy: {item.strategy}</p>
                  <p className="font-medium">{getGameNameReadable(gameId)}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BenefitsTemplate;
