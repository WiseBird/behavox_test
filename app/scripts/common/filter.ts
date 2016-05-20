/// <reference path="../tsd.d.ts" />

module Test.Common {
    'use strict';

    export class Filter {
        protected limit: number = 10;
        protected page: number = 1;

        withLimit(limit: number): this & Filter {
            if(limit < 0) {
                throw new Error('Incorrect limit');
            }

            this.limit = limit;
            return this;
        }

        byPage(page: number): this & Filter {
            if(page <= 0) {
                throw new Error('Incorrect page');
            }

            this.page = page;
            return this;
        }

        filter<T>(items: T[]): IPagedDataDto<T> {
            var itemsOnPage = items.filter((item: T, ind: number): boolean => {
                return ind >= (this.page - 1) * this.limit && ind < this.page * this.limit;
            });

            return {
                limit: this.limit,
                page: this.page,
                pages: Math.ceil(items.length / this.limit),
                total: items.length,

                items: itemsOnPage
            };
        }
    }
}