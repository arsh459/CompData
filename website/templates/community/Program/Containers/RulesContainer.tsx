import { RUNNER_GAME, WOMENS_GAME } from "@constants/gameStats";
import NumberedList from "@templates/listing/NumberedList/NumberedList";
import clsx from "clsx";
import {
  howToParticipate,
  howToParticipate_run,
  whatIsGameAbout,
  whatIsGameAbout_run,
  whatIsGameAbout_women,
  howToParticipate_women,
} from "./constants";

interface Props {
  gameId?: string;
}

const RulesContainer: React.FC<Props> = ({ gameId }) => {
  return (
    <div className="bg-gray-100 h-full px-4 py-4">
      <div className="pb-4">
        <div
          className={clsx(
            gameId === WOMENS_GAME
              ? "aspect-w-2 aspect-h-3"
              : "aspect-w-16 aspect-h-9"
          )}
        >
          <iframe
            src={
              gameId === WOMENS_GAME
                ? "https://www.youtube.com/embed/bNkGVoh9Nvg"
                : gameId === RUNNER_GAME
                ? "https://www.youtube.com/embed/hr7xHQz4FKk"
                : `https://www.youtube.com/embed/i1FR3N5JcME`
            }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Fat burner Game"
          />
        </div>
      </div>

      <NumberedList
        vertical={true}
        viewStyle="desktop"
        headingSeparateLine={true}
        separator="number"
        heading="What is the game?"
        listItems={
          gameId === WOMENS_GAME
            ? whatIsGameAbout_women
            : gameId === RUNNER_GAME
            ? whatIsGameAbout_run
            : whatIsGameAbout
        }
        paddingString="pb-0"
      />
      <div className="pt-4">
        <NumberedList
          vertical={true}
          viewStyle="desktop"
          headingSeparateLine={true}
          separator="number"
          heading="How to participate?"
          listItems={
            gameId === WOMENS_GAME
              ? howToParticipate_women
              : gameId === RUNNER_GAME
              ? howToParticipate_run
              : howToParticipate
          }
          paddingString="pb-0"
        />
      </div>
    </div>
  );
};

export default RulesContainer;
