/// <reference path="../tsd.d.ts" />

module Test.Common {
    'use strict';

    export interface IPagedDataDto<T> {
        limit: number;
        page: number;
        pages: number;
        total: number;

        items: T[];
    }
}