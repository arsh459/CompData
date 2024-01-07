import { useGPTPrompts } from "@models/AppConfiguration/hooks/useGPTPrompts";
import PromptsListElement from "./PromptsListElement";

const PromptsList = () => {
  const { gptPrompts } = useGPTPrompts();
  return (
    <div className="flex justify-start items-start flex-wrap">
      {gptPrompts.length > 0
        ? gptPrompts.map((item, index) => {
            return <PromptsListElement item={item} key={`${item.id}`} />;
          })
        : null}
    </div>
  );
};

export default PromptsList;
