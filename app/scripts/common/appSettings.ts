/// <reference path="../tsd.d.ts" />

module Test.Common {
    'use strict';

    export interface IAppSettings {
        dataUrl: string;
    }

    export var AppSettings: IAppSettings = {
        dataUrl: '/email.json'
    }
}