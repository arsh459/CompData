import Link from "next/link";

interface Props {
  eventKey?: string;
  baseURL: string;
}

const URLPreview: React.FC<Props> = ({ baseURL, eventKey }) => {
  //   console.log("key", key);
  return (
    <Link href={`https://${baseURL}${eventKey}`}>
      <div className="flex items-center max-w-xs pixelXl:max-w-sm md:max-w-lg lg:max-w-2xl px-2 py-1 bg-white rounded-md border overflow-x-auto">
        <p className="text-xs text-gray-500">https://</p>
        <p className="text-xs text-gray-500 underline">{baseURL}</p>
        <p className="text-gray-700 font-medium text-xs underline truncate">
          {eventKey}
        </p>
      </div>
    </Link>
  );
};

export default URLPreview;
