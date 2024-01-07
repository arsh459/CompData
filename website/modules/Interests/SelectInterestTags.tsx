import Tags from "@modules/NewBlog/Tags";
import { Tag } from "@tryghost/content-api";

interface Props {
  tags: (Tag | undefined)[];
  onNextHandle: () => void;
}
const SelectInterestTag: React.FC<Props> = ({ tags, onNextHandle }) => {
  return (
    <div className="w-full  flex flex-col items-center justify-start pt-24  ">
      <div className="w-full max-w-screen-lg   ">
        <div className=" w-full max-w-3xl text-white px-4  text-3xl lg:text-4xl font-popR">
          <p>Curating your curiosity ✨</p>
        </div>
        <div className="h-px w-full my-5 bg-white/25" />
        <p className=" w-full pb-6 text-left px-4 text-white font-popR text-xl max-w-3xl lg:text-2xl">
          select as many as you can
        </p>
        <div className="flex w-full max-w-4xl h-1/2 px-4 overflow-y-scroll  scrollbar-hide flex-wrap">
          {tags
            ? tags?.map((tag, index) => (
                <Tags
                  tag={tag?.name}
                  key={`${tag}_${index}`}
                  style={{
                    margin: 5,
                    //  minWidth: "10rem"
                  }}
                />
              ))
            : null}
        </div>
        <div className="w-full inset-x-0 max-w-screen-md flex justify-center pt-6 sticky md:absolute bottom-0 lg:bottom-8 mx-auto backdrop-blur-sm py-4">
          <div
            onClick={onNextHandle}
            className="w-[95%] lg:w-full  max-w-2xl   cursor-pointer rounded-xl py-2  bg-gradient-to-r from-[#DE369D] to-[#DE369D]"
          >
            <p className="text-xl text-center font-popR text-[#EAEAEA]">Next</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectInterestTag;
