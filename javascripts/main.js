"use strict";

let events = require("./events");
let apiKeys = require("./apikeys");

apiKeys.retrieveKeys();
events.init();

