"use strict";

const domString = (movieArray, imgConfig, divName, search) => {
    let printString = ``;
    for (let i = 0; i < movieArray.length; i++) {
        if ( i % 3 === 0 ) {
            printString +=  `<div class="row">`;
        }
            printString +=      `<div class="col-sm-6 col-md-4 movie">
                                    <div class="thumbnail">`;
            if (!search) {
            printString +=          `<button class="btn btn-default delete" data-firebase-id="${movieArray[i].id}">X</button>`;
            }
            printString +=          `<img class="poster_path" src="${imgConfig.base_url}/w300/${movieArray[i].poster_path}"     alt="">
                                        <div class="caption">
                                        <h3 class="title">${movieArray[i].title}</h3>
                                        <p class="overview">${movieArray[i].overview}</p>`;
            if (search) {
            printString +=              `<p><a class="btn btn-primary review" role="button">Review</a> <a class="btn btn-default wishlist" role="button">Add To Wishlist</a></p>`;
            } else {
            printString +=              `<p>Rating: ${movieArray[i].rating}</p>`;
            }
            printString +=              `</div>
                                    </div>
                                </div>`;
        if (i % 3 === 2 || i === movieArray.length - 1) {
            printString +=  `</div>`;
        }
    }
            
    printToDom(printString, divName);
};

const printToDom = (strang, divName) => {
    $(`#${divName}`).append(strang);
};

const clearDom = (divName) => {
    $(`#${divName}`).empty();
    $("#searchBar").val("");
};

module.exports = {domString, clearDom};