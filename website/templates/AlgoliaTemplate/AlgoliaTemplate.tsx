import { UserInterface } from "@models/User/User";
import { Button } from "@mui/material";
import AppointmentsHeader from "@templates/AppointmentTemplate/AppointmentsHeader";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  user: UserInterface;

  onSignOut: () => void;
}

const AlgoliaTemplate: React.FC<Props> = ({ onSignOut, user }) => {
  const router = useRouter();
  const onBack = () => {
    router.back();
  };
  const [loading, setLoading] = useState<boolean>(false);

  const onTaskPress = async (type: "task" | "blog") => {
    try {
      setLoading(true);
      await axios({
        url: "/api/refreshTasks",
        method: "POST",
        data: { type },
        params: { type },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-[#f6f6f6] flex flex-col relative z-0">
      <div className="flex-1 w-screen max-w-screen-xl p-4 mx-auto flex flex-col gap-4">
        <AppointmentsHeader
          userObj={user}
          // viewStyle={viewStyle}
          onSignOut={onSignOut}
          showBack={false}
          onBack={onBack}
        />

        {loading ? (
          <div>
            <p>Loading</p>
          </div>
        ) : (
          <>
            <div>
              <Button
                onClick={() => onTaskPress("task")}
                title=""
                variant="contained"
                color="primary"
              >
                Refresh Tasks
              </Button>
            </div>
            <div>
              <Button
                onClick={() => onTaskPress("blog")}
                title="Blogs"
                variant="contained"
                color="primary"
              >
                Refresh Blogs
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AlgoliaTemplate;
