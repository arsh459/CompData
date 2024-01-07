import {
  archiveResponse,
  gptPrompts,
  gptTaskType,
} from "@models/AppConfiguration/Config";
// import Link from "next/link";
import { format } from "date-fns";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import Link from "next/link";
import { query, collection, where, getDocs } from "firebase/firestore";

interface Props {
  item: archiveResponse;
}
const ResponseListElement: React.FC<Props> = ({ item }) => {
  const [promptId, setPromptId] = useState<string>();
  function isContentParsable(content: string) {
    try {
      const isParsable = JSON.parse(content);
      if (isParsable) {
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  useEffect(() => {
    async function fetchPrompt(type: gptTaskType) {
      try {
        const remodoc = await getDocs(
          query(collection(db, "gptPrompts"), where("type", "==", type))
        );
        if (remodoc && remodoc.docs && remodoc.docs.length > 0) {
          let data = remodoc.docs[0].data() as gptPrompts;
          setPromptId(data.id);
        } else {
          setPromptId(undefined);
        }
      } catch (e) {
        setPromptId(undefined);
        console.log("error", "Prompt not Available");
      }
    }
    if (item?.type) {
      fetchPrompt(item.type as gptTaskType);
    }
  }, [item]);

  let errorMessage = undefined;
  try {
    if (item.errorMessage) errorMessage = JSON.parse(item.errorMessage);
  } catch (err) {
    console.log("error in parsing the error message");
  }

  const color =
    !isContentParsable(item.choices[0].message.content) || item.errorMessage
      ? "#FF3131"
      : "#000000";
  return (
    <div
      className={clsx("mr-8 mb-8 border-2 border-black w-fit p-4 rounded-lg")}
      style={{ borderColor: color }}
    >
      <Link href={`gptresponses/${item.id}`}>
        <div className="">
          <span className="font-bold" style={{ color: color }}>
            Id:
          </span>{" "}
          {item.id}
        </div>
      </Link>
      <Link href={`gptresponses/${item.id}`}>
        <div>
          <span className="font-bold" style={{ color: color }}>
            CreatedOn:{" "}
          </span>
          {format(item.createdOn, "yyyy-MM-dd, hh:mm a")}
        </div>
      </Link>
      <Link href={`gptresponses/${item.id}`}>
        <div>
          <span className="font-bold" style={{ color: color }}>
            CreatedBy:{" "}
          </span>
          {item.uid}
        </div>
      </Link>
      <Link href={`gptresponses/${item.id}`}>
        <div>
          <span className="font-bold" style={{ color: color }}>
            Model:
          </span>
          {item.model}
        </div>
      </Link>
      <Link
        href={promptId ? `prompts/${promptId}` : `gptresponses/${item.id}`}
        target="_blank"
      >
        <div className={clsx(promptId ? "text-blue-500" : "text-red-500")}>
          <span className="font-bold" style={{ color: color }}>
            Prompt used:{" "}
          </span>
          {item.type}
        </div>
      </Link>
      {item.errorMessage && (
        <Link href={`gptresponses/${item.id}`}>
          <div>
            <span className="font-bold" style={{ color: color }}>
              Error:
            </span>
            {errorMessage && errorMessage.code ? errorMessage.code : ""}
          </div>
        </Link>
      )}
    </div>
  );
};
export default ResponseListElement;
