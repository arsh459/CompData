const PaySuccess = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-4/5 aspect-1 p-6 rounded-full bg-[#51FF8C]/30">
        <div className="w-full aspect-1 p-6 rounded-full bg-[#51FF8C]/30">
          <div className="w-full aspect-1 p-6 rounded-full bg-[#51FF8C]/30">
            <div className="w-full aspect-1 p-6 rounded-full bg-[#51FF8C] flex justify-center items-center">
              <img
                src="https://ik.imagekit.io/socialboat/Vector_1026_nUdfODAFc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678360796362"
                alt="right tic"
                className="w-3/5 aspect-[70/46]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-16 aspect-1" />
      <div className="w-4/5 bg-white/20 rounded-2xl p-4 flex flex-col">
        <h6 className="text-[#51FF8C] text-2xl font-nunitoB">
          Payment Successful
        </h6>
        <p className="font-nunitoR text-sm">
          Congratulations you are now set to start your journey
        </p>
        <div className="w-8 aspect-1" />
        <span className="font-nunitoR text-xs">Amount Paid</span>
        <span className="text-2xl font-nunitoB">INR 2000</span>
      </div>
    </div>
  );
};

export default PaySuccess;
