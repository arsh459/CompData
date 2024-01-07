import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { Task } from "@models/Tasks/Task";
import { Background } from "@templates/WomenTemplate/components/Background";
import LandingHeaderV2 from "@templates/WomenTemplate/components/V3/LandingHeaderV2";
import { format, formatISO } from "date-fns";
import { RecipeJsonLd } from "next-seo";
import RecipeDetails from "./RecipeDetails";
import RecipeMedia from "./RecipeMedia";

interface Props {
  task: Task;
  isReel: boolean;
}

const RecipeTemplate: React.FC<Props> = ({ task, isReel }) => {
  const { coachRef } = useCoachAtt();
  const { user } = useUserV2(task?.userId);
  const ingredientsArr = task?.ingredients?.map((i) => i.name);
  const formattedInstructions = task?.cookingInstruction?.map((i) => ({
    name: i,
    text: i,
  }));
  const dateObject = task.createdOn ? new Date(task.createdOn * 1000) : "";

  const dateFormatted = dateObject
    ? formatISO(dateObject, { format: "extended" })
    : "";
  return (
    <>
      <RecipeJsonLd
        name={task?.name || "recipe name"}
        description={task?.description || "recipe description"}
        datePublished={format(task.createdOn, "yy-mm-dd")}
        authorName={user?.name || ""}
        prepTime={task?.prepTime}
        cookTime={task?.cookTime}
        totalTime={task?.totalTime}
        keywords={task?.tags?.join(",")}
        yields={task?.yields}
        category={task?.category}
        cuisine={task?.cuisine}
        calories={task?.kcal}
        images={[task?.reelThumbnail?.url || ""]}
        ingredients={ingredientsArr || []}
        instructions={formattedInstructions || []}
        video={{
          name: task?.name || "",
          description: task?.description || "",
          contentUrl: task.reelMedia?.url,
          embedUrl: task.reelMedia?.url,
          uploadDate: dateFormatted || "",

          thumbnailUrls: [task.reelThumbnail?.url || ""],
        }}
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

export default RecipeTemplate;
