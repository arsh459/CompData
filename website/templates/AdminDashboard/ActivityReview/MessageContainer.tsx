// import { useAdminDashboard } from "@hooks/dashboard/useAdminDashboard";
// import { useActivityById } from "@hooks/activities/useActivityById";
// import { useActivityReviews } from "@hooks/activities/useActivityReviews";
// import { usePostWithRef } from "@hooks/activities/usePostWithRef";
// import { useTask } from "@hooks/tasks/useTask";
// import Button from "@components/button";
import { Button, Link } from "@mui/material";
import { Activity, ReviewMessage } from "@models/Activities/Activity";
import { Post } from "@models/Posts/Post";
import { Task } from "@models/Tasks/Task";
import { UserInterface } from "@models/User/User";
import { useState } from "react";
// import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import Message from "./Message";
import NewAdminReviewModal from "./NewAdminReviewModal";
// import Filter from "./Filter";
// import FilterHolder from "./FilterHolder";
// import Header from "./Header";
// import TaskCardsHolder from "./TaskResults/TaskCardsHolder";

interface Props {
  messages: ReviewMessage[];
  user: UserInterface;
  activity: Activity;
  task?: Task;
  post?: Post;
}

const MessageContainer: React.FC<Props> = ({
  task,
  user,
  messages,
  activity,
  post,
}) => {
  const [modalState, setModalState] = useState<"EDITING" | "NONE" | "NEW">(
    "NONE"
  );
  const [reviewToEdit, setReviewToEdit] = useState<ReviewMessage | undefined>();

  const onNewReview = () => {
    // console.log("HI");
    setReviewToEdit(undefined);
    setModalState("NEW");
  };

  const onEditReview = (newRev: ReviewMessage) => {
    setReviewToEdit(newRev);
    setModalState("EDITING");
  };

  const onClose = () => {
    setModalState("NONE");
  };

  return (
    <div className="relative">
      <NewAdminReviewModal
        user={user}
        task={task}
        activity={activity}
        editFlag={modalState === "EDITING"}
        editingReview={reviewToEdit}
        isVisible={modalState !== "NONE"}
        onClose={onClose}
      />
      <div className="flex pb-4">
        <Button variant="contained" onClick={onNewReview}>
          Add New Review
        </Button>

        {post?.gameId ? (
          <div className="pl-2">
            <Link href={`/feed/${post.gameId}?postId=${post.id}`}>
              <Button variant="outlined">View post</Button>
            </Link>
          </div>
        ) : null}
      </div>

      {messages.map((item, index) => {
        return (
          <div key={item.id} className="pb-2">
            <Message
              message={item}
              isActive={index === 0}
              onEdit={onEditReview}
            />
          </div>
        );
      })}

      <div className="">
        <div className="h-20" />
      </div>
    </div>
  );
};

export default MessageContainer;
