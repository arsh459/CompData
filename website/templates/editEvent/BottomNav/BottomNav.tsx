import BottomElement from "./BottomElement";

interface Props {
  elements: ButtonElement[];
}

export type navHeadings = "View" | "Edit";

export interface ButtonElement {
  name: navHeadings;
  icon: string;
  onClick: (newHeading: navHeadings) => void;
  selected: boolean;
}

const BottomNav: React.FC<Props> = ({ elements }) => {
  return (
    <div className="flex justify-evenly">
      {elements.map((item) => {
        return (
          <div className="flex-1" key={item.name}>
            <BottomElement {...item} />
          </div>
        );
      })}
    </div>
  );
};

export default BottomNav;
