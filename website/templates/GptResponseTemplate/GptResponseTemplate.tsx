import ResponseList from "./components/ResponseList";

const GptResponseTemplate = () => {
  return (
    <div className="p-8">
      <div className="pb-8">
        <p className="text-lg font-popSB tracking tracking-wide">
          Gpt Response List
        </p>
      </div>
      <ResponseList />
    </div>
  );
};
export default GptResponseTemplate;
