import Link from "next/link";

interface Props {
  uid: string;
}

const Recommendations: React.FC<Props> = ({ uid }) => {
  return (
    <>
      <p className="py-2 font-medium">Check Recommendations</p>
      <div className="flex pb-4">
        <div className="flex border p-4">
          <div className="px-4">
            <Link href={`/admin/u/${uid}/recs?type=workout`}>
              <p className="underline text-blue-500">Workout Recs</p>
            </Link>
          </div>
          <div className="px-4">
            <Link href={`/admin/u/${uid}/recs?type=nutrition`}>
              <p className="underline text-red-500">Diet Recs</p>
            </Link>
          </div>

          <div className="px-4">
            <Link href={`/admin/u/${uid}/progress`}>
              <p className="underline text-green-500">View Progress</p>
            </Link>
          </div>

          <div className="px-4">
            <Link href={`/admin/u/${uid}/reports`}>
              <p className="underline text-purple-500">Awarrd Reports</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommendations;
