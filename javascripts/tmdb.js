"use strict";

let tmdbKey;
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
};

// accepts an array, calls dom.domString and passes the array 
const showResults = (movieArray) => {
    dom.clearDom();
    dom.domString(movieArray);
};

module.exports = {searchMovies, setKey};