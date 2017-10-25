"use strict";

const tmdb = require("./tmdb");
const firebaseApi = require("./firebaseApi");

// promise for db/apiKeys.json
const apiKeys = () => {
    return new Promise((resolve, reject) => {
        $.ajax("./db/apikeys.json").done((data) => {
            resolve(data.apiKeys);
        }).fail((error) => {
            reject(error);
        });
    });
};

// executes apiKeys. on successful load calls tmdb.setKey
const retrieveKeys = () => {
    apiKeys().then((results) => {
        tmdb.setKey(results.tmdb.apiKey);
        firebaseApi.setKey(results.firebaseKeys);
        firebase.initializeApp(results.firebaseKeys);
    }).catch((error) => {
        console.log("error in retrieve keys", error);
    });
};

module.exports = {retrieveKeys};
