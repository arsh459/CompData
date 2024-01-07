import React, { useState } from "react";
interface Props {
  images: string[];
}

const CircleImages: React.FC<Props> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log({
        currentImage,

        arrLength: images.length,
        settingLength: (currentImage + 1) % images.length,
      });
      setCurrentImage((currentImage + 1) % images.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [currentImage, images]);

  return (
    <div className="border-2 border-blue-700 p-4 rounded-full w-4/5 max-w-md ">
      <div className="border-[3px] border-red-700 p-4 rounded-full w-full">
        <div className="relative   rounded-full overflow-hidden w-full">
          <div className=" w-full h-full p-2">
            <img src={images[currentImage]} alt="" className="w-full h-full" />
          </div>
          {/* <div className="absolute top-50 left-50 w-0 h-0 rounded-full bg-white opacity-0 transform -translate-y-1/2 -translate-x-1/2 transition duration-500 ease-in-out" /> */}
          <div className="absolute inset-0   z-50 rounded-full overflow-hidden border-4 border-gray-400 "></div>
        </div>
      </div>
    </div>
  );
};

export default CircleImages;

export function arrLength(
  currentImage: number,
  arrLength: any,
  length: number,
  arg3: number
) {
  throw new Error("Function not implemented.");
}
