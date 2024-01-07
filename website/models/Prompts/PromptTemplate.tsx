import Link from "next/link";
import PromptsList from "@components/Prompts/PromptsList";

const PromptTemplate = () => {
  return (
    <div className="p-8">
      <Link href={`/admin/prompts/add`}>
        <div
          className="px-4 py-2 rounded-lg max-w-xs mb-8"
          style={{ backgroundColor: "#ff4d4d" }}
        >
          <p className="text-white text-center">Add New Prompt</p>
        </div>
      </Link>

      <PromptsList />
    </div>
  );
};
export default PromptTemplate;
