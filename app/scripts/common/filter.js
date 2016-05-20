/// <reference path="../tsd.d.ts" />
var Test;
(function (Test) {
    var Common;
    (function (Common) {
        'use strict';
        var Filter = (function () {
            function Filter() {
                this.limit = 10;
                this.page = 1;
            }
            Filter.prototype.withLimit = function (limit) {
                if (limit < 0) {
                    throw new Error('Incorrect limit');
                }
                this.limit = limit;
                return this;
            };
            Filter.prototype.byPage = function (page) {
                if (page <= 0) {
                    throw new Error('Incorrect page');
                }
                this.page = page;
                return this;
            };
            Filter.prototype.filter = function (items) {
                var _this = this;
                var itemsOnPage = items.filter(function (item, ind) {
                    return ind >= (_this.page - 1) * _this.limit && ind < _this.page * _this.limit;
                });
                return {
                    limit: this.limit,
                    page: this.page,
                    pages: Math.ceil(items.length / this.limit),
                    total: items.length,
                    items: itemsOnPage
                };
            };
            return Filter;
        })();
        Common.Filter = Filter;
    })(Common = Test.Common || (Test.Common = {}));
})(Test || (Test = {}));
//# sourceMappingURL=filter.js.map