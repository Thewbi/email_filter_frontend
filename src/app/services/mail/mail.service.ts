import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Mail } from "../../models/mail/mail";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MailService {
  MAX_MSG_INDEX = 3;
  url: string = "http://localhost:3000/mail/";

  constructor(private http: HttpClient) {}

  retrieveMail(amount: number) {
    //console.log("retrieveMail", amount);
    return this.http.get<Mail[]>(this.url);
  }

  retrieveMailSortedByFrom(amount: number) {
    //console.log("retrieveMailSortedByFrom", amount);

    let map = new Map<string, Mail[]>();

    this.http.get<Mail[]>(this.url + 'retrieve').subscribe((mails) => {
      for (let mail of mails) {

        console.log(JSON.stringify(mail));

        let mailArray = [];
        if (!map.has(mail.from)) {
          map.set(mail.from, mailArray);
        } else {
          mailArray = map.get(mail.from);
        }

        mailArray.push(mail);
      }
    });

    // let mails = [];

    // let mailA = new Mail(1, "user1@test.de", "subjectA");
    // mails.push(mailA);

    // let mailB = new Mail(2, "user1@test.de", "subjectB");
    // mails.push(mailB);

    // let mailC = new Mail(3, "user2@test.de", "subjectC");
    // mails.push(mailC);

    // for (let mail of mails) {
    //   //console.log(JSON.stringify(mail));

    //   let mailArray = [];
    //   if (!map.has(mail.from)) {
    //     map.set(mail.from, mailArray);
    //   } else {
    //     mailArray = map.get(mail.from);
    //   }

    //   mailArray.push(mail);
    // }

    return map;
  }

  deleteMail(deleteMailMap: Map<number, Mail>) {
    console.log("deleteMail", deleteMailMap);

    // return this.http
    //   .post<string>(this.url + "/deletetest", 'test').subscribe(() => {
    //     console.log('lel');
    //   });

    let mails = [];

    deleteMailMap.forEach((value: Mail, key: number) => {
      //console.log(key, value);
      mails.push(value);
  });

    //let body = JSON.stringify(deleteMailMap);
    console.log(mails);

   this.http
      .post<Map<number, Mail>>(this.url + "delete", mails).subscribe(() => {
        console.log('lel');
      });
      //.pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError("Something bad happened; please try again later.");
  }
}
