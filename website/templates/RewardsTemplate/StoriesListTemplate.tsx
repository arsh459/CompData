import Button from "@components/button";
import { useAllStories } from "@hooks/stories/useAllStories";
// import { useRewardReminders } from "@hooks/messages/useRewardReminders";
import { Link } from "@mui/material";
// import { format } from "date-fns";

interface Props {}

const StoriesListTemplate: React.FC<Props> = ({}) => {
  const { allStories, nextExists, onNext } = useAllStories(5);

  return (
    <div className="py-8 px-2 ">
      <div className="flex pb-4">
        <Link href={`/admin/stories/addSt`}>
          <Button appearance="contained">Add New Story</Button>
        </Link>
      </div>

      <p>list of Stories</p>
      <div className="flex flex-wrap">
        <div className="flex flex-wrap">
          {allStories?.map((item) => {
            return (
              <div key={item.id} className="border p-4 m-2">
                <Link href={`/admin/stories/${item.id}`}>
                  <p>id:{item.id}</p>
                  <p>text:{item?.title}</p>
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

export default StoriesListTemplate;
