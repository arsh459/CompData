const StartWorkoutBtn = () => {
  return (
    <div className="w-full h-full flex justify-center items-center cursor-pointer text-white text-lg rounded-xl bg-gradient-to-r from-[#F19B38]/90 to-[#FD6F6F]/90 px-2.5 iphoneX:px-4">
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15.0001 9.54501V20.4541" stroke="white" strokeWidth="1.6" />
        <path
          d="M9.5455 14.9996L20.4546 14.9996"
          stroke="white"
          strokeWidth="1.6"
        />
        <rect
          x="4.59091"
          y="4.59091"
          width="20.8182"
          height="20.8182"
          rx="5.5"
          stroke="white"
        />
        <rect
          x="2.97726"
          y="2.97726"
          width="24.0455"
          height="24.0455"
          rx="6.75"
          stroke="white"
          strokeWidth="0.5"
        />
        <rect
          x="1.46365"
          y="1.46365"
          width="27.0727"
          height="27.0727"
          rx="7.9"
          stroke="white"
          strokeWidth="0.2"
        />
        <rect
          x="0.05"
          y="0.05"
          width="29.9"
          height="29.9"
          rx="7.95"
          stroke="white"
          strokeWidth="0.1"
        />
      </svg>
      <p className="pl-2 whitespace-nowrap text-sm iphoneX:text-base">
        Start workout
      </p>
    </div>
  );
};

export default StartWorkoutBtn;
