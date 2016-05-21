/// <reference path="../tsd.d.ts" />

angular
    .module('test.emails', [])

    .service('test.emails.api', Test.Emails.emailsApiRegistration)
    .factory('test.emails.filter', Test.Emails.Common.filterServiceRegistration)

    .controller('test.emails.listController', Test.Emails.listControllerRegistration)
    .controller('test.emails.listSideBarController', Test.Emails.listSideBarControllerRegistration)

    .controller('test.emails.viewController', Test.Emails.viewControllerRegistration)
    .controller('test.emails.viewSideBarController', Test.Emails.viewSideBarControllerRegistration)
    .directive('testEmailsFullView', Test.Emails.fullViewDirectiveRegistration)

    .run(Test.Emails.emailsLoaderRunConfig)
;