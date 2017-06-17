'use strict';

if (module.hot) {
    module.hot.accept();
}

// Plugins and base components
import 'babel-polyfill';
//import 'jquery';
import '../scss/main.scss';
// Components
import './components/_chat.js';
import './budget.js';
import './iframe-modal.js';
import './checklist.js';
import './guestlist.js';
import './supplier.js';
import './components/_awesomplete';
import './components/_fileupload';
import './components/_favoriteToggle';
import './components/_rateItem';
import './components/_listingSlider';
import './components/_gmaps';

// Global App singleton object
import App from './base/_app';

window.App = App;

if (App.debug) {
    console.log(App);
}