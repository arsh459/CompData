import Link from "next/link";

const ReviewHero = () => {
  const onGetStarted = () => {};

  return (
    <div className="w-full h-screen relative z-0">
      <div className="w-full h-full max-w-screen-xl mx-auto flex flex-col lg:flex-row-reverse">
        <div className="w-full lg:w-1/2 h-3/5 lg:h-full flex justify-center items-end">
          <img
            src="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Frame_1359_f1-jCMEzy.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676126485741"
            alt="review for pcod program by user"
            className="h-[90%] lg:h-full object-contain lg:mr-16 "
          />
        </div>

        <img
          src="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/runningBg_MhHzrkOu2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674656291224"
          className="absolute left-0 right-0 bottom-1/2 lg:bottom-0 translate-y-full lg:translate-y-0 object-contain z-0 lg:-z-10"
          alt="women page wave image"
        />

        <div className="w-fit lg:w-2/5 h-2/5 lg:h-full flex flex-col justify-center p-5 mx-auto">
          <h1
            className="text-white text-center lg:text-left font-popSB text-2xl sm:text-3xl lg:text-5xl"
            style={{ lineHeight: "1.25em" }}
          >
            Hear from our Community
          </h1>
          <p
            className="text-[#FFFFFFCC] font-popR text-xs lg:text-sm py-5 lg:py-8 w-full"
            style={{ lineHeight: "21px" }}
          >
            SocialBoat has helped over 5000 women in India <br /> to achieve
            their fitness and health goals
          </p>

          <div className="w-full flex flex-col lg:flex-row">
            <Link
              passHref
              href={`/start?origin=reviews`}
              // className="w-fit lg:w-full lg:max-w-[216px]"
              className="flex-1 md:flex-[0.4] md:max-w-[216px]"
            >
              <div
                className="w-full bg-white border border-[#FF33A1] backdrop-blur-lg font-popL text-center rounded-full px-5 py-2.5 text-white text-sm iphoneX:text-base"
                onClick={onGetStarted}
                style={{
                  background: `linear-gradient(94.38deg, rgba(255, 51, 161, 0.8) 9.85%, rgba(252, 51, 251, 0.8) 94.86%)`,
                }}
              >
                Contact us
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewHero;
