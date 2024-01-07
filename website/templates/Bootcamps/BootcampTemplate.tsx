import { useBootcamps } from "@hooks/bootcamps/useBootcamps";

import { Button } from "@mui/material";
import { format } from "date-fns";
import Link from "next/link";

interface Props {}

const BootcampTemplate: React.FC<Props> = ({}) => {
  const { bootcamps } = useBootcamps();
  return (
    <div className="p-4">
      <div className="p-4">
        <Link href={`/admin/bootcamps/addNew`}>
          <Button variant="contained">Add new</Button>
        </Link>
      </div>
      <div className="pt-8 flex flex-wrap">
        {bootcamps.map((item) => {
          return (
            <div key={item.id} className="text-black p-4 m-4 border">
              <p>Name: {item.name}</p>
              <p>Length: {item.length}</p>
              <p>Host UID: {item.creatorId}</p>
              <p>Start: {format(new Date(item.start), "dd-MM-yyyy")}</p>
              <div className="flex my-4">
                <Link href={`/admin/bootcamps/${item.id}`}>
                  <Button variant="contained">Edit</Button>
                </Link>

                <div className="pl-4">
                  <Link href={`/admin/bootcamps/${item.id}/users`}>
                    <Button variant="contained">View Users</Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BootcampTemplate;
