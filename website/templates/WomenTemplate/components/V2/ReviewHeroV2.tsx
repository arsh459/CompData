const ReviewHeroV2 = () => {
  return (
    <div className="w-full h-screen relative z-0">
      <div className="w-full h-full max-w-screen-xl mx-auto flex flex-col lg:flex-row-reverse">
        <div className="w-full lg:w-1/2 h-3/5 lg:h-full flex justify-center items-end">
          <img
            src="https://ik.imagekit.io/socialboat/tr:w-800,c-maintain_ratio,fo-auto/Group_1371__1__A8hNEqTRv.png?updatedAt=1681927816825"
            alt="review for pcod program by user"
            className="h-[85%] l object-contain  "
          />
        </div>

        <img
          src="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/runningBg_MhHzrkOu2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674656291224"
          className="absolute left-0 right-0 bottom-1/2 lg:bottom-0 translate-y-full lg:translate-y-0 object-contain -z-10"
          alt="women page wave image"
        />

        <div className="w-fit lg:w-2/5 h-2/5 lg:h-full flex flex-col justify-center p-5 mx-auto ">
          <h1
            className="text-white text-center lg:text-left font-popSB text-3xl lg:text-6xl"
            style={{ lineHeight: "1.25em", fontFamily: "Nunito-Bold" }}
          >
            <p className="text-5xl lg:text-8xl"> 34,000+</p>
            Happy users and counting
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ReviewHeroV2;
