/* eslint-disable @next/next/no-img-element */

interface Props {
    color: string;
}

const LeaderImageHover: React.FC<Props> = ({ color }) => {
    return (
        <div
            className="absolute w-full h-full rounded-full border p-0.5 group-hover:scale-[1.3] transition-transform duration-500"
            style={{ borderColor: `${color}4d` }}
        >
            <div
                className="w-full h-full rounded-full border p-0.5 transition-all"
                style={{ borderColor: `${color}99` }}
            >
                <div
                    className="w-full h-full rounded-full border p-0.5 transition-all"
                    style={{ borderColor: color }}
                />
            </div>
        </div>
    );
};

export default LeaderImageHover;
