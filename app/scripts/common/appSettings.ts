/// <reference path="../tsd.d.ts" />

module Test.Common {
    'use strict';

    export interface IAppSettings {
        dataUrl: string;
        parentMessageDelimiter: string;
    }

    export var AppSettings: IAppSettings = {
        dataUrl: '/email.json',
        parentMessageDelimiter: '-----Original Message-----'
    }
}