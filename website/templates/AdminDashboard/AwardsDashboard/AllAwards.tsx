import { useAwards } from "@hooks/awards/useAwards";
import { Button } from "@mui/material";
import Link from "next/link";

interface Props {}

const AwardsDashboard: React.FC<Props> = ({}) => {
  const { awards } = useAwards();

  return (
    <div>
      <div className="p-4">
        <Link href={`/admin/awards/addNew`}>
          <Button variant="contained">Add new</Button>
        </Link>
      </div>
      <div className="flex flex-row flex-wrap">
        {awards.map((item) => {
          return (
            <Link key={item.id} href={`/admin/awards/${item.id}`}>
              <div className="text-black p-4 m-4 border">
                <p>award id: {item.id}</p>
                <p>award name: {item.name}</p>
                <p>award description: {item.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AwardsDashboard;
