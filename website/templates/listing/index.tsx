import HeaderImage from "@templates/listing/HeaderImage/HeaderImage";
import HeadingSection from "@templates/listing/HeadingSection/HeadingSection";
import EnrollmentSection from "@templates/listing/EnrollmentSection/EnrollmentSection";
import IconSection, {
  IconEl,
} from "@templates/listing/IconSection/IconSection";
// import AboutSection from "@templates/listing/AboutSection/AboutSection";
// import Book from "@templates/listing/Book/Book";

export interface ListingProps {
  headerVideo: string;
  heading: string;
  rating: number;
  numRatings: number;
  currency: "₹";
  price: number;
  registratinCloseDate: string;
  oneLiner: string;
  live: boolean;
  durationEachClassMinutes: number;
  numClasses: number;
  durationInWeeks: number;
  icons: IconEl[];
  about: string;
}

const ListingTemplate: React.FC<ListingProps> = ({
  headerVideo,
  heading,
  rating,
  numRatings,
  currency,
  price,
  registratinCloseDate,
  oneLiner,
  live,
  durationEachClassMinutes,
  numClasses,
  durationInWeeks,
  icons,
  about,
}) => {
  return (
    <div className="shadow-inner relative rounded-xl">
      <div className="">
        <HeaderImage
          headerVideo={headerVideo}
          editing={false}
          active={false}
          media={[]}
        />
      </div>

      <div className="pl-4 pr-4 pt-3 bg-gradient-to-b from-gray-200 to-white">
        <HeadingSection
          heading={heading}
          // rating={rating}
          // numRatings={numRatings}
          // currency={currency}
          // price={price}
          // registratinCloseDate={registratinCloseDate}
        />
      </div>

      <div className="pl-4 pr-4 pt-4 bg-gradient-to-b from-white to-gray-100">
        <EnrollmentSection
          oneLiner={oneLiner}
          live={live}
          durationEachClassMinutes={durationEachClassMinutes}
          numClasses={numClasses}
          durationInWeeks={durationInWeeks}
        />
      </div>

      <div className="pl-4 pr-4 pt-3 bg-gradient-to-b from-gray-100 to-white">
        <IconSection icons={icons} />
      </div>

      <div className="pl-4 pr-4 pt-3 bg-gradient-to-b from-white to-gray-100">
        {/* <AboutSection about={about} /> */}
      </div>

      <div className="h-48 bg-gradient-to-b from-gray-100 to-white"></div>

      <div className="sticky bottom-0 left-0 right-0">
        {/* <Book price={price} currency={currency} /> */}
      </div>
    </div>
  );
};

export default ListingTemplate;
