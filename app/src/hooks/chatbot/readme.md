1. The store will keep the context of the room.
2. The question to ask will be a popup pushed from the backend.
3. The callback handler will define what needs to be done with the question
   Sakhi V2

- Initial prompt to be saved in the db.
- Initial prompt is router prompt. It's use is to identify the user's intention. The user's intention can be one of the three:

Ask Question

- Ask general question
- Ask question about sb coaches
- Ask about your diet plan
- Ask about your workout plan
- Ask question about their period & menstrual cycle
- Seek customer support

Log progress

- Log energy, mood, weight, sleep, period
- Log what you ate today
- Log your workout

Changes in plan

- Swap item in diet plan
- Change workout plan
- Buy a freeze

Architecture

1. Check what is the type of message?
   1. If text then proceed
   2. If audio, transcribe, upload, save and proceed
2. Save text in db and make call to routerPrompt
3. Router prompt replies with either function call or text
   1. If text then reply to user
   2. If function call, then get the entire function call and make the next function call
   3. Repeat till you get plain text or error

Note:

1. In db, save prompts. Each prompt should have a key. Function calls should return type which should be the key of the next prompt used.
2. Sometimes we will already have routed function. For example, when asking the user if they would like to log. In that scenario, directly send to that promptKey.
