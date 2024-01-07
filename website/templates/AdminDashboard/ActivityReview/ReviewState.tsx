import { reviewStatus } from "@models/Activities/Activity";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Checkbox } from "@mui/material";

interface Props {
  onComplete: (state: reviewStatus, notify: boolean) => void;
  // currentReviewState?: reviewStatus;
  //   onTryAgain: () => void;
  //   onReject: () => void;
}

const ReviewStateForm: React.FC<Props> = ({
  onComplete,
  // currentReviewState,
  //   onReject,
  //   onTryAgain,
}) => {
  const [notify, setNotify] = useState<boolean>(false);
  return (
    <div className="flex flex-col justify-center items-center py-8">
      <p className="text-gray-700 font-bold text-xl">Select your review type</p>

      <div className="flex items-center">
        <Checkbox
          color="primary"
          checked={notify}
          onChange={() => setNotify(!notify)}
        />
        <p className="text-gray-700">Notify User</p>
      </div>

      <div className="py-2">
        <div className="flex">
          <Button
            onClick={() =>
              onComplete(
                // currentReviewState === "REVIEW_REQUEST"
                // ? "TICKET_REVIEWED"
                // :

                "REVIEWED",
                notify
              )
            }
            color="primary"
            variant="contained"
          >
            Complete Review
          </Button>
        </div>
      </div>

      <div className="pt-2 flex justify-center">
        <div className="px-2">
          <div className="flex">
            <Button
              onClick={() => onComplete("TRY_AGAIN", notify)}
              variant="outlined"
              color="error"
            >
              User tries again
            </Button>
          </div>
        </div>

        <div className="px-2">
          <div className="flex">
            <Button
              onClick={() => onComplete("NEED_MORE_DATA", notify)}
              variant="outlined"
              color="error"
            >
              Need more info
            </Button>
          </div>
        </div>

        <div className="px-2">
          <div className="flex">
            <Button
              onClick={() => onComplete("DISCARDED", notify)}
              variant="outlined"
              color="error"
            >
              Reject Entry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStateForm;
