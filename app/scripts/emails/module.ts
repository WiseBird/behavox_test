/// <reference path="../tsd.d.ts" />

angular
    .module('test.emails', [])

    .service('test.emails.api', Test.Emails.emailsApiRegistration)
    .service('test.emails.parser', Test.Emails.emailsParserServiceRegistration)
    .factory('test.emails.filter', Test.Emails.Common.filterServiceRegistration)

    .controller('test.emails.listController', Test.Emails.listControllerRegistration)
    .controller('test.emails.listSideBarController', Test.Emails.listSideBarControllerRegistration)

    .controller('test.emails.viewController', Test.Emails.viewControllerRegistration)
    .controller('test.emails.viewSideBarController', Test.Emails.viewSideBarControllerRegistration)
    .directive('testEmailsFullView', Test.Emails.fullViewDirectiveRegistration)
    .directive('testEmailsShortView', Test.Emails.shortViewDirectiveRegistration)

    .run(Test.Emails.emailsLoaderRunConfig)
;