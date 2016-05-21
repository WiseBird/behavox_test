/// <reference path="../../tsd.d.ts" />

module Test.Emails {
    'use strict';

    class ViewSideBarController {

        constructor(public $scope: ng.IScope) {

        }
    }

    export var viewSideBarControllerRegistration = [
        '$scope',
        ViewSideBarController];
}
