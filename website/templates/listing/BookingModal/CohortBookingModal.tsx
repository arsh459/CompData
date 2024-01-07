// import Button from "@components/button";
import { LocalCohort } from "@models/Event/Event";
import Price from "../HeadingSection/Price";
import CohortElement from "./CohortElement";

interface Props {
  cost: number;
  currency?: string;
  // numSeatsLeft: number;
  // registrationsClose?: Date | null;
  onClick: (newId: string) => void;
  link?: string;
  // validCode?: boolean;
  // cohortSize?: number;
  // seatsBooked?: number;
  cohorts: LocalCohort[];
  cta: string;
  keyWord: string;
  // name: string;
}

const CohortBookingModal: React.FC<Props> = ({
  currency,
  cost,
  // numSeatsLeft,
  //   registrationsClose,
  cohorts,
  link,
  onClick,
  // validCode,
  // cohortSize,
  // seatsBooked,
  keyWord,
  cta,
  // name,
}) => {
  // console.log("keyWord", keyWord);
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

      <div>
        {cohorts.map((item) => {
          return (
            <div className="pb-4" key={item.id}>
              <CohortElement
                // price={cost}
                buttonPlacement="responsive"
                cohort={item}
                link={link}
                cta={item.cohortSize <= item.seatsBooked ? "Sold out" : cta}
                onClick={
                  item.cohortSize <= item.seatsBooked
                    ? () => {}
                    : () => onClick(item.id)
                }
                keyWord={keyWord}
              />
            </div>
          );
        })}
        {cohorts.length === 0 ? (
          <div className="pb-4">
            <CohortElement
              link={link}
              keyWord={keyWord}
              buttonPlacement="bottom"
              cta={cta}
              onClick={() => onClick("")}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CohortBookingModal;
