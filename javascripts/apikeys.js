"use strict";

const tmdb = require("./tmdb");

// promise for db/apiKeys.json
const apiKeys = () => {
    return new Promise((resolve, reject) => {
        $.ajax("./db/apiKeys.json").done((data) => {
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
    }).catch((error) => {
        console.log("error in retrieve keys", error);
    });
};

module.exports = {retrieveKeys};
