import { Component } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent {

  message: string = "";

  constructor (
                public _chatService: ChatService
              )
  {
    this._chatService.addMessage()
      .subscribe( (message:any[]) => {
        console.log( message );
      });
  }

  sendMessage() {
    console.log(this.message);
  }

}
