// grab the Mixpanel factory
var Mixpanel = require("mixpanel");

const MIXPANEL_KEY = process.env.MIXPANEL_KEY;
console.log("mix", MIXPANEL_KEY);

// create an instance of the mixpanel client
export var mixpanel = Mixpanel.init("4a469bdd2f274ba79664f2f7bb7df973");
