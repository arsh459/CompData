import StarRating from "@components/StarRating";
import { Testimonial } from "@models/Testimonial/interface";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";

interface Props {
  testimonials?: Testimonial[];
}

const Testimonials: React.FC<Props> = ({ testimonials }) => {
  return testimonials && testimonials.length ? (
    <div className="w-full max-w-screen-xl mx-auto p-4">
      <h6 className="text-[#FF4165] tracking-wider mb-16 text-center">{`DON'T JUST TAKE OUR WORD FOR IT`}</h6>
      <div className="w-full grid sm:grid-flow-col lg:grid-cols-3 auto-cols-fr gap-16">
        {testimonials?.map((testimonial, index) =>
          testimonial.isTransformation && testimonial.youtubeId ? (
            <iframe
              key={`testimonial-${index + 1}`}
              className="w-full aspect-[16/9]"
              src={`https://www.youtube-nocookie.com/embed/${testimonial.youtubeId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
              title={testimonial.name}
              loading="lazy"
            />
          ) : (
            <div
              key={`testimonial-${index + 1}`}
              className="sm:flex-[0.5] xl:flex-[0.3] flex flex-col"
            >
              <StarRating
                keyStr={`testimonial-${index + 1}`}
                rating={testimonial.rating ? testimonial.rating : 0}
                fillColor="#FF4165"
                backgroundColor="#100F1A"
                size={20}
              />
              <p className="flex-1 text-xl md:text-2xl italic line-clamp-5">
                {testimonial.quote}
              </p>
              <div className="flex items-center pt-8">
                <div className="w-12 h-12">
                  {testimonial.media ? (
                    <MediaTile
                      media={testimonial.media}
                      alt="person image"
                      width={500}
                      height={500}
                    />
                  ) : (
                    <img
                      src={
                        testimonial.isFemale
                          ? "https://ik.imagekit.io/socialboat/Group_533_VAeUQeIhq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662446832635"
                          : "https://ik.imagekit.io/socialboat/Group_534_ZVW_Xki5K.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662446832724"
                      }
                      className="w-full h-full object-contain"
                      alt={
                        testimonial.isFemale
                          ? "female placeholder icon"
                          : "male placeholder icon"
                      }
                    />
                  )}
                </div>
                <div className="ml-6 flex-1">
                  <p className="text-[10] md:text-sm font-bold">
                    {testimonial.name}
                  </p>
                  <p className="text-[10] md:textsm">
                    {testimonial.achievement}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  ) : null;
};

export default Testimonials;
