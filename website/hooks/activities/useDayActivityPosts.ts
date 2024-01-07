import { useEffect, useState } from "react";
import { getDoc } from "firebase/firestore";
import { Post } from "@models/Posts/Post";
import { Activity } from "@models/Activities/Activity";

export const useDayActivityPosts = (activities?: Activity[]) => {
    const [actPosts, setActivityPosts] = useState<{ [actId: string]: Post }>(
        {}
    );

    useEffect(() => {
        const getAllActivityPosts = async () => {
            const allActivityPosts: { [actId: string]: Post } = {};

            if (activities)
                for (const activity of activities) {
                    if (activity.postRef) {
                        const remotePost = await getDoc(activity.postRef);

                        const tmpPost = remotePost.data() as Post;

                        allActivityPosts[
                            activity.id ? activity.id : activity.postId
                        ] = tmpPost;
                    }
                }

            setActivityPosts(allActivityPosts);
        };

        getAllActivityPosts();
    }, [activities]);

    return {
        actPosts,
    };
};
