/// <reference path="tsd.d.ts" />

'use strict';

angular
    .module('test', [
        'ngSanitize',

        'ui.router',
        'ui.bootstrap',
        'infinite-scroll',
        'ui.select',

        'test.common',
        'test.emails'
    ])
;