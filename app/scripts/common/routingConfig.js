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
                    template: '<ui-view/>',
                    resolve: {
                        emails: ['test.emails.api', function (emailsApi) { return emailsApi.ready(); }]
                    }
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
                })
                    .state("emails.view", {
                    parent: 'emails',
                    url: '/:id',
                    views: {
                        "sidebar@": {
                            templateUrl: 'scripts/emails/view/viewSideBar.html'
                        },
                        "": {
                            templateUrl: 'scripts/emails/view/view.html'
                        }
                    }
                });
                $urlRouterProvider.otherwise("/emails");
            }
        ];
    })(Common = Test.Common || (Test.Common = {}));
})(Test || (Test = {}));
//# sourceMappingURL=routingConfig.js.map