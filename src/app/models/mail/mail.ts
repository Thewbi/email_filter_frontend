export class Mail {
  id: number;
  from: string;
  subject: string;
  deleted: boolean;
  constructor(id:number, from:string, subject:string) {
    this.id = id;
    this.from = from;
    this.subject = subject;
    this.deleted = false;
  }
}
