import { doctorsImg } from "../data/data";

const ExpertsImgSection = () => {
  return (
    <div
      className="flex justify-center lg:justify-start order-1 lg:order-2 pt-6"
      style={{
        background:
          "linear-gradient(180deg, #F2B7F4 0%, #DF8AEF 20.46%, #C55BFA 43.52%, #6122AE 100%)",
      }}
    >
      <img className=" lg:w-[75%] w-[85%]" src={doctorsImg} />
    </div>
  );
};

export default ExpertsImgSection;
