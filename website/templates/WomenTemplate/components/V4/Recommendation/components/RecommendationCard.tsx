import { RecommendationV2CardInterface } from "../data/data";

interface Props {
  item: RecommendationV2CardInterface;
  index: number;
}

const RecommendationCard: React.FC<Props> = ({ item }) => {
  return (
    <div
      className=" backdrop-blur-2xl  z-10 pt-2 px-2 pb-4 rounded-3xl flex flex-col justify-center"
      style={{
        background:
          "linear-gradient(180deg, rgba(134, 175, 255, 0.30) 0%, rgba(124, 103, 255, 0.30) 100%)",
      }}
    >
      <div
        className={`${
          item.bgTransparent ? "px-6 pt-12 item-end" : " items-start"
        } ${
          item.imagePop && "items-end justify-center"
        }  w-[25rem] flex  h-[15.5rem]  rounded-3xl`}
        style={{
          background: item.imagePop
            ? "linear-gradient(180deg, rgba(134, 175, 255, 0.30) 0%, rgba(124, 103, 255, 0.30) 100%)"
            : "",
        }}
      >
        {item.imageType === "Doctor" ? (
          <img className=" w-1/2" src={item.cardImage} />
        ) : item.imageType === "Bowl" ? (
          <img className="sm:w-[20rem] w-[12rem]" src={item.cardImage} />
        ): <img src={item.cardImage} />}
      </div>
      <div className=" px-4">
        <h1 className=" font-pJSEL text-[#382B67] font-semibold text-base mt-4">
          {item.content}
        </h1>
      </div>
    </div>
  );
};
export default RecommendationCard;
