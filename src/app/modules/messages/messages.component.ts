import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @Input()
  public isMyMessage : boolean;

  @Input()
  public message : string;

  @Input()
  public username : string;

  @Input()
  public dateTime : string;

  constructor() { }

  ngOnInit(): void {
  }

}
