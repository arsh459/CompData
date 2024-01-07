Streak

How does the streak start?

- Post any activity (Workout, diet) we take user to the the CircularProgressScreen
- This screen is where FP are increased or decreased.
- Take user to Streak Flow

Streak Flow
States in streak flow

- No active streak
- - No Streak ever done
- - Some past streaks data exists

- Active streak
- - Todays increment is not done
- - Todays increment is done (NO ACTION)

How to save streak in db?

In the db, we have an interface -> Activity

Dynamic option
// fetch activities in past X days, which are greater than Y.
// dayActivityObj -> {[date: string]: Activity[]} // yyyy-MM-dd

// X -> Current Streak Length
// Y -> streakTh

Static option
/users/uid/streaks/streakId

export type streakLevels = 7 | 14 | 21 | 28 | 35 | 42 | 49 | 56 | 63 | 70;

export streakLabel = 'hit' | 'miss' | 'freeze'

interface PendingNotification {
type: "hit" | "miss" | "freeze"
maxUnixToShow: number;
}

// after showing the nofication

interface Streak {
id: string;
startedOn: number; // unix 31st Oct
activeTill: number; // unix 1st Nov 11:59pm
updatedOn: number; // unix
targetDays: streakLevels
days: number; // 4 day streak
streakMap: {[date: string]: streakLabel};

pendingNotification?: PendingNotification
}

sample Streak map
{
"2023-12-23": 'hit',
}

TO DO

- Post workout completion, we have to take user to this screen
- Zustand store for handling streak

MealScreen - onTrackMeal. FP are getting updated


Understanding:
active till will get updated on every day with updatedOn key

target day also need to updated 
-- will check from Started on how may days 

when the decerment fp case

                                         -> if no then the screen not now/ continue screen
onTrackMeal -> check does streaks exists -> if yes then [need to takeout the latest streak document] / active till query
-> check pending notification -> show the streak increment -> click continue nomral flow

-> fp increament -> check updated on if todays day then no action or else update
-> fp decrement -> how we will went back and also need to check suposse 2 inc and 1 dec then the streak need to be maintained means no removal of streak for that day
for the above need to have some kind of counter
// useActive streak will keep the updated data

//update streak fetch activites greater than zero 
re-set function 

user can navigate to streak screen from the header section streak icon
