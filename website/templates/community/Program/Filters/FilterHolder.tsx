import { postFilters } from "@hooks/community/usePostsV2";
import PostButton from "../Post/PostButton";
import PostIcons from "../Post/PostIcons";

interface Props {
  onClick: (newFilter: postFilters) => void;
  selected: postFilters;
  onPostRequest: () => void;
}

const FilterHolder: React.FC<Props> = ({
  selected,
  onClick,
  onPostRequest,
}) => {
  return (
    <div className="flex overflow-x-auto scrollbar-hide no-scrollbar">
      {/* <div> */}
      <PostIcons onButtonPress={onPostRequest} />
      {/* </div> */}
      {/* <div onClick={() => onClick("all")}> */}
      <PostButton
        onClick={() => onClick("all")}
        selected={selected === "all"}
        selectedImg="https://img.icons8.com/ios/100/000000/globe--v1.png"
        img="https://img.icons8.com/ios/100/000000/globe--v1.png"
        text="All posts"
      />
      {/* </div> */}

      <PostButton
        selected={selected === "byCoach"}
        onClick={() => onClick("byCoach")}
        selectedImg="https://img.icons8.com/external-blue-red-juicy-fish/100/000000/external-coach-education-blue-red-blue-red-juicy-fish.png"
        img="https://img.icons8.com/external-blue-red-juicy-fish/100/000000/external-coach-education-blue-red-blue-red-juicy-fish.png"
        text="By Coach"
      />

      <PostButton
        onClick={() => onClick("byMe")}
        img="https://img.icons8.com/pastel-glyph/64/000000/person-male--v3.png"
        selectedImg="https://img.icons8.com/pastel-glyph/64/000000/person-male--v3.png"
        text="By me"
        selected={selected === "byMe"}
      />
    </div>
  );
};

export default FilterHolder;
