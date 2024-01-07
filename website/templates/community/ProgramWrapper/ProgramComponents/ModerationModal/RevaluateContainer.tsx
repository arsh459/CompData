const RevaluateContainer = () => {
  return (
    <div className="flex flex-col justify-center items-center text-2xl">
      <p className="text-center my-4">
        Are you sure you want to revaluate the task?
      </p>
      <div className="flex justify-center my-4">
        <button>Yes</button>
        <div className="w-px bg-[#335E7D] mx-8" />
        <button>No</button>
      </div>
    </div>
  );
};

export default RevaluateContainer;
