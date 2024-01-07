import Button from "@components/button";
import { useUserHealthCheckins } from "@hooks/healthcheckins/useUserHealthCheckins";
import { Link } from "@mui/material";

interface Props {
  userId?: string;
}

const UserHealthCheckinTemplate: React.FC<Props> = ({ userId }) => {
  const { allHealthCheckins, nextExists, onNext } = useUserHealthCheckins(
    100,
    userId
  );

  return (
    <div className="py-8 px-2 ">
      <div className="flex pb-4">
        <Link href={`/admin/healthcheckins/${userId}/addCheckins`}>
          <Button appearance="contained">Add New HealthCheckins</Button>
        </Link>
      </div>

      <p>list of HealthCheckins</p>
      <div className="flex flex-wrap">
        <div className="flex flex-wrap">
          {allHealthCheckins?.map((item) => {
            return (
              <div key={item.id} className="border p-4 m-2">
                <Link href={`/admin/u/${userId}/healthcheckins/${item.id}`}>
                  <p>id:{item.id}</p>
                  <p>text:{item?.name}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {nextExists ? (
        <div className="flex pb-4">
          {/* <Link href={`/admin/stories/add`}> */}
          <Button appearance="contained" onClick={onNext}>
            Fetch More
          </Button>
          {/* </Link> */}
        </div>
      ) : null}
    </div>
  );
};

export default UserHealthCheckinTemplate;
