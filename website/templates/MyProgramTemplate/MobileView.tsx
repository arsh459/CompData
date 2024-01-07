const MobileView = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-end items-center p-8 bg-gradient-to-b from-[#423063]/80 to-[#AB5DE9]/80 backdrop-blur lg:hidden">
      <p className="text-3xl font-popSB text-center text-white">
        Download app to start yor workout
      </p>
      <div className="h-[15%] flex p-4">
        <img
          src="https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group_TiFhUWI6t.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676106587061"
          alt="arrow down"
          className="h-full aspect-[0.6]"
          style={{
            transform: "rotateX(180deg)  rotateY(0deg) rotateZ(30deg)",
          }}
        />
        <div className="w-12 aspect-1" />
        <img
          src="https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group_TiFhUWI6t.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676106587061"
          alt="arrow down"
          className="h-full aspect-[0.6]"
          style={{
            transform: "rotateX(180deg) rotateY(180deg) rotateZ(30deg)",
          }}
        />
      </div>
      <a
        href="https://socialboat.app.link/download"
        target="_blank"
        rel="noreferrer"
        className="group px-12 py-4 mx-auto bg-white/80 rounded-full backdrop-blur shadow-xl relative z-0"
      >
        <div className="bg-white absolute inset-0 -z-10 rounded-full group-hover:blur" />
        <p className="text-center text-black/80 font-popM">Download App</p>
      </a>
    </div>
  );
};

export default MobileView;
