// import { cloudinaryBaseURL } from "@models/Media/cloudinaryUpload";
import ProfileImg from "@templates/profile/ProfileHeader/ProfileImg";
import { getURLToFetch } from "../HeaderImage/utils";
import { TestimonialInterface } from "./Testimonials";

interface Props {
  testimonial: TestimonialInterface;
}

const Testimonial: React.FC<Props> = ({ testimonial }) => {
  return (
    <div className="p-6 shadow-lg hover:shadow-xl rounded-xl border">
      <div>
        <p className="text-base line-clamp-6 text-gray-600 italic">
          {`${testimonial.text}`}
        </p>
      </div>
      <div className="pt-4 flex justify-end">
        <div className="flex flex-col items-center">
          {testimonial.img ? (
            <ProfileImg
              size="sm"
              live={true}
              onClickURL={""}
              selected={true}
              imgUrl={getURLToFetch(testimonial.img, 200, 200)}
              // imgUrl={`${cloudinaryBaseURL}/${testimonial.img.resource_type}/upload/w_200,h_200,c_thumb,g_face/${testimonial.img.path}`}
            />
          ) : (
            <ProfileImg
              size="sm"
              live={true}
              onClickURL={""}
              selected={true}
              //   imgUrl="https://avatars.dicebear.com/api/croodles-neutral/i.svg"
              imgUrl={`https://avatars.dicebear.com/api/croodles-neutral/${testimonial.name}.svg`}
              // imgUrl={`${cloudinaryBaseURL}/${testimonial.img.resource_type}/upload/w_200,h_200,c_thumb,g_face/${testimonial.img.path}`}
            />
          )}
          <p className="text-gray-500 text-lg font-medium pt-1">
            {testimonial.name}
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(testimonial.publishedOn).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
