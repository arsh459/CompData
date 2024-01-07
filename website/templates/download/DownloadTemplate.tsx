import Button from "@components/button";
import {
  ALPHABET_GAME,
  CHALLENGE_ONE,
  FAT_BURNER_CHALLENGE,
  FAT_BURNER_GAME,
  RUNNER_GAME,
  WFH_CHALLENGE,
  WOMENS_GAME,
  TEAM_ALPHABET_GAME,
  STUDENT_OLYMPICS,
  HEADSTART_GAME,
  BURPEE_GAME,
  GURGAON_FIT,
} from "@constants/gameStats";
import {
  handleUserSummaryRequest,
  handleUserDumpRequest,
  handleTeamDumpRequest,
  handlePaidDump,
} from "@models/User/summary";
import { useState } from "react";
import CalenderInput from "./CalenderInput";
import { Range } from "react-date-range";
import { format, getUnixTime } from "date-fns";
import AuthKeySwitch from "./AuthKeySwitch";

interface Props {}
export type AuthSignupKey = "authSignupTime" | "authSigninTime";
const DownloadTemplate: React.FC<Props> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [authkey, setAuthkey] = useState<AuthSignupKey>("authSignupTime");
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: "selection",
    },
  ]);

  const onUserSummary = async () => {
    setLoading(true);
    const response = await handleUserSummaryRequest();

    csvToFile(response, `UserSummary_${new Date().toLocaleDateString()}.csv`);

    setLoading(false);
  };

  const onPaidUserDump = async () => {
    setLoading(true);
    const response = await handlePaidDump();

    csvToFile(response, `PaidDump_${new Date().toLocaleDateString()}.csv`);

    setLoading(false);
  };

  const csvToFile = (response: string, fileName: string) => {
    var blob = new Blob([response], { type: "text/csv;charset=utf-8;" });

    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const startValue = range[0]?.startDate
    ? format(range[0].startDate, "dd/MM/yyyy")
    : null;
  const endValue = range[0]?.endDate
    ? format(range[0].endDate, "dd/MM/yyyy")
    : null;
  const inputValue =
    endValue !== startValue ? `${startValue} to ${endValue}` : `${startValue}`;
  const onUserDump = async () => {
    // setLoading(true);

    // start?: number;
    // end?: number;
    // key?: "authSignupTime" | "authSigninTime";
    if (range[0]?.startDate && range[0]?.endDate && authkey) {
      const start = getUnixTime(range[0].startDate);
      const end = getUnixTime(range[0].endDate);

      const response = await handleUserDumpRequest(
        start * 1000, // start
        end * 1000, // end
        authkey // key
      );

      csvToFile(response, `UserDump_${new Date().toLocaleDateString()}.csv`);
    }

    setLoading(false);

    // csvToFile(response, `UserDump_${new Date().toLocaleDateString()}.csv`);

    //
  };

  const onTeamSummary = async (id: string, name: string) => {
    try {
      setLoading(true);

      const response = await handleTeamDumpRequest(id);

      csvToFile(
        response,
        `TeamDump_${name}_${new Date().toLocaleDateString()}.csv`
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-4">
      <p className="text-4xl font-bold text-gray-500">Download section</p>

      {loading ? (
        <p className="text-xl font-semibold ">Loading...</p>
      ) : (
        <div>
          <div className="py-8">
            <div className="py-2">
              {range ? (
                <div>
                  <p>
                    StartDate:
                    {range[0].startDate
                      ? getUnixTime(range[0].startDate)
                      : null}
                  </p>
                  <p>
                    EndDate:
                    {range[0].endDate ? getUnixTime(range[0].endDate) : null}
                  </p>
                  <span className="border-red-500 border-2 ">
                    <input
                      value={inputValue}
                      readOnly
                      className="inputBox w-full max-w-xs text-center m-2"
                      onClick={() => setIsOpen((open) => !open)}
                    />
                  </span>
                </div>
              ) : null}
            </div>
            <div className="flex mt-2">
              {/** start, end, key */}

              <CalenderInput
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                range={range}
                setRange={setRange}
              />
            </div>
            <div className="my-2">
              <AuthKeySwitch onChange={setAuthkey} selectedKey={authkey} />
            </div>
            <div className="flex">
              <Button onClick={onUserDump} appearance="contained">
                Complete User Dump
              </Button>
            </div>
          </div>

          <div className="pt-4 flex">
            <Button onClick={onPaidUserDump} appearance="contained">
              Paid User DUmp
            </Button>
          </div>

          <div className="pt-4 flex">
            <Button onClick={onUserSummary} appearance="contained">
              Monthly User Summary
            </Button>
          </div>

          <div className="pt-8">
            <div className="flex">
              <Button
                onClick={() =>
                  onTeamSummary(FAT_BURNER_GAME, "FAT_BURNER_GAME")
                }
                appearance="contained"
              >
                FAT_BURNER_GAME
              </Button>
            </div>
            <div className="flex pt-2">
              <Button
                onClick={() => onTeamSummary(CHALLENGE_ONE, "5k_CAL")}
                appearance="contained"
              >
                5k Calorie Game
              </Button>
            </div>
            <div className="flex pt-2">
              <Button
                onClick={() => onTeamSummary(WFH_CHALLENGE, "WFH_CHALLENGE")}
                appearance="contained"
              >
                WFH_CHALLENGE
              </Button>
            </div>
            <div className="flex pt-2">
              <Button
                onClick={() =>
                  onTeamSummary(FAT_BURNER_CHALLENGE, "FAT_BURNER_CHALLENGE")
                }
                appearance="contained"
              >
                FAT_BURNER_CHALLENGE
              </Button>
            </div>
            <div className="flex pt-2">
              <Button
                onClick={() => onTeamSummary(RUNNER_GAME, "RUNNER_GAME")}
                appearance="contained"
              >
                RUNNER_GAME
              </Button>
            </div>

            <div className="flex pt-2">
              <Button
                onClick={() => onTeamSummary(WOMENS_GAME, "WOMENS_GAME")}
                appearance="contained"
              >
                Womens Game
              </Button>
            </div>

            <div className="flex pt-2">
              <Button
                onClick={() => onTeamSummary(ALPHABET_GAME, "ALPHABET_GAME")}
                appearance="contained"
              >
                ALPHABET GAME
              </Button>
            </div>

            <div className="flex pt-2">
              <Button
                onClick={() =>
                  onTeamSummary(TEAM_ALPHABET_GAME, "TEAM_ALPHABET_GAME")
                }
                appearance="contained"
              >
                Team ALPHABET GAME
              </Button>
            </div>

            <div className="flex pt-2">
              <Button
                onClick={() =>
                  onTeamSummary(STUDENT_OLYMPICS, "STUDENT_OLYMPICS")
                }
                appearance="contained"
              >
                STUDENT_OLYMPICS
              </Button>
            </div>

            <div className="flex pt-2">
              <Button
                onClick={() => onTeamSummary(HEADSTART_GAME, "HEADSTART_GAME")}
                appearance="contained"
              >
                HEADSTART_GAME
              </Button>
            </div>

            <div className="flex pt-2">
              <Button
                onClick={() => onTeamSummary(BURPEE_GAME, "BURPEE_GAME")}
                appearance="contained"
              >
                BURPEE_GAME
              </Button>
            </div>

            <div className="flex pt-2">
              <Button
                onClick={() => onTeamSummary(GURGAON_FIT, "GURGAON_FIT")}
                appearance="contained"
              >
                GURGAON_FIT
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadTemplate;
