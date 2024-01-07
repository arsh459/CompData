import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
import Testimonial from "./Testimonial";

interface Props {
  data?: TestimonialInterface[];
}

export interface TestimonialInterface {
  name: string;
  img?: CloudinaryMedia;
  text: string;
  publishedOn: number;
  video?: CloudinaryMedia | AWSMedia;
}

const Testimonials: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <p className="text-2xl text-center text-gray-700 font-medium">
        What people have to say?
      </p>
      <div className="flex flex-wrap justify-center pt-8">
        {data &&
          data.map((item, index) => {
            return (
              <div
                className={clsx(
                  "sm:w-1/2 md:w-1/3 pb-4",
                  (index + 1) % 3 === 0 ? "" : "sm:pr-4"
                )}
                key={`${item.name}-${item.publishedOn}-${index}`}
              >
                <Testimonial testimonial={item} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Testimonials;
