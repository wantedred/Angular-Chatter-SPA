export class Message {
    username: string;
    type: string;
    text: string;
    date: Date;

    constructor(username: string, type: string, text: string, date: Date) {
      this.username = username;
      this.type = type;
      this.text = text;
      this.date = date;
    }

  }
