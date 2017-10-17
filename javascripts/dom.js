"use strict";

const domString = (movieArray) => {
    let printString = ``;
    for (let i = 0; i < movieArray.length; i++) {
        if ( i % 3 === 0 ) {
            printString +=  `<div class="row">`;
        }
            printString +=      `<div class="col-sm-6 col-md-4">
                                    <div class="thumbnail">
                                        <img src="https://media.giphy.com/media/5M2ZVnDZOwJzi/giphy.gif" alt="">
                                        <div class="caption">
                                        <h3>${movieArray[i].original_title}</h3>
                                        <p>${movieArray[i].overview}</p>
                                        <p><a href="#" class="btn btn-primary" role="button">Review</a> <a href="#" class="btn btn-default" role="button">Add To Wishlist</a></p>
                                        </div>
                                    </div>
                                </div>`;
        if (i % 3 === 2) {
            printString +=  `</div>`;
        }
    }
            
    printToDom(printString);
};

const printToDom = (strang) => {
    $("#movies").append(strang);
};

module.exports = {domString};