import { useAdvertisementDocs } from "@hooks/advertisement/useAdvertisementDocs";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import Link from "next/link";

interface Props {
  gameId: string;
}

const AdvertisementTemplate: React.FC<Props> = ({ gameId }) => {
  const { advertisementDocs } = useAdvertisementDocs(gameId);

  return (
    <div className="py-8 px-2">
      <div className="flex mb-4">
        <p className="text-2xl font-bold">AdvertisementDocs in game</p>
      </div>

      <Link href={`/admin/games/${gameId}/advertisement/add`}>
        <div className="bg-blue-500 px-4 py-2 rounded-full flex justify-center items-center w-max">
          <img
            className="w-4 h-4 object-cover"
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik03OC44MzMzMywxNC4zMzMzM3Y2NC41aC02NC41djE0LjMzMzMzaDY0LjV2NjQuNWgxNC4zMzMzM3YtNjQuNWg2NC41di0xNC4zMzMzM2gtNjQuNXYtNjQuNXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
          />
          <p className="pl-4 text-white">Add Advertisment</p>
        </div>
      </Link>

      {advertisementDocs.length ? (
        <div className="flex flex-wrap mt-4">
          {advertisementDocs.map((item) => {
            return (
              <Link href={`/admin/games/${gameId}/advertisement/${item.id}`}>
                <div
                  key={item.id}
                  className="w-full md:w-1/2 lg:w-1/3 p-4 shadow-sm mb-4 border rounded-md"
                >
                  {item.image ? (
                    <MediaTile
                      media={item.image}
                      alt="advertisement image"
                      width={400}
                      height={400 * 0.4}
                    />
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-4">
          <p className="font-extrabold text-4xl">No Advertisment Found</p>
        </div>
      )}
    </div>
  );
};

export default AdvertisementTemplate;
