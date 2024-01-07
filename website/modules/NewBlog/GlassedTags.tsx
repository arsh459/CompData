import React from "react";
import Tags from "./Tags";

interface GlassedTagsProps {
  // tags?: (Tag | undefined)[];
  selectedTags: string[];
  tags?: { [key: string]: string };
  onSearchTagsChange: (val: string) => void;
  onSearchStrChange: (val: string) => void;
}
const GlassedTags: React.FC<GlassedTagsProps> = ({
  tags,
  onSearchTagsChange,
  onSearchStrChange,
  selectedTags,
}) => {
  // console.log({ selectedTags });

  // let filterTimeout: NodeJS.Timeout;
  // const onChange = (text: string) => {
  //   clearTimeout(filterTimeout);

  //   filterTimeout = setTimeout(() => {
  //     onSearchStrChange(text);
  //   }, 1000);
  // };

  return (
    <div className="bg-[#FFFFFF24] backdrop-blur-2xl  py-5 absolute left-0 right-0 bottom-0">
      {/* <div className="flex py-1.5 w-[90%] lg:w-full  max-w-5xl  mx-auto bg-[#FFFFFF24] rounded-3xl pl-4">
        <img
          src="https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/search20_MnqlFHiqA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675158445394"
          alt="blog search icon"
          className="w-4 lg:w-5 aspect-h-4 lg:aspect-h-4   rounded-l-3xl object-contain "
        />
        <input
          type="text"
          className="   text-white flex-1 bg-transparent placeholder-white focus:outline-none 
 pl-2 rounded-r-3xl "
          placeholder="Search"
          onChange={(e) => onChange(e.target.value)}
          style={{ color: "#fff" }}
        />
      </div> */}
      <div className="w-5 aspect-1" />
      <div className="w-full flex overflow-x-scroll gap-3 scrollbar-hide">
        <div className="opacity-0">
          <div className="w-[calc(calc(100vw_-_1040px)_/_2)]" />
        </div>

        {tags
          ? Object.keys(tags).map((tag, index) => (
              <div
                onClick={() => onSearchTagsChange(tag)}
                key={`${tag}_${index}`}
              >
                <Tags tag={tags[tag]} isSelected={selectedTags.includes(tag)} />
              </div>
            ))
          : null}
        <div className="opacity-0">
          <div className="w-[calc(calc(100vw_-_1040px)_/_2)]" />
        </div>
      </div>
    </div>
  );
};

export default GlassedTags;
