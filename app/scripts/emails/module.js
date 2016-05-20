/// <reference path="../tsd.d.ts" />
angular
    .module('test.emails', [])
    .service('test.emails.api', Test.Emails.emailsApiRegistration)
    .run(Test.Emails.emailsLoaderRunConfig);
//# sourceMappingURL=module.js.map