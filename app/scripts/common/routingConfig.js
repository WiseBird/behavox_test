/// <reference path="../tsd.d.ts" />
var Test;
(function (Test) {
    var Common;
    (function (Common) {
        'use strict';
        Common.routingConfig = [
            '$stateProvider',
            '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state("emails", {
                    url: '/emails',
                    abstract: true,
                    template: '<ui-view/>'
                })
                    .state("emails.list", {
                    parent: 'emails',
                    url: '',
                    views: {
                        "sidebar@": {
                            templateUrl: 'scripts/emails/list/listSideBar.html'
                        },
                        "": {
                            templateUrl: 'scripts/emails/list/list.html'
                        }
                    }
                });
                $urlRouterProvider.otherwise("/emails");
            }
        ];
    })(Common = Test.Common || (Test.Common = {}));
})(Test || (Test = {}));
//# sourceMappingURL=routingConfig.js.map