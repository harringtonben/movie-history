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