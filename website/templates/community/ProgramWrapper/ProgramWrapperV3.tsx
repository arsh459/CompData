import AnnouncementSpotlight from "./ProgramComponents/AnnouncementSpotlight";
import ProgramCard from "./ProgramComponents/ProgramCard";
import PostProgram from "./ProgramComponents/PostProgram";
import { communityQueryV3 } from "@hooks/community/v2/useCommunityParamsV3";
import { EventInterface } from "@models/Event/Event";
import { useNextOnScroll } from "@hooks/useNextOnScroll";
import PostClick from "@templates/community/NewCommunitySection/PostClick";
import { usePostsV3 } from "@hooks/community/v2/usePostsV3";
import { UserInterface } from "@models/User/User";
import { useTickets } from "@hooks/tickets/useTickets";
import TicketsHolder from "./ProgramComponents/TicketsHolder/TicketsHolder";
import { getDateStrings } from "../LeaderboardWrapper/utils";
import { Post } from "@models/Posts/Post";
import { useState } from "react";
// import { useState } from "react";

interface Props {
  onGoBack: () => void;
  urlState: communityQueryV3;
  parentEvent: EventInterface | null;
  teamId: string;
  leaderKey: string;
  eventKey: string;
  communityId?: string;
  signedInUser: UserInterface;
  baseShareURL: string;
  onQueryChange: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;
}

const ProgramWrapperV3: React.FC<Props> = ({
  urlState,
  onGoBack,
  parentEvent,
  signedInUser,
  baseShareURL,
  onQueryChange,
  teamId,
  communityId,
  leaderKey,
  eventKey,
}) => {
  const { posts, onNext, nextExists, fetched, setPosts } = usePostsV3(
    parentEvent?.id,
    urlState.post
  );

  // tickets
  const { tickets } = useTickets(signedInUser.uid);
  // console.log("tickets", tickets);
  const { yesterday, dayBefore } = getDateStrings();

  const { targetRef } = useNextOnScroll(onNext, nextExists);

  const [editingPost, setEditingPost] = useState<Post>();

  const onCancelEditPost = () => setEditingPost(undefined);
  const onEditPost = (post: Post) => {
    onQueryChange({ ...urlState, postId: "" });
    setEditingPost(post);
  };

  // const [isPostClickOpen, setIsPostClickOpen] = useState<boolean>(false);

  return (
    <div className="flex-1">
      {urlState.post ? null : (
        <>
          <AnnouncementSpotlight
            selectedNav={urlState.nav}
            onQueryChange={onQueryChange}
          />
          <TicketsHolder
            eventKey={eventKey}
            teamKey={leaderKey}
            tickets={tickets}
            signedInId={signedInUser.uid}
          />
        </>
      )}
      <div>
        {posts.map((item, index) => {
          // console.log("i", item.post.id, item.post.creatorName, item.post.text);
          return (
            <ProgramCard
              key={item.post.id}
              post={item.post}
              postRef={item.ref}
              urlState={urlState}
              signedInUser={signedInUser}
              baseShareURL={baseShareURL}
              onQueryChange={onQueryChange}
              gameId={parentEvent?.id ? parentEvent.id : ""}
              gameStarts={parentEvent?.configuration?.starts}
              sprints={parentEvent?.configuration?.sprints}
              communityId={communityId ? communityId : ""}
              eventId={teamId}
              eventKey={eventKey}
              teamKey={leaderKey}
              isLive={index < 5}
              yesterday={yesterday}
              dayBefore={dayBefore}
              onEditPost={onEditPost}
              // totalFitPoints={}
              // setIsPostClickOpen={setIsPostClickOpen}
            />
          );
        })}
        {!posts.length && fetched ? (
          <div className="py-8 h-[50vh] flex items-center justify-center">
            <p className="text-3xl text-gray-700 text-center font-medium">
              No Posts to show
            </p>
          </div>
        ) : null}
      </div>
      <div className="h-16 iphoneX:h-20" ref={targetRef} />
      <PostProgram
        eventId={teamId}
        setPosts={setPosts}
        editingPost={editingPost}
        onCancelEditPost={onCancelEditPost}
        authorName={signedInUser.name ? signedInUser.name : ""}
        authorImage={signedInUser.profileImage}
        gameId={parentEvent?.id ? parentEvent.id : ""}
        signedInUserId={signedInUser.uid}
        communityId={communityId}
        eventKey={eventKey}
        leaderKey={leaderKey}
        postType={urlState.post}
      />
      {urlState.postId && parentEvent ? (
        <PostClick
          urlState={urlState}
          gameId={parentEvent.id}
          postId={urlState.postId}
          signedInUser={signedInUser}
          baseShareURL={baseShareURL}
          onGoBack={onGoBack}
          gameStarts={parentEvent?.configuration?.starts}
          sprints={parentEvent?.configuration?.sprints}
          onQueryChange={onQueryChange}
          eventId={teamId}
          communityId={communityId ? communityId : ""}
          onEditPost={onEditPost}
          // isPostClickOpen={isPostClickOpen}
          // setIsPostClickOpen={setIsPostClickOpen}
          eventKey={eventKey}
          leaderKey={leaderKey}
          yesterday={yesterday}
          dayBefore={dayBefore}
        />
      ) : null}
    </div>
  );
};

export default ProgramWrapperV3;
