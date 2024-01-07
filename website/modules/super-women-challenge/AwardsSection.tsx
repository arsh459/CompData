import clsx from "clsx";

const AwardsSection = () => {
  return (
    <div className="w-screen min-h-screen max-w-screen-xl mx-auto relative z-0">
      <div className="w-full sm:w-1/2 lg:w-5/6 h-screen sm:h-max mx-auto px-4 flex flex-col">
        <div className="h-20 sm:h-40" />
        <h2
          className={clsx(
            "text-center text-3xl sm:text-4xl lg:text-5xl text-transparent",
            "bg-clip-text bg-gradient-to-br from-[#FBE5FB] to-[#FFF6FF]",
            "block opacity-100",
            "w-full px-4 sm:mb-8 lg:mb-16",
            "font-pJS"
          )}
        ></h2>

        <div className="grid grid-cols-4">
          <div className="flex flex-col  m-auto">
            <div className="w-48 h-48 bg-[#ffffff26] p-6 flex items-center justify-center rounded-[12px] mb-4">
              <img
                src="https://ik.imagekit.io/socialboat/Frame%201000001118_Fab9Hda41.png?updatedAt=1696600635982"
                width={100}
              />
            </div>
            <div className="w-28 font-pJSL text-[##ffffff99] font-light text-lg  text-center m-auto">
              Join the Army Today
            </div>
          </div>
          <div className="flex flex-col  m-auto">
            <div className="w-48 h-48 bg-[#ffffff26] p-6 flex items-center justify-center rounded-[12px] mb-4">
              <img
                src="https://ik.imagekit.io/socialboat/Frame%201000001118_Fab9Hda41.png?updatedAt=1696600635982"
                width={100}
              />
            </div>
            <div className="w-28 font-pJSL text-[##ffffff99] font-light text-lg  text-center m-auto">
              Build Good Habits
            </div>
          </div>
          <div className="flex flex-col  m-auto">
            <div className="w-48 h-48 bg-[#ffffff26] p-6 flex items-center justify-center rounded-[12px] mb-4">
              <img
                src="https://ik.imagekit.io/socialboat/Frame%201000001118_Fab9Hda41.png?updatedAt=1696600635982"
                width={100}
              />
            </div>
            <div className="w-28 font-pJSL text-[##ffffff99] font-light text-lg  text-center m-auto">
              Build Good Habits
            </div>
          </div>
          <div className="flex flex-col  m-auto">
            <div className="w-48 h-48 bg-[#ffffff26] p-6 flex items-center justify-center rounded-[12px] mb-4">
              <img
                src="https://ik.imagekit.io/socialboat/Frame%201000001118_Fab9Hda41.png?updatedAt=1696600635982"
                width={100}
              />
            </div>
            <div className="w-28 font-pJSL text-[##ffffff99] font-light text-lg  text-center m-auto">
              Build Good Habits
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsSection;
