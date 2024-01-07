import Divider from "@components/divider/Divider";

interface Props {}

export const zoomLogo =
  "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2FZoom-emblem.png?alt=media&token=86604671-ef23-42fe-b890-8c032c620c74";

const VideoProviders: React.FC<Props> = () => {
  return (
    <div className=" items-center w-[320px] pt-4">
      <Divider />
      <p className="text-gray-700 text-lg font-semibold text-center pt-4">
        Unlimited access to
      </p>
      <div className="flex pt-4 justify-around items-center">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2Fzoom3.png?alt=media&token=e4481f4a-0d93-4d3c-9cd4-751829e7c1dc"
          className="h-12 object-cover"
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2Fgoogle-meet-logo-1.png?alt=media&token=486be26f-d209-4306-ad7d-aba560a1bcf3"
          className="h-16 object-cover"
        />
      </div>
    </div>
  );
};

export default VideoProviders;
