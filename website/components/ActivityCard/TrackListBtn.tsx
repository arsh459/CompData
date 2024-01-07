import clsx from "clsx";

interface Props {
    classStr?: string;
    setIsVisible: (val: boolean) => void;
}

const TrackListBtn: React.FC<Props> = ({ classStr, setIsVisible }) => {
    return (
        <div
            className={clsx(
                classStr ? classStr : "",
                "bg-gradient-to-r from-[#EB7963]/[.94] to-[#F6A064]/[.94] rounded-full cursor-pointer"
            )}
            onClick={() => setIsVisible(true)}
        >
            <img src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/16/000000/external-playlist-music-royyan-wijaya-detailed-outline-royyan-wijaya.png" />
        </div>
    );
};

export default TrackListBtn;
