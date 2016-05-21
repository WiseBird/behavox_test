/// <reference path="../tsd.d.ts" />

module Test.Emails {
    'use strict';

    export interface IEmailDTO {
        id: number;
        from: string;
        to: string[];
        cc?: string[];
        bcc?: string[];
        subject: string;
        body: string;
        date: string;
        parentId?: number;
    }

    export class Email {
        id: number;
        from: string;
        to: string[];
        cc: string[];
        bcc: string[];
        subject: string;
        body: string;
        date: Date;
        parentId: number;

        constructor() {
        }

        protected fillFromDto(dto: IEmailDTO) {
            this.id = dto.id;
            this.from = dto.from || "";
            this.to = dto.to || [];
            this.subject = dto.subject || "";
            this.body = dto.body || "";
            this.date = new Date(dto.date);
            this.parentId = dto.parentId;

            this.cc = dto.cc || [];
            this.bcc = dto.bcc || [];
        }

        static fromDTO(dto: IEmailDTO): Email {
            var entity = new Email();
            entity.fillFromDto(dto);
            return entity;
        }
    }
}