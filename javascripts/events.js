"use strict";

const tmdb = require("./tmdb");
const firebaseApi = require("./firebaseApi");
const dom = require("./dom");

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
            firebaseApi.getMovieList().then((results) => {
                dom.clearDom("moviesMine");
                dom.domString(results,tmdb.getImgConfig(),"moviesMine");
            }).catch((error) => {
                console.log(error);
            });
       } else if (e.target.id === "authenticate") {
            $("#search").addClass("hidden");
            $("#myMovies").addClass("hidden");
            $("#authScreen").removeClass("hidden");
       }

    });
};

const googleAuth = () => {
    $("#googleButton").click((e) => {
        firebaseApi.authenticateGoogle().then((result) => {
            console.log("result", result);
        }).catch((error) => {
            console.log("error in authenticate google", error);
        });
    });
};

const wishlistEvents = () => {
    $("body").on("click", ".wishlist", (e) => {
        let mommy = e.target.closest(".movie");

        let newMovie = {
            "title": $(mommy).find(".title").html(),
            "overview": $(mommy).find(".overview").html(),
            "poster_path": $(mommy).find(".poster_path").attr("src").split("/").pop(),
            "rating": 0,
            "isWatched": false,
            "uid": ""
        };
    
        firebaseApi.saveMovie(newMovie).then((results) => {
            $(mommy).remove();
        }).catch((error) => {
            console.log("error in Save movie", error);
        });
    });
};

const reviewEvents = () => {
    $("body").on("click", ".review", (e) => {
        let mommy = e.target.closest(".movie");

        let newMovie = {
            "title": $(mommy).find(".title").html(),
            "overview": $(mommy).find(".overview").html(),
            "poster_path": $(mommy).find(".poster_path").attr("src").split("/").pop(),
            "rating": 0,
            "isWatched": true,
            "uid": ""
        };
    
        firebaseApi.saveMovie(newMovie).then((results) => {
            $(mommy).remove();
        }).catch((error) => {
            console.log("error in Save movie", error);
        });
    });
};

const init = () => {
    myLinks();
    googleAuth();
    pressEnter();
    wishlistEvents();
    reviewEvents();
};

module.exports = {init};