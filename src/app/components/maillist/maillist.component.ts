import { MailService } from "./../../services/mail/mail.service";
import { Component, OnInit } from "@angular/core";
import { Mail } from "../../models/mail/mail";

@Component({
  selector: "app-maillist",
  templateUrl: "./maillist.component.html",
  styleUrls: ["./maillist.component.css"],
})
export class MaillistComponent implements OnInit {
  mailService: MailService;
  mails: Mail[];
  mailMap: Map<string, Mail[]>;
  deleteMap: Map<number, Mail> = new Map<number, Mail>();

  constructor(mailService: MailService) {
    this.mailService = mailService;
  }

  ngOnInit() {
    // this.mailService.retrieveMail(10).subscribe((mails) => {
    //   this.mails = mails;
    // });

    this.mailMap = this.mailService.retrieveMailSortedByFrom(10);

    //console.log(this.mailMap);
  }

  commit() {
    this.mailService.deleteMail(this.deleteMap);
  }

  toggleDeleteMail(mail) {
    mail.deleted ?
      this.removeMailFromDeleteList(mail):this.addMailToDeleteList(mail);

  }

  addMailToDeleteList(mail: Mail) {
    if (!this.deleteMap.has(mail.id)) {
      //console.log('Adding mail to delete map: ', JSON.stringify(mail));
      this.deleteMap.set(mail.id, mail);
      mail.deleted = true;
    }
    // else {
    //   console.log('Mail already contained in delete map: ', JSON.stringify(mail));
    // }
    //console.log(this.deleteMap);
  }

  removeMailFromDeleteList(mail: Mail) {
    if (this.deleteMap.has(mail.id)) {
      //console.log('Mail contained in delete map: ', JSON.stringify(mail));
      this.deleteMap.delete(mail.id);
      mail.deleted = false;
    }
    // else {
    //   console.log('Mail not contained in delete map: ', JSON.stringify(mail));
    // }
    //console.log(this.deleteMap);
  }
}
