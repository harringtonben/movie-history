(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const tmdb = require("./tmdb");
const firebaseApi = require("./firebaseApi");

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
        firebaseApi.setKey(results.firebaseKeys);
        firebase.initializeApp(results.firebaseKeys);
    }).catch((error) => {
        console.log("error in retrieve keys", error);
    });
};

module.exports = {retrieveKeys};

},{"./firebaseApi":4,"./tmdb":6}],2:[function(require,module,exports){
"use strict";

const domString = (movieArray, imgConfig) => {
    let printString = ``;
    for (let i = 0; i < movieArray.length; i++) {
        if ( i % 3 === 0 ) {
            printString +=  `<div class="row">`;
        }
            printString +=      `<div class="col-sm-6 col-md-4">
                                    <div class="thumbnail">
                                        <img src="${imgConfig.base_url}w300${movieArray[i].poster_path}" alt="">
                                        <div class="caption">
                                        <h3>${movieArray[i].original_title}</h3>
                                        <p>${movieArray[i].overview}</p>
                                        <p><a href="#" class="btn btn-primary" role="button">Review</a> <a href="#" class="btn btn-default" role="button">Add To Wishlist</a></p>
                                        </div>
                                    </div>
                                </div>`;
        if (i % 3 === 2 || i === movieArray.length - 1) {
            printString +=  `</div>`;
        }
    }
            
    printToDom(printString);
};

const printToDom = (strang) => {
    $("#movies").append(strang);
};

const clearDom = () => {
    $("#movies").empty();
    $("#searchBar").val("");
};

module.exports = {domString, clearDom};
},{}],3:[function(require,module,exports){
"use strict";

const tmdb = require("./tmdb");

const pressEnter = () => {
    $(document).keypress((e) => {
        if (e.key === "Enter") {
            let searchText = $("#searchBar").val();
            let query = searchText.replace(/ /g, "%20");
            tmdb.searchMovies(query);
        }
    });
};

const myLinks = () => {
    $(document).click((e) => {
       if (e.target.id === "moviesearch") {
            $("#search").removeClass("hidden");
            $("#myMovies").addClass("hidden");
            $("#authScreen").addClass("hidden");
       } else if (e.target.id === "moviesLink") {
            $("#search").addClass("hidden");
            $("#myMovies").removeClass("hidden");
            $("#authScreen").addClass("hidden");
       } else if (e.target.id === "authenticate") {
            $("#search").addClass("hidden");
            $("#myMovies").addClass("hidden");
            $("#authScreen").removeClass("hidden");
       }

    });
};

module.exports = {pressEnter, myLinks};
},{"./tmdb":6}],4:[function(require,module,exports){
"use strict";

let firebaseKey = "";

const setKey = (key) => {
    firebaseKey = key;
};


module.exports = {setKey};
},{}],5:[function(require,module,exports){
"use strict";

let events = require("./events");
let apiKeys = require("./apikeys");

apiKeys.retrieveKeys();
events.myLinks();
events.pressEnter();
},{"./apikeys":1,"./events":3}],6:[function(require,module,exports){
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
    dom.clearDom();
    dom.domString(movieArray, imgConfig);
};

module.exports = {searchMovies, setKey};
},{"./dom":2}]},{},[5]);
