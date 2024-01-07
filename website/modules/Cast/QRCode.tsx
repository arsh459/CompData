import SocialBoatSVG from "@components/logo/SocialBoatSVG";

interface Props {
  castId: string;
  size: number;
}

const QRCode: React.FC<Props> = ({ castId, size }) => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-1/4 flex justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <div className="w-8 h-8 mr-2">
            <SocialBoatSVG color="#7D91C3" />
          </div>
          <p
            className="text-4xl"
            style={{ color: "#7D91C3", fontFamily: "BaiJamjuree-Bold" }}
          >
            SocialBoat
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 flex justify-center items-center">
        <h1
          className="text-white text-center text-3xl"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          Scan the code From
          <br />
          Your Phone To Activate
        </h1>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <img
          src={`http://api.qrserver.com/v1/create-qr-code/?data=sbCastId${castId}!&size=${size}x${size}&bgcolor=100F1A&color=FFF`}
          alt="QR Code"
        />
      </div>
    </>
  );
};

export default QRCode;
