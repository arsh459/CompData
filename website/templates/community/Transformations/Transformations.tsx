import { WOMENS_GAME } from "@constants/gameStats";
import { Testimonial } from "@models/Testimonial/interface";
import { Link } from "@mui/material";
import NextButton from "../Program/NextButton";
import TestimonialCard from "./TestimonialCard";

interface Props {
  testimonials?: Testimonial[];
  onNext: () => void;
  nextExists: boolean;
  isAdmin: boolean;
  eventKey?: string;
  gameId?: string;
}

const Transformations: React.FC<Props> = ({
  testimonials,
  onNext,
  nextExists,
  isAdmin,
  eventKey,
  gameId,
}) => {
  return (
    <>
      <div
        className="masonry"
        // className="flex flex-wrap justify-between"
      >
        {testimonials?.map((item) => {
          if (
            (gameId && gameId === WOMENS_GAME && item.isFemale) ||
            gameId !== WOMENS_GAME
          ) {
            return (
              <div key={item.id} className="w-full pb-2">
                <div className="flex ">
                  <TestimonialCard testimonial={item} />
                </div>
                {isAdmin ? (
                  <Link href={`/admin/testimonials/add?id=${item.id}`}>
                    <p className="text-orange-500 text-sm underline cursor-pointer">
                      Edit
                    </p>
                  </Link>
                ) : null}
              </div>
            );
          }
        })}
      </div>
      {nextExists ? (
        <div className="bg-white w-full">
          <NextButton onClick={onNext} />
        </div>
      ) : null}
    </>
  );
};

export default Transformations;
