import TripleArrowRightIcon from "@components/SvgIcons/TripleArrowRightIcon";
import clsx from "clsx";

interface DayPaginationProps {
  currentPage: number;
  items: string[]; // Array of items
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
}

// const DayPagination: React.FC<DayPaginationProps> = ({
//   currentPage,
//   items,
//   itemsPerPage,
//   onPageChange,
// }) => {
//   const totalPages = Math.ceil(items.length / itemsPerPage);
//   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

//   const handleClick = (pageNumber: number) => {
//     onPageChange(pageNumber);
//   };
//   console.log({ pageNumbers });

//   return (
//     <div className="bg-[#0000004D] flex items-center  h-1/2 w-3/5 mx-4 overflow-x-scroll rounded-full">
//       <div className="flex   items-center  p-1 ">
//         {pageNumbers.map((pageNumber, idx) => (
//           <div
//             key={pageNumber}
//             onClick={() => handleClick(pageNumber)}
//             className={clsx(
//               "text-center w-[113px] py-2.5 mr-4 font-popSB transition-all duration-300  cursor-pointer text-base  ",
//               currentPage === pageNumber
//                 ? "bg-white/70 rounded-full  text-black/70 "
//                 : "text-white",
//               idx === 0 && "ml-0"
//             )}
//           >
//             Day {pageNumber + 1}
//           </div>
//         ))}
//       </div>
//     </div>
//   );

// };
import { useRef } from "react";

const DayPagination: React.FC<DayPaginationProps> = ({
  currentPage,
  items,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const handleNextClick = () => {
    const container = containerRef.current;
    if (container) {
      const containerWidth = container.offsetWidth;
      const scrollAmount = containerWidth * 0.8; // Adjust the scroll amount as needed
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handlePreviousClick = () => {
    const container = containerRef.current;
    if (container) {
      const containerWidth = container.offsetWidth;
      const scrollAmount = containerWidth * -0.8; // Adjust the scroll amount as needed
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#0000004D] flex items-center h-1/2 w-3/5 mx-4 overflow-x-scroll rounded-full">
      {currentPage > 0 && (
        <div
          onClick={handlePreviousClick}
          className="text-white cursor-pointer px-6"
        >
          <div className="w-6 h-4 rotate-180">
            <TripleArrowRightIcon />
          </div>
        </div>
      )}
      <div
        className="flex items-center p-1"
        ref={containerRef}
        style={{ scrollSnapType: "x mandatory", overflowX: "scroll" }}
      >
        {pageNumbers.map((pageNumber) => (
          <div
            key={pageNumber}
            onClick={() => handleClick(pageNumber)}
            className={clsx(
              "text-center w-[113px] min-w-[113px] py-2.5 mr-4 font-popSB transition-all duration-300 cursor-pointer text-base",
              currentPage === pageNumber
                ? "bg-white/70 rounded-full text-black/70"
                : "text-white"
            )}
          >
            Day {pageNumber + 1}
          </div>
        ))}
      </div>
      {currentPage < totalPages - 1 && (
        <div
          onClick={handleNextClick}
          className="text-white cursor-pointer px-6"
        >
          <div className="w-6 h-4 ">
            <TripleArrowRightIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default DayPagination;
