"use strict";

const ratingWrapper = '.js-rating-toggle';


function bindClick(elem) {
  let $elem = document.querySelector(elem);
  $elem.addEventListener('click', function (e) {
    console.warn(this);
    console.warn(e.target);
    console.warn([...this.children].indexOf(e.target));
    console.warn(Array.from(this.children).indexOf(e.target));
    
  }, false);
}


document.addEventListener('DOMContentLoaded', () => {
  
  if (document.querySelector(ratingWrapper) !== undefined) {
    bindClick(ratingWrapper);
  }
  
}, false);

