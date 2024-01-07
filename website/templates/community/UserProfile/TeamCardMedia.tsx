// import { useEnrolledUidImg } from "@hooks/community/useEnrolledUidImg";
import { useEventMembers } from "@hooks/community/useEventMembers";
// import { cloudinaryBaseURL } from "@models/Media/cloudinaryUpload";
import UserPhoto from "../Program/Feed/PostView/UserPhoto";

interface Props {
    eventId: string;

    enrolledUIDs: string[];
}

const TeamCardMedia: React.FC<Props> = ({ eventId }) => {
    // console.log("e", eventId);
    const { members } = useEventMembers(eventId, undefined, false);
    // console.log("mem", members);

    // const { enrolledUidsImg } = useEnrolledUidImg(enrolledUIDs);

    return (
        <>
            {/* {enrolledUidsImg ? ( */}
            <div
                className="w-max grid items-center justify-center"
                // className="flex items-center justify-center"
                style={{
                    gridTemplateColumns: `repeat(${
                        members.length - 1
                    }, 1.75rem) max-content`,
                }}
            >
                {members.map((item) => (
                    <div key={item.uid} className={"rounded-full"}>
                        <UserPhoto
                            onImgClick={() => {
                                // profileClick();
                            }}
                            nameInvisible={true}
                            name={item.name}
                            // customWidthHeight="w-12"
                            img={item?.profileImage}
                            // size="small"
                        />
                    </div>

                    //   <div key={img.uid} className="w-14">
                    //     <img
                    //       className="w-full h-full object-cover rounded-full"
                    //       src={`${cloudinaryBaseURL}/${img.resource_type}/upload/w_400,h_400,c_fill/${img.public_id}.jpg`}
                    //     />
                    //   </div>
                ))}
            </div>
            {/* ) : null} */}
        </>
    );
};

export default TeamCardMedia;
