import { initMap } from '../components/_gmaps';

let instance = null;

/**
 * @class App
 * Singleton Pattern
 */
class App {

    constructor() {
        if (!instance) {
            instance = this;
        }

        if ($('html').attr('data-debug')) {
            $.fn.debug = true;
        }

        // Copyright 2014-2017 The Bootstrap Authors
        // Copyright 2014-2017 Twitter, Inc.
        // Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement('style');
            msViewportStyle.appendChild(
                document.createTextNode(
                    '@-ms-viewport{width:auto!important}'
                )
            );
            document.head.appendChild(msViewportStyle);
        }

        this.initMap = initMap;

        return instance;
    }

}

const AppInstance = new App();

Object.freeze(AppInstance);
export default AppInstance;