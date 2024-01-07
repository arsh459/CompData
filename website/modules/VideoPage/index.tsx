import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Task } from "@models/Tasks/Task";
import StreamV2 from "@modules/Cast/StreamV2";
import { useRouter } from "next/router";

interface Props {
  task: Task;
  uid: string;
}

const VideoPageTemplate: React.FC<Props> = ({ task, uid }) => {
  const router = useRouter();
  const q = router.query as { activityId?: string };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative z-0">
      <StreamV2
        taskName={task.name}
        taskMedia={task.avatar}
        playbackId={task.playbackId}
        userUID={uid}
        taskId={task.id}
        activityId={q.activityId}
      />
      <div
        className="absolute left-4 top-4 z-10 w-8 md:w-10 aspect-1 cursor-pointer"
        onClick={handleBack}
      >
        <ArrowLeftIcon className="w-full h-full" color="#FFFFFF" />
      </div>
    </div>
  );
};

export default VideoPageTemplate;
