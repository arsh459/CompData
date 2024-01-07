interface Props {
  isUserActivity: boolean;
}

const ExpiredContainer: React.FC<Props> = ({ isUserActivity }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-lg text-center">
        Time limit has Expired <br /> Can&#39;t Revaluate now
      </p>
      {isUserActivity ? (
        <div className="flex items-center my-4">
          <img
            src={`https://ik.imagekit.io/socialboat/Vector__3__tmNXIKpTS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653737909544`}
            alt="caution icon"
            className="grayscale mr-2"
          />
          <h2 className="text-[#6e6e6e] text-2xl font-extrabold">Revaluate</h2>
        </div>
      ) : (
        <div className="flex items-center my-4">
          <img
            src={`https://ik.imagekit.io/socialboat/Group_181_xvqWxR7Py.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653724850315`}
            alt="caution icon"
            className="grayscale mr-2"
          />
          <h2 className="text-[#6e6e6e] text-2xl font-extrabold">Report</h2>
        </div>
      )}
    </div>
  );
};

export default ExpiredContainer;
