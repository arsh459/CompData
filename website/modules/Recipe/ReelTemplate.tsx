import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { Task } from "@models/Tasks/Task";
import { Background } from "@templates/WomenTemplate/components/Background";
import LandingHeaderV2 from "@templates/WomenTemplate/components/V3/LandingHeaderV2";
import { format } from "date-fns";
import RecipeDetails from "./RecipeDetails";
import RecipeMedia from "./RecipeMedia";
import { ArticleJsonLd } from "next-seo";

interface Props {
  task: Task;
  isReel: boolean;
}

const ReelTemplate: React.FC<Props> = ({ task, isReel }) => {
  const { coachRef } = useCoachAtt();
  const { user } = useUserV2(task?.userId);

  return (
    <>
      <ArticleJsonLd
        url={`https://socialboat.live/reel/${task?.id}`}
        title={task?.name || "task name"}
        images={[task?.reelThumbnail?.url || "", user?.profileImage?.url || ""]}
        datePublished={format(task.createdOn, "yy-mm-dd")}
        dateModified={format(task.updatedOn, "yy-mm-dd")}
        authorName={user?.name || ""}
        publisherName="SocialBoat"
        publisherLogo={
          "https://ik.imagekit.io/socialboat/Component_6__1__CgPWY-2O0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663242315232"
        }
        description={task?.description || ""}
      />
      <div className=" w-screen h-screen relative z-0">
        <Background imgUrl="https://ik.imagekit.io/socialboat/women%20website%20page%20274_PLTBmyeyE.png?updatedAt=1691336800919" />
        <LandingHeaderV2
          route={`/start?origin=blog${coachRef ? `&${coachRef}` : ""}`}
          btnText="Start Journey"
          coachRef={coachRef}
          activeLink="link_2"
        />

        <div className="w-full flex-1 pt-[10vh] flex justify-center items-center max-w-screen-lg mx-auto">
          <div className="relative   w-full aspect-[1110/871] z-0    flex flex-col sm:flex-row">
            <RecipeMedia task={task} />
            <RecipeDetails isReel={isReel} task={task} user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReelTemplate;
