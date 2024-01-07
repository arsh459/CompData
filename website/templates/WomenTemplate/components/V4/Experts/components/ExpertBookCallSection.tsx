import Link from "next/link";

const ExpertsBookCallSection = () => {
  return (
    <div
      className="order-2 lg:order-1 flex  justify-center items-center p-4"
      style={{
        background:
          "linear-gradient(180deg, rgba(242, 183, 244, 0.20) 0%, rgba(223, 138, 239, 0.20) 20.46%, rgba(197, 91, 250, 0.20) 43.52%, rgba(97, 34, 174, 0.20) 100%)",
      }}
    >
      <div className=" flex flex-col items-start">
        <h1 className="text-[#DCCBFF] mb-2 lg:max-w-[14ch] max-w-[20ch] xs:text-[28px] sm:text-3xl md:text-4xl text-2xl font-pJSSB text-left leading-relaxed tracking-wide ">
          Want to get <span className=" text-[#C5FF49]">human experts</span> to
          manage your issue?
        </h1>
        <h1 className=" text-[#DCCBFF99] font-pJSSB max-w-[35ch] font-medium text-base md:text-xl">
          Get Gynaecologists, Dieticians to consult and customise your plan.
        </h1>
        <Link
          passHref
          href={`/consultation`}
          className=" text-[#521D7A] bg-[#A8E723] mt-6 font-pJSSB rounded-xl px-8 py-2 lg:w-fit w-full text-center"
        >
          Book a Call
        </Link>
      </div>
    </div>
  );
};

export default ExpertsBookCallSection;
