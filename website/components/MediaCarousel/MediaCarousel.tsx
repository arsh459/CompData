import React from "react";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";

interface Props {
    media: CloudinaryMedia[];
}

const MediaCarousel: React.FC<Props> = ({ media }) => {
    const handleBack = () => {
        const scrollableContainer = document.querySelector(
            ".scrollable-container"
        );
        if (scrollableContainer) {
            scrollableContainer.scrollLeft -= 200;
        }
    };
    const handleNext = () => {
        const scrollableContainer = document.querySelector(
            ".scrollable-container"
        );
        if (scrollableContainer) {
            scrollableContainer.scrollLeft += 200;
        }
    };

    return (
        <div className="w-full relative">
            <div
                className="w-12 h-12 bg-gray-300 rounded-full grid place-items-center text-3xl absolute top-2/4 left-0 m-4 translate-y-[-100%] cursor-pointer"
                onClick={handleBack}
            >
                &larr;
            </div>
            <div className="w-full grid grid-flow-col auto-cols-[19rem] place-items-center gap-4 p-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scroll-px-4 scrollable-container">
                {media.map((each) => (
                    <img key={each.id} src={each.url} className="snap-start" />
                ))}
            </div>
            <div
                className="w-12 h-12 bg-gray-300 rounded-full grid place-items-center text-3xl absolute top-2/4 right-0 m-4 translate-y-[-100%] cursor-pointer"
                onClick={handleNext}
            >
                &rarr;
            </div>
        </div>
    );
};

export default MediaCarousel;
