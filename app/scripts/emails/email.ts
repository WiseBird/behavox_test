/// <reference path="../tsd.d.ts" />

module Test.Emails {
    'use strict';

    export interface IEmailDTO {
        from: string;
        to: string;
        cc?: string[];
        bcc?: string[];
        subject: string;
        body: string;
        date: string;
    }

    export class Email {
        from: string;
        to: string;
        cc: string[] = [];
        bcc: string[] = [];
        subject: string;
        body: string;
        date: Date;

        constructor() {
        }

        protected fillFromDto(dto: IEmailDTO) {
            this.from = dto.from;
            this.to = dto.to;
            this.subject = dto.subject;
            this.body = dto.body;
            this.date = new Date(dto.date);

            this.cc = this.cc || dto.cc;
            this.bcc = this.bcc || dto.bcc;
        }

        static fromDTO(dto: IEmailDTO): Email {
            var entity = new Email();
            entity.fillFromDto(dto);
            return entity;
        }
    }
}