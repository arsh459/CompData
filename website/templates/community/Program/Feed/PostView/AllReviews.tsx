interface Props {
  previousReviewCount: number;
  onReviewClick: () => void;
}

const AllReviews: React.FC<Props> = ({
  previousReviewCount,
  onReviewClick,
}) => {
  return (
    <div className="">
      {previousReviewCount === 0 ? (
        <p className="text-gray-500 text-sm">No reviews as of now</p>
      ) : (
        <div onClick={onReviewClick}>
          <p className="text-gray-700 text-sm underline cursor-pointer">
            {previousReviewCount} Review(s)
          </p>
        </div>
      )}
    </div>
  );
};

export default AllReviews;
