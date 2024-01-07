import Button from "@components/button";
import { useAllSbPlans } from "@hooks/sbplan/useAllSbPlans";
// import { useRewardReminders } from "@hooks/messages/useRewardReminders";
import { Link } from "@mui/material";
// import { format } from "date-fns";

interface Props {}

const SbPlansListTemplate: React.FC<Props> = ({}) => {
  const { allSbPlans, nextExists, onNext } = useAllSbPlans(5);

  return (
    <div className="py-8 px-2 ">
      <div className="flex pb-4">
        <Link href={`/admin/sbplans/addSt`}>
          <Button appearance="contained">Add New Plan</Button>
        </Link>
      </div>

      <p>list of SocialBoat Plans</p>
      <div className="flex flex-wrap">
        <div className="flex flex-wrap">
          {allSbPlans?.map((item) => {
            return (
              <div key={item.id} className="border p-4 m-2">
                <Link href={`/admin/sbplans/${item.id}`}>
                  <p>id:{item.id}</p>
                  <p>name:{item?.name}</p>
                  <p>razorpayId:{item?.razorpayId}</p>
                  <p>appSubId:{item?.appSubId}</p>
                  <p>gameId:{item?.gameId}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {nextExists ? (
        <div className="flex pb-4">
          <Button appearance="contained" onClick={onNext}>
            Fetch More
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default SbPlansListTemplate;
