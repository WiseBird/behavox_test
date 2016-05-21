/// <reference path="../tsd.d.ts" />

module Test.Common {
    'use strict';

    export interface IPagination {
        limit: number;
        page: number;
        pages: number;
        total: number;
    }

    export interface IPagedData<T> {
        pagination: IPagination;

        items: T[];
    }
}