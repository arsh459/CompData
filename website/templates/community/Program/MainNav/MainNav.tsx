import { navLevels } from "@hooks/community/useCommunityParams";
import { Link } from "@mui/material";
import { NavElement } from "@templates/community/constants/constants";
import ProgramTile from "@templates/community/ProgramHeader/ProgramTile";
import clsx from "clsx";

interface Props {
  navElements: NavElement[];
  selectedNav: navLevels;
  onSelect: (newLevel: navLevels) => void;
  isAdmin: boolean;
}

const MainNav: React.FC<Props> = ({
  navElements,
  selectedNav,
  onSelect,
  isAdmin,
}) => {
  return (
    <div className="flex overflow-x-auto md:flex-col no-scrollbar">
      {navElements.map((item, index) => {
        // console.log(item.isAdmin === isAdmin, item.text);
        // if (item.key === "me") {
        //   return (
        //     <div
        //       key={`${item.key}-${index}`}
        //       className={clsx("pr-8 md:pb-2 flex-none")}
        //     >
        //       <div>
        //         <ProgramTile
        //           text={item.text}
        //           selected={selectedNav === item.key}
        //           onClick={() => onSelect(item.key)}
        //           newLabel={true}
        //         />
        //       </div>
        //     </div>
        //   );
        // } else

        if (item.link && ((item.onlyAdmin && isAdmin) || !item.onlyAdmin)) {
          return (
            <div
              key={`${item.key}-${index}`}
              className={clsx("pr-8 md:pb-2 flex-none")}
            >
              <Link href={item.link} target="_blank">
                <div>
                  <ProgramTile
                    text={item.text}
                    selected={selectedNav === item.key}
                    onClick={() => {}}
                  />
                </div>
              </Link>
            </div>
          );
        } else if (
          (!item.link && !item.onlyAdmin) ||
          (!item.link && item.onlyAdmin && isAdmin)
        ) {
          return (
            <div
              key={`${item.key}-${index}`}
              className={clsx("pr-8 md:pb-2 flex-none")}
            >
              <div>
                <ProgramTile
                  text={item.text}
                  selected={selectedNav === item.key}
                  onClick={() => onSelect(item.key)}
                />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MainNav;
