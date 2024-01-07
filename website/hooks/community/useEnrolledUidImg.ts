import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { UserInterface } from "@models/User/User";

export type eventVisibility = "community" | "preview" | "unknown";

export const useEnrolledUidImg = (selectedUid?: string[]) => {
    const [enrolledUidsImg, setEnrolledUidsImg] = useState<CloudinaryMedia[]>();

    useEffect(() => {
        const getFiveProfileImg = async () => {
            const remoteEnrolledUidsImg: CloudinaryMedia[] = [];

            if (selectedUid)
                for (let i = 0; i < Math.min(5, selectedUid.length); i++) {
                    const userRef = doc(
                        db,
                        "leaderBoard",
                        `leader-${selectedUid[i]}`
                    );

                    const remoteUser = await getDoc(userRef);

                    const tempUser = remoteUser.data() as UserInterface;

                    if (tempUser.profileImage) {
                        remoteEnrolledUidsImg.push(
                            tempUser.profileImage as CloudinaryMedia
                        );
                    }
                }

            setEnrolledUidsImg(remoteEnrolledUidsImg);
        };

        getFiveProfileImg();
    }, [selectedUid]);

    return {
        enrolledUidsImg,
    };
};
