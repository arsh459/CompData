import { useTestimonials } from "@hooks/testimonials/useTestimonial";
import { Link } from "@mui/material";
// import { Link } from "@mui/material";
import AddIcon from "./AddIcon";
import Transformations from "./Transformations";

interface Props {
  isAdmin: boolean;
  eventKey?: string;
  gameId?: string;
}

const TransformationsSection: React.FC<Props> = ({
  isAdmin,
  gameId,
  eventKey,
}) => {
  const { testimonials, videoTestimonials, onNext, nextExists } =
    useTestimonials(400);

  return (
    <div>
      <div className="flex items-center">
        <p className="text-gray-700 font-semibold text-xl">Why participate?</p>
        {isAdmin ? (
          <div className="pl-2">
            <Link href={`/admin/testimonials/add?id=new`}>
              <AddIcon />
            </Link>
          </div>
        ) : null}
      </div>

      <div className="pt-4">
        <Transformations
          testimonials={[...testimonials, ...videoTestimonials]}
          onNext={onNext}
          eventKey={eventKey}
          isAdmin={isAdmin}
          nextExists={nextExists}
          gameId={gameId}
        />
      </div>
    </div>
  );
};

export default TransformationsSection;
