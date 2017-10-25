"use strict";

let tmdbKey;
let imgConfig;
const dom = require("./dom");


// promise for search API call 
const searchTMDB = (query) => {
    return new Promise((resolve, reject) => {
        $.ajax(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&page=1&include_adult=false&query=${query}`).done((data) => {
            resolve(data.results);
        }).fail((error) => {
            reject(error);
        });
    });
};

// sets up promise for /configuration route
const tmdbConfiguration = () => {
    return new Promise((resolve, reject) => {
        $.ajax(`https://api.themoviedb.org/3/configuration?api_key=${tmdbKey}`).done((data) => {
            resolve(data.images);
        }).fail((error) => {
            reject(error);
        });
    });
};

// executes tmdbConfiguration. On successful result it saves result.images to private variable imgConfig
const getConfig = () => {
    tmdbConfiguration().then((results) => {
        imgConfig = results;
    }).catch((error) => {
        console.log(error);
    });
};

// executes searchTMDB and passes in the search text from the input field
const searchMovies = (query) => {
    searchTMDB(query).then((results) => {
        showResults(results);
    }).catch((error) => {
        console.log(error);
    });
};

// accepts a string, this function sets the private variable tmdbKey to the string passed in
const setKey = (apiKey) => {
    tmdbKey = apiKey;
    getConfig();
};

// accepts an array, calls dom.domString and passes the array 
const showResults = (movieArray) => {
    dom.clearDom("movies");
    dom.domString(movieArray, imgConfig, "movies", true);
};

const getImgConfig = () => {
    return imgConfig;
};

module.exports = {searchMovies, setKey, getImgConfig};