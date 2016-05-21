/// <reference path="../tsd.d.ts" />

module Test.Common {
    'use strict';

    export var routingConfig = [
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
            $stateProvider
                .state("emails", {
                    url: '/emails',
                    abstract: true,
                    template: '<ui-view/>',
                    resolve: {
                        emails: ['test.emails.api', (emailsApi: Emails.IEmailsApi) => emailsApi.ready()]
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
                    })
            ;

            $urlRouterProvider.otherwise("/emails");
        }
    ];
}