# **SocialBoat.live**

## App Structure

### Home Stck

1. Home Screen
   1. LandingPage /teams/gameId
   2. TeamSelect
   3. JoinBoatV3
      1. Name
      2. Profile
      3. TeamName
      4. TeamDescription
   4. SubscriptionScreen
   5. SubscriptionAffirmation
   6. HomeScreen /teams
2. CommunityScreen
   1. Feed
   2. Leaderboard
   3. Prizes
   4. HowToWin
   5. PostClick
   6. ReplyScreen
   7. ClapScreen
   8. TeamDetails
   9. WritePostScreen
3. WorkoutScreen
   1. ProgramScreen
   2. TaskScreen
   3. UploadScreen
   4. PostDescription
4. Profile

## State management

1. AuthContext
   1. authState
2. UserContext
   1. UserObject
3. GameContext
   1. SelectedGame
   2. enrollmentStatus
   3. currentSprint
   4. currentRound
4. TeamContext
   1. selectedTeam
   2. enrollmentStatus

## Community Section

### Top level DOM

```
<GameProvider>
    <AuthProvider>
        <UserProvider>
            <Header />

            <SubscriptionContext>
                <TeamConstext>
                    <EventBrief />
                    <TopNav>
                        <PostList />
                        <Leaderboard />
                        <Prizes />
                    </TopNav>


                </ TeamConstext>
            <SubscriptionContext>


            <LockedProgram />
        </UserProvider>

        <LockedProgram />
    <AuthProvider>
<GameProvider>
```

### PostList

```
<>
    <PostContext>
        <PostHeader />
        <PostText>
        <ActivityContext>
            <ReviewContext>
                <PostMedia />
            </ ReviewContext>
        </ActivityContext>
        <PostShareElements />
    </ PostContext>
    <Footer />
</>

```

### Leaderboard

```
<>
    <UserRankContext>
        <TeamRankContext>
            <RankTopKPIs />
            <LeaderboardToggle />

            <UserLeaderboard />

            <TeamLeaderboard />

            <HowCanIWin />

        </UserRankCotext>
    </TeamRankContext>
</>
```

### Prizes

```
<>
    <UserRankContext>
        <TeamRankContext>
            <Badges />
        </TeamRankContext>
    </UserRankContext>
</>
```
