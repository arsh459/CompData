import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { getGameNameReadable } from "@templates/TaskTemplate/utils";
import Button from "@components/button";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import axios from "axios";
import { useLocalUserV2 } from "@hooks/joinBoat/useLocalUserV2";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTeamCreate } from "@hooks/joinBoat/V5/useTeamCreate";
import UserLandingContent from "@templates/UserLandingContent";
import { useRouter } from "next/router";
import UserRecommendationContent from "@templates/UserRecommendationContent/index";
import DietAndWorkout from "@templates/DietAndWorkout";
import HowItWorks from "@templates/HowItWorks";
// import { useHomeBadgesV2 } from "@hooks/badges/useHomeBadgesV2";
import Recommendations from "@modules/Bookings/Recommendations";
import BadgeName from "@modules/UserDaily/BadgeName";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

interface Props {
  uid: string;
}

const TeamCheck: React.FC<Props> = ({ uid }) => {
  const { user, authStatus } = useAuth();
  const user2 = useUserV2(uid);
  const [loading, setLoading] = useState<boolean>(false);
  // const { badges } = useHomeBadgesV2(TEAM_ALPHABET_GAME);
  const onCreateTeam = async () => {
    setLoading(true);

    try {
      await axios({
        url: "/api/createTeam",
        method: "POST",
        data: {
          uid: uid,
        },
      });
      setLoading(true);
    } catch (error) {
      setLoading(false);
    }
  };

  const {
    localUser,
    onKeyChange,
    onFPUpdate,
    onNameUpdate,
    onGenderUpdate,
    onBadgeIdUpdate,
    onNutritionBadgeIdUpdate,
    onDailyFPUpdate,
    onBioUpdate,
    onLandingContentChange,
    uploadLandingImg,
    removeLandingImg,
    onRecommendationObjChange,
    onUpdateOffset,
    onAddDietAndWorkout,
    onRemoveDietAndWorkout,
    onAddHowItWorks,
    onRemoveHowItWorks,
    onMyAdSourceKeyUpdate,
  } = useLocalUserV2(user2.user);

  const [toAddTeamId, setTeamId] = useState<string>("");

  const { onTeamAdd } = useTeamCreate(user2.user, toAddTeamId);

  // console.log("local", localUser, user2.user);
  const router = useRouter();

  const onSaveKey = async () => {
    if (uid) {
      await updateDoc(doc(db, "users", uid), {
        userKey: localUser?.userKey ? localUser.userKey : "",
        name: localUser?.name ? localUser.name : "",
        bio: localUser?.bio ? localUser.bio : "",
        gender: localUser?.gender ? localUser.gender : "notSpecified",
        badgeId: localUser?.badgeId ? localUser.badgeId : "",
        myAdSourceKey: localUser?.myAdSourceKey ? localUser.myAdSourceKey : "",
        nutritionBadgeId: localUser?.nutritionBadgeId
          ? localUser.nutritionBadgeId
          : "",
        ...(typeof localUser?.fpCredit === "number"
          ? { fpCredit: localUser.fpCredit }
          : {}),
        ...(typeof localUser?.fpDebit === "number"
          ? { fpDebit: localUser.fpDebit }
          : {}),
        ...(typeof localUser?.dailyFPTarget === "number"
          ? { dailyFPTarget: localUser.dailyFPTarget }
          : {}),

        ...(localUser?.landingContent
          ? { landingContent: localUser.landingContent }
          : {}),
        ...(localUser?.recommendationConfig
          ? { recommendationConfig: localUser.recommendationConfig }
          : {}),
      });

      router.push("/admin/teamCheck");
    }
  };

  const onTeamAddClick = async () => {
    if (uid) {
      await onTeamAdd();
    }
  };

  // const onRefreshSteps = () => {
  // api call to. uid: string
  // url
  // };
  // const onUpdateAccess = async () => {
  // api call to. uid: string, gameId: string, accessTill: number
  // url
  // };

  // console.log("local", localUser?.badgeId);
  // console.log("nutri", badges);

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/teamCheck/${uid}`}
      canonical={`https://${homeDomain}/admin/teamCheck/${uid}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" ? (
        <div className="w-full lg:w-1/2 mx-auto">
          {user2.user?.participatingInGameWithTeam &&
            Object.keys(user2.user?.participatingInGameWithTeam).map((item) => {
              return (
                <div key={item} className="flex items-center">
                  <p>Team in </p>
                  <p className="pl-2 text-lg text-red-500 font-medium">
                    {getGameNameReadable(item)}
                  </p>
                  <p className="text-green-500 p-2">
                    TeamId:{" "}
                    {user2.user?.participatingInGameWithTeam &&
                      user2.user?.participatingInGameWithTeam[item].teamId}
                  </p>
                </div>
              );
            })}

          {user2.user?.gifter ? (
            <div>
              <p className="text-red-500 text-2xl font-bold">
                DANGER: USER IS GIFTER
              </p>
            </div>
          ) : null}

          {user2.user?.participatingInGameWithTeam &&
          user2.user.participatingInGameWithTeam[TEAM_ALPHABET_GAME] ? null : (
            <div className="py-10">
              <p className="text-red-500 text-2xl font-bold">Add to Team Id</p>
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                helperText="Team Id to add"
                label={"teamId code comes"}
                // variant="outlined"
                onChange={(val) => setTeamId(val.target.value)}
                value={toAddTeamId}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div className="flex" onClick={onTeamAddClick}>
                <Button appearance="contained">Add to team</Button>
              </div>
            </div>
          )}

          <div className="py-10">
            <TextField
              style={{ width: "100%" }}
              placeholder={""}
              helperText="no spaces or special characters"
              label={"User Key"}
              // variant="outlined"
              onChange={(val) => onKeyChange(val.target.value)}
              value={localUser?.userKey}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                helperText="no spaces or special characters"
                label={"My AdSource Key"}
                // variant="outlined"
                onChange={(val) => onMyAdSourceKeyUpdate(val.target.value)}
                value={localUser?.myAdSourceKey}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                helperText="Do not change name unless needed"
                label={"Name"}
                // variant="outlined"
                onChange={(val) => onNameUpdate(val.target.value)}
                value={localUser?.name}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                helperText="Daily FP Target"
                label={"Daily FP Target"}
                // variant="outlined"
                onChange={(val) => onDailyFPUpdate(val.target.value)}
                value={localUser?.dailyFPTarget}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                helperText="Credit Points"
                label={"FP Credit"}
                // variant="outlined"
                onChange={(val) => onFPUpdate(val.target.value, "fpCredit")}
                value={localUser?.fpCredit}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                helperText="Debit Points"
                label={"FP Debit"}
                // variant="outlined"
                onChange={(val) => onFPUpdate(val.target.value, "fpDebit")}
                value={localUser?.fpDebit}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="w-[200px] py-8">
              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Auth key
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={
                      localUser?.gender === "male"
                        ? 0
                        : localUser?.gender === "female"
                        ? 1
                        : 2
                    }
                    label="AuthKey"
                    onChange={(e) =>
                      onGenderUpdate(
                        e.target.value === 0
                          ? "male"
                          : e.target.value === 1
                          ? "female"
                          : "notSpecified"
                      )
                    }
                  >
                    <MenuItem value={0}>male</MenuItem>
                    <MenuItem value={1}>female</MenuItem>
                    <MenuItem value={2}>notSpecified</MenuItem>
                  </Select>
                </FormControl>
              </ThemeProvider>
            </div>
            {/* <div className="pt-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Badge Id to give"}
                label={"Badge Id to gove"}
                variant="outlined"
                onChange={(e) => onBadgeIdUpdate(e.target.value)}
                value={localUser?.badgeId}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {badges.map((each) => (
                  <MenuItem key={each.id} value={each.id}>
                    {each.name || each.id}
                  </MenuItem>
                ))}
              </TextField>
            </div> */}
            <div className="p-4 bg-blue-50 border mb-8">
              <div className="pb-4">
                <BadgeName keyStr="Workout" id={localUser?.badgeId} />
              </div>
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                helperText="Badge Id"
                label={"Badge Id to give"}
                // variant="outlined"
                onChange={(val) => onBadgeIdUpdate(val.target.value)}
                value={localUser?.badgeId}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            {/* <div className="py-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Nutrition Badge Id to gove"}
                label={"Nutrition Badge Id to gove"}
                variant="outlined"
                onChange={(e) => onNutritionBadgeIdUpdate(e.target.value)}
                value={localUser?.nutritionBadgeId}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {badges.map((each) => (
                  <MenuItem key={each.id} value={each.id}>
                    {each.name || each.id}
                  </MenuItem>
                ))}
              </TextField>
            </div> */}
            <div className="p-4 bg-red-50 border">
              <div className="pb-4">
                <BadgeName keyStr="Diet" id={localUser?.nutritionBadgeId} />
              </div>
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                helperText="Nutrition Badge Id"
                label={"Nutrition Badge Id to give"}
                // variant="outlined"
                onChange={(val) => onNutritionBadgeIdUpdate(val.target.value)}
                value={localUser?.nutritionBadgeId}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <UserLandingContent
              localUser={localUser}
              onBioUpdate={onBioUpdate}
              onLandingContentChange={onLandingContentChange}
              uploadLandingImg={uploadLandingImg}
              removeLandingImg={removeLandingImg}
            />
            <UserRecommendationContent
              localUser={localUser}
              onRecommendationObjChange={onRecommendationObjChange}
              onUpdateOffset={onUpdateOffset}
            />
            <DietAndWorkout
              localUser={localUser}
              onAddDietAndWorkout={onAddDietAndWorkout}
              onRemoveDietAndWorkout={onRemoveDietAndWorkout}
            />
            <HowItWorks
              localUser={localUser}
              onAddHowItWorks={onAddHowItWorks}
              onRemoveHowItWorks={onRemoveHowItWorks}
            />
            <Button appearance="contained" onClick={onSaveKey}>
              Save Data
            </Button>
          </div>

          <div>
            <Recommendations uid={uid} />
          </div>

          {user2.user?.participatingInGameWithTeam &&
          user2.user.participatingInGameWithTeam[
            TEAM_ALPHABET_GAME
          ] ? null : loading ? (
            <div className="flex justify-center items-center text-4xl font-bold h-screen">
              Loading
            </div>
          ) : (
            <Button appearance="contained" onClick={onCreateTeam}>
              Create Team in TEAM ALPHABET
            </Button>
          )}

          {/* <div className="py-4">
            <Button onClick={onRefreshSteps} appearance="contained">
              Refresh steps
            </Button>
          </div> */}

          {/* <div className="py-4">
            <TextField
              style={{ width: "100%" }}
              placeholder={""}
              helperText="Access till"
              label={"Give access till"}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button onClick={onUpdateAccess} appearance="contained">
              Give access
            </Button>
          </div> */}
        </div>
      ) : (
        //
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          {authStatus === "FAILED" ||
          (authStatus === "SUCCESS" && user?.role !== "admin")
            ? "Unauthorized access"
            : "Something went wrong"}
        </div>
      )}
    </DefaultLayout>
  );
};

export default TeamCheck;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    revalidate: 1,
    props: {
      uid: params ? params.uid : "",
    },
  };
};
