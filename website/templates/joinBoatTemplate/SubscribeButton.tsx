interface Props {
  cost?: number;
  onSignFree: () => void;
  onPayRequest: () => void;
  freeOptionHidden?: boolean;
}

const SubscribeButton: React.FC<Props> = ({
  cost,
  onSignFree,
  freeOptionHidden,
  onPayRequest,
}) => {
  //   console.log("eventSeries", eventSeries);

  return (
    <div className="sticky bottom-2 left-0 right-0 z-50 bg-white shadow-sm p-4 rounded-xl">
      {cost && !freeOptionHidden ? (
        <div
          className="pb-2 cursor-pointer flex justify-center"
          onClick={onSignFree}
        >
          <p className="text-center underline text-gray-500 font-medium text-base">
            Try free instead, Buy later
          </p>
        </div>
      ) : null}
      <div
        className="bg-orange-500 py-4 rounded-full cursor-pointer"
        onClick={onPayRequest}
      >
        <p className="text-center text-white font-semibold text-xl">
          {cost ? `Get access for ₹${cost}` : "Get access for FREE"}
        </p>
      </div>
    </div>
  );
};

export default SubscribeButton;

// paid plan
