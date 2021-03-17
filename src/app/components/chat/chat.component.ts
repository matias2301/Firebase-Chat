import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  message: string = "";

  @ViewChild('scroll') private myScroll!: ElementRef;

  constructor (
                public _chatService: ChatService
              )
  {
    this._chatService.loadMessage()
      .subscribe( () => {
        setTimeout(() => {                   
          this.scrollToBottom();
        }, 15);
      });
  }

  ngOnInit() {    
  }

  scrollToBottom() {
    this.myScroll.nativeElement.scrollTop = this.myScroll.nativeElement.scrollHeight;
  }

  sendMessage() {
    if( this.message.length === 0 ) return;

    this._chatService.addMessage( this.message )
      .then( () => {
        this.message = "";
        this.scrollToBottom();       
      })
      .catch( (err) => console.error('Something went wrong', err) );
  }

}
