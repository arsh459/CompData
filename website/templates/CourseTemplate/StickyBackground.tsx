import MediaCard from "@components/MediaCard";
import { UserInterface } from "@models/User/User";

interface Props {
  primaryCoach?: UserInterface;
}

const StickyBackground: React.FC<Props> = ({ primaryCoach, children }) => {
  return (
    <div className="relative z-0">
      <div className="sticky top-0 -z-10 w-screen h-screen flex justify-end overflow-hidden">
        <div className="w-full max-w-screen-lg mx-auto aspect-1 overflow-hidden relative z-0">
          <img
            src="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Group_1187_FFQte1GpF5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676019840225"
            className="w-full h-full object-cover"
            alt=""
          />
          {/* <img
            src="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/WhatsApp_Image_2023-01-19_at_17.56_1_96ZRyKUnn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676019832823"
            className="absolute inset-0 z-10 w-full h-full object-contain object-bottom"
            alt=""
          /> */}
          <div className="absolute inset-0 z-10 w-full h-full object-contain object-bottom">
            <MediaCard
              media={primaryCoach?.landingContent?.img}
              objectString="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
      <div className="-mt-[100vh]">{children}</div>
    </div>
  );
};

export default StickyBackground;
