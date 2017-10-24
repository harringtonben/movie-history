"use strict";

const domString = (movieArray, imgConfig, divName) => {
    let printString = ``;
    for (let i = 0; i < movieArray.length; i++) {
        if ( i % 3 === 0 ) {
            printString +=  `<div class="row">`;
        }
            printString +=      `<div class="col-sm-6 col-md-4">
                                    <div class="thumbnail">
                                        <img src="${imgConfig.base_url}/w300/${movieArray[i].poster_path}" alt="">
                                        <div class="caption">
                                        <h3>${movieArray[i].title}</h3>
                                        <p>${movieArray[i].overview}</p>
                                        <p><a href="#" class="btn btn-primary" role="button">Review</a> <a href="#" class="btn btn-default" role="button">Add To Wishlist</a></p>
                                        </div>
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