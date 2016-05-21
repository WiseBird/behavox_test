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
                })
            ;

            $urlRouterProvider.otherwise("/emails");
        }
    ];
}