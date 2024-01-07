interface Props {
  text?: string;
}

const ScrollDownComponent: React.FC<Props> = ({ text }) => {
  return (
    <div className="w-full flex justify-center items-end pb-1.5">
      <div
        className="w-max mx-auto flex justify-center items-end py-1 cursor-pointer"
        onClick={() => {
          const target = document.getElementById("targetDivEle");
          if (target) {
            target.scrollTo({
              top: target.scrollTop + target.clientHeight,
              behavior: "smooth",
            });
          }
        }}
      >
        <img
          // src={`https://ik.imagekit.io/socialboat/Component_1_eaMXgt6sH.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654345320113`}
          src={`https://ik.imagekit.io/socialboat/Group_74_qbpWIcqvI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651306368189`}
          alt="Down Arrow"
          className="w-2.5 iphoneX:w-4 animate-bounce"
        />
        <p className="text-white px-2 text-xs iphoneX:text-base">
          {text ? text : "Scroll Down"}
        </p>
        <img
          // src={`https://ik.imagekit.io/socialboat/Component_1_eaMXgt6sH.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654345320113`}
          src={`https://ik.imagekit.io/socialboat/Group_74_qbpWIcqvI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651306368189`}
          alt="Down Arrow"
          className="w-2.5 iphoneX:w-4 animate-bounce"
        />
      </div>
    </div>
  );
};

export default ScrollDownComponent;
