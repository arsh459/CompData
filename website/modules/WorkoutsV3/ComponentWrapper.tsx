import BackIcon from "../../public/icons/BackIcon";

interface Props {
    onBack: () => void;
}

const ComponentWrapper: React.FC<Props> = ({ children, onBack }) => {
    return (
        <div className="px-4 text-[#335E7D] text-lg tracking-wide font-sans">
            <div className="py-6 flex justify-between">
                <div
                    className="cursor-pointer text-gray-400 z-20 hover:text-gray-500"
                    onClick={onBack}
                >
                    <BackIcon
                        style={{
                            height: "25",
                            width: "25",
                            fill: "#335E7D",
                        }}
                    />
                </div>
            </div>
            {children}
        </div>
    );
};

export default ComponentWrapper;
