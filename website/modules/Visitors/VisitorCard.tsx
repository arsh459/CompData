import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useIsSubscription } from "@hooks/invites/useIsSubscription";
import { UserInterface } from "@models/User/User";
import clsx from "clsx";
import { format } from "date-fns";

interface Props {
  user: UserInterface;
}

const now = Date.now();

const VisitorCard: React.FC<Props> = ({ user }) => {
  const { userSubObj } = useIsSubscription(user.uid);

  const subEnds = userSubObj?.paidPeriodEndsOn
    ? userSubObj?.paidPeriodEndsOn
    : 0;
  const paid = user.companyCodes && user.companyCodes.length;

  return (
    <div
      className={clsx(
        "border p-4",
        paid && subEnds < now ? "border-red-500 border-2" : ""
      )}
    >
      <p className="text-lg font-semibold">{user.name}</p>
      <p className="pt-1 text-sm">{user.uid}</p>
      <p className="text-sm text-red-500">Page: {user.invitedPageId}</p>

      <p className="text-lg text-gray-700 font-bold pt-4">Paid at</p>
      {user.companyCodes &&
        user.companyCodes.map((item, index) => {
          return (
            <div key={`${item}-${index}`}>
              <p className="text-sm font-medium text-green-500">Paid:{item}</p>
            </div>
          );
        })}

      <p className="pt-4">Phone: {user.phone}</p>
      <p>Email: {user.email}</p>
      <p>College: {user.collegeName}</p>
      <p>
        Team Present:{" "}
        {user.participatingInGameWithTeam &&
        user.participatingInGameWithTeam[TEAM_ALPHABET_GAME]
          ? "PRESENT"
          : "NOT PRESENT"}
      </p>
      {userSubObj?.paidPeriodEndsOn ? (
        <p className="text-red-500 font-medium">
          Subscription ENDS:{" "}
          {format(new Date(userSubObj?.paidPeriodEndsOn), "dd/MM/yyyy")}
        </p>
      ) : null}
      <div className="pt-4 flex flex-col">
        <p>Origins</p>
        {user.origins &&
          user.origins.map((item) => {
            return (
              <div key={item}>
                <p className="text-gray-700 font-bold">Origin: {item}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default VisitorCard;
