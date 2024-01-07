import { useBadgeFAQs } from "@hooks/badges/useBadgeFAQs";
import { Button } from "@mui/material";
import FAQEditor from "./FAQEditor";
// import { useBadgeTasks } from "@hooks/badges/useBadgeTasks";

interface Props {
  gameId: string;
  badgeId: string;
}

// const dayArray = Array.apply(null, Array(36));

const FAQForm: React.FC<Props> = ({ gameId, badgeId }) => {
  //   const { badge, setBadge } = useBadge(gameId, badgeId);
  const { addFAQ, faq, updateLocalFAQ, deleteFAQ, updateFAQ } = useBadgeFAQs(
    gameId,
    badgeId
  );

  //   console.log("faq", faq);

  return (
    <div className="p-4">
      <div className="flex">
        <Button onClick={addFAQ}>Add FAQ</Button>
      </div>

      <div className="pt-8 flex flex-wrap">
        {faq.map((item, index) => {
          return (
            <div className="m-4" key={item.id}>
              <FAQEditor
                faq={item}
                deleteFAQ={deleteFAQ}
                updateFAQ={updateFAQ}
                updateLocalFAQ={(key: "heading" | "text", value: string) =>
                  updateLocalFAQ(index, key, value)
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQForm;
