import { useGptResponses } from "../hooks/useGptResponses";
import ResponseListElement from "./ResponseListElement";

const ResponseList = () => {
  const { gptResponses } = useGptResponses();
  return (
    <div className="flex items-start justify-start flex-wrap ">
      {gptResponses.length > 0
        ? gptResponses
            .sort((a, b) => {
              return b.createdOn - a.createdOn;
            })
            .map((item, index) => {
              return <ResponseListElement item={item} key={`${item.id}`} />;
            })
        : null}
    </div>
  );
};

export default ResponseList;
