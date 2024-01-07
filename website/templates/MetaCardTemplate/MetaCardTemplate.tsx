import { getIconImg } from "@layouts/SEO/getSEOImg";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export interface MetaCardProps {
  title?: string;
  titlePlaceholder: string;
  description?: string;
  descriptionPlaceHolder: string;
  url?: string;
  urlPlaceholder: string;
  img?: string;
  favIconImg?: CloudinaryMedia | AWSMedia;
}

const MetaCardTemplate: React.FC<MetaCardProps> = ({
  title,
  titlePlaceholder,
  description,
  descriptionPlaceHolder,
  img,
  url,
  urlPlaceholder,
  favIconImg,
}) => {
  return (
    <div>
      <div>
        {img ? (
          <img
            src={img}
            alt="seo-img"
            className="h-[160px] w-full object-cover"
          />
        ) : (
          <div className="h-[160px] bg-gray-300" />
        )}
      </div>
      <div className="py-2 px-4">
        <div className="flex items-center">
          {favIconImg ? (
            <div className="">
              <img
                alt="icon"
                src={getIconImg(favIconImg)}
                className="rounded-full w-5 h-5 object-cover"
              />
            </div>
          ) : (
            <div className="">
              <img
                alt="icon"
                src="/images/logo.svg"
                className="rounded-full w-5 h-5 object-cover"
              />
            </div>
          )}
          <p className="pl-1 font-light text-sm text-gray-600">
            {url ? url : urlPlaceholder}
          </p>
        </div>
        <div>
          <p className="font-semibold text-lg text-gray-700">
            {title ? title.slice(0, 60) : titlePlaceholder.slice(0, 60)}
          </p>
          <p className="text-gray-500 text-sm">
            {description
              ? description.slice(0, 140)
              : descriptionPlaceHolder.slice(0, 140)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetaCardTemplate;
