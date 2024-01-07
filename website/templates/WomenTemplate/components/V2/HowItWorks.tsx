import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

interface Props {
  heading?: string;
  title?: string;
  subtitle?: string;
  img?: CloudinaryMedia | AWSMedia | string;
}

const HowItWorks: React.FC<Props> = ({ heading, title, subtitle, img }) => {
  return (
    <div className="w-full max-w-screen-lg mx-auto my-20 lg:my-32 flex flex-col lg:flex-row-reverse justify-center items-center relative z-0 p-4">
      {typeof img === "string" ? (
        <img
          src={img}
          className="w-full lg:w-1/2"
          alt="how it works steps image"
        />
      ) : (
        <img
          src={`https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio/${img?.path}`}
          className="w-full lg:w-1/2"
          alt="how it works steps image"
        />

        // <MediaCard media={img} widthString="w-full lg:w-1/2" />
      )}
      <div className="w-4/5 lg:w-1/2">
        <h4 className="text-white text-base sm:text-lg lg:text-xl  font-nunitoSB">
          {heading}
        </h4>
        <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-nunitoB mt-4 mb-2">
          {title}
        </h3>
        <h5 className="text-white text-base sm:text-xl lg:text-2xl  font-nunitoL">
          {subtitle}
        </h5>
      </div>
    </div>
  );
};

export default HowItWorks;
