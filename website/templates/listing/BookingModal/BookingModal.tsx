import Button from "@components/button";
import Price from "../HeadingSection/Price";

interface Props {
  cost?: number;
  currency?: string;
  // numSeatsLeft: number;
  registrationsClose?: Date | null;
  onClick: () => void;
  validCode?: boolean;
  cohortSize?: number;
  seatsBooked?: number;
  // name: string;
}

const BookingModal: React.FC<Props> = ({
  currency,
  cost,
  // numSeatsLeft,
  registrationsClose,
  onClick,
  validCode,
  cohortSize,
  seatsBooked,
  // name,
}) => {
  // console.log("registrationsClose", registrationsClose);
  return (
    <div className="shadow-xl hover:shadow-2xl w-full max-w-xs p-4 border rounded-lg">
      {cost ? (
        <div className="flex items-center">
          {currency && cost ? <Price currency={currency} price={cost} /> : null}
          <p className="pl-1 text-gray-500">/ person</p>
        </div>
      ) : (
        <p className="text-xl text-gray-500">Free</p>
      )}
      <div className="flex pt-2">
        {/* <p className="text-gray-700 font-semibold">{name}</p> */}
      </div>
      <div className="flex pt-1">
        <p className="text-gray-500 pr-2">Slots left in cohort:</p>
        <p className="text-orange-500">
          {typeof cohortSize === "number" && typeof seatsBooked === "number"
            ? cohortSize - seatsBooked
            : 5}
        </p>
      </div>

      {registrationsClose ? (
        <div className="pt-1">
          <p className="text-gray-500 pr-2 text-sm font-medium">
            Deadline to register:
          </p>
          <p className="text-orange-500 text-sm">
            {registrationsClose.toLocaleDateString("default", {
              month: "short",
              day: "2-digit",
              hour: "numeric",
              weekday: "short",
              hour12: true,
              minute: "2-digit",
            })}
          </p>
        </div>
      ) : null}

      <div className="pt-4">
        <Button appearance="contained" onClick={onClick} type="submit">
          <div>
            <p className="capitalize pl-8 pr-8">
              {validCode ? "Join the boat" : "Book now"}
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default BookingModal;
