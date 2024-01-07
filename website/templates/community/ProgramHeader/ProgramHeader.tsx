import { navLevels } from "@hooks/community/useCommunityParams";
import ProgramTile from "./ProgramTile";

interface Props {
  nav: navLevels;
  onNavChange: (newNav: navLevels) => void;
}

const ProgramHeader: React.FC<Props> = ({ nav, onNavChange }) => {
  return (
    <div className="flex">
      <div className="pr-4">
        <ProgramTile
          onClick={() => onNavChange("program")}
          text="Program"
          selected={nav === "program"}
        />
      </div>
      {/* <div className="md:hidden">
        <ProgramTile
          onClick={() => onNavChange("me")}
          text="Me"
          selected={nav === "me"}
        />
      </div> */}
    </div>
  );
};
export default ProgramHeader;
