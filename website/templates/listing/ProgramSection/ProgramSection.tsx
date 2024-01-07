import { SessionV2 } from "@models/Event/Event";
import SessionViewV2 from "@templates/community/Program/SessionViewV2";
import clsx from "clsx";

interface Props {
  heading: string;
  sessions: SessionV2[];
  viewStyle?: "mobile" | "desktop";
}

const ProgramSection: React.FC<Props> = ({ heading, viewStyle, sessions }) => {
  return (
    <div className={clsx("rounded-lg")}>
      <p className="text-2xl font-medium text-gray-700">{heading}</p>
      <div className={clsx("w-full flex flex-wrap", "")}>
        {sessions.map((item) => {
          return (
            <div
              key={item.id}
              className={
                viewStyle === "mobile" ? "w-full p-2" : "w-full md:w-1/2 p-4"
              }
            >
              <SessionViewV2
                session={item}
                onPostClick={() => {}}
                unlocked={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramSection;
