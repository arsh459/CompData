import BreadCrump, { BreadCrumpProps } from "./BreadCrump";

interface Props {
  breadCrumps: (BreadCrumpProps | undefined)[];
}

const BreadCrumps: React.FC<Props> = ({ breadCrumps }) => {
  return (
    <div className="flex space-x-1 items-center">
      {breadCrumps.map((item) => {
        if (item) {
          return (
            <div
              key={item.heading}
              className="max-w-[114px] md:max-w-[160px] xl:max-w-[200px]"
            >
              <BreadCrump {...item} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default BreadCrumps;
