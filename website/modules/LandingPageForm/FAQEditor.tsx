import { FAQDATA } from "@templates/joinBoatTemplate/utils";
import { TextField } from "@mui/material";

interface Props {
  faq: FAQDATA;
  deleteFAQ: (id: string) => Promise<void>;
  updateFAQ: (newFAQ: FAQDATA) => Promise<void>;
  updateLocalFAQ: (key: "heading" | "text", value: string) => void;
}

// const dayArray = Array.apply(null, Array(36));

const FAQEditor: React.FC<Props> = ({
  faq,
  deleteFAQ,
  updateFAQ,
  updateLocalFAQ,
}) => {
  //   const { badge, setBadge } = useBadge(gameId, badgeId);

  return (
    <div className="p-4 border">
      <div className="py-4">
        <div className="pt-8">
          <TextField
            style={{ width: "100%" }}
            label={"Heading"}
            variant="outlined"
            onChange={(val) => updateLocalFAQ("heading", val.target.value)}
            value={faq?.heading}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="pt-8">
          <TextField
            style={{ width: "100%" }}
            label={"Text"}
            variant="outlined"
            onChange={(val) => updateLocalFAQ("text", val.target.value)}
            value={faq?.text}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <div className="flex">
        <p onClick={() => deleteFAQ(faq.id)} className="text-red-500 px-4">
          Delete
        </p>
        <p onClick={() => updateFAQ(faq)} className="text-green-500 px-4">
          Save
        </p>
      </div>
    </div>
  );
};

export default FAQEditor;
