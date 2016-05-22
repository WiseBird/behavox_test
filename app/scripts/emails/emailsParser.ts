/// <reference path="../tsd.d.ts" />

module Test.Emails {
    'use strict';

    export interface IEmailsParser {
        parse(dtos: IEmailDTO[]): Email[];
    }

    class EmailsParser implements IEmailsParser{
        sendersEmails: {
            [index: string]: IEmailDTO[]
        } = {};

        constructor(private appSetings: Test.Common.IAppSettings) {

        }

        parse (dtos: IEmailDTO[]): Email[] {
            this.setIdsToDtos(dtos);
            this.extractParentEmails(dtos);

            var emails = this.convertDtos(dtos);
            this.sortEmails(emails);

            return emails;
        }
        private setIdsToDtos(dtos: IEmailDTO[]) {
            dtos.forEach((dto, ind) => {
                dto.id = ind + 1;
            });
        }
        private extractParentEmails(dtos: IEmailDTO[]) {
            var newDtos: IEmailDTO[] = [];
            var lastId = dtos.length;

            dtos.forEach((dto) => {
                if(!dto.body) {
                    return;
                }

                var messages = dto.body.split(this.appSetings.parentMessageDelimiter).map(x => x.trim());
                dto.body = messages[0];

                var prevDto = dto;
                for(let i = 1; i < messages.length; i++) {
                    var message = messages[i];

                    var newDto = this.extractParentEmailFromText(message);
                    newDto.id = lastId + 1;
                    newDto.hasChildren = true;
                    newDtos.push(newDto);

                    prevDto.parentId = newDto.id;
                    prevDto = newDto;
                    lastId++;
                }
            });

            dtos.push.apply(dtos, newDtos);
        }
        private extractParentEmailFromText(message: string): IEmailDTO {
            var newDto: IEmailDTO = <any>{};

            var bodyStart = message.indexOf("\n\n");
            if(bodyStart !== -1) {
                newDto.body = message.substr(bodyStart).trim();
            }

            var headers = message.substring(0, bodyStart !== -1 ? bodyStart : message.length).trim();
            var lines = headers.split("\n").map(x => x.trim());
            lines.forEach(line => {
                if(!line) {
                    return;
                }

                if(line.indexOf("From:") === 0) {
                    newDto.from = line.substr(5).trim();
                } else if(line.indexOf("Sent:") === 0) {
                    newDto.date = line.substr(5).trim();
                } else if(line.indexOf("To:") === 0) {
                    newDto.to = line.substr(3).trim().split(";").map(x => x.trim());
                } else if(line.indexOf("Cc:") === 0) {
                    newDto.cc = line.substr(3).trim().split(";").map(x => x.trim());
                } else if(line.indexOf("Bcc:") === 0) {
                    newDto.bcc = line.substr(4).trim().split(";").map(x => x.trim());
                } else if(line.indexOf("Subject:") === 0) {
                    newDto.subject = line.substr(8).trim();
                }
            });

            return newDto;
        }
        private convertDtos(dtos: IEmailDTO[]): Email[] {
            return dtos.map((x, ind) => Email.fromDTO(x));
        }
        private sortEmails(emails: Email[]) {
            emails.sort((a,b) => {
                if(a.date > b.date) {
                    return -1;
                } else if(a.date < b.date) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
    }

    export var emailsParserServiceRegistration = [
        'test.common.appSetings',
        EmailsParser
    ];
}