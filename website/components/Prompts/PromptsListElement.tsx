import { gptPrompts } from "@models/AppConfiguration/Config";
import Link from "next/link";
interface Props {
  item: gptPrompts;
}
const PromptsListElement: React.FC<Props> = ({ item }) => {
  return (
    <div className="mr-8 mb-8 border border-black w-fit p-4 rounded-lg">
      <Link href={`prompts/${item.id}`}>
        <div className="">
          <span className="font-bold">Id:</span> {item.id}
        </div>
      </Link>
      <Link href={`prompts/${item.id}`}>
        <div>
          <span className="font-bold">Type: </span>
          {item.type}
        </div>
      </Link>
      <Link href={`prompts/${item.id}`}>
        <div>
          <span className="font-bold">Model:</span>
          {item.model}
        </div>
      </Link>
      <Link href={`prompts/${item.id}`}>
        <div>
          <span className="font-bold">Max Tokens:</span> {item.max_tokens}
        </div>
      </Link>
    </div>
  );
};
export default PromptsListElement;
