import clsx from "clsx";

interface Props {}

const ReviewInput: React.FC<Props> = ({}) => {
  return (
    <div>
      <textarea
        rows={4}
        aria-multiline
        placeholder="Add your review"
        className={clsx(
          "w-full px-3 py-2 text-gray-500 border-gray-200 text-sm rounded-lg shadow-md focus:outline-none"
        )}
      />
    </div>
  );
};

export default ReviewInput;
