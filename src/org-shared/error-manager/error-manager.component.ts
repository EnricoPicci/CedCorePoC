import { Component, OnInit, ErrorHandler } from '@angular/core';

@Component({
  selector: 'app-error-manager',
  templateUrl: './error-manager.component.html',
  styleUrls: ['./error-manager.component.css'],
  inputs: ['errorMessage', 'remoteServiceName']
})
export class ErrorManagerComponent implements OnInit {
  errorMessage: string;
  remoteServiceName: string;

  private remoteServiceMessage: string;

  constructor() { }

  ngOnInit() {
    this.remoteServiceMessage = `Errore nel richiamare il servizio remoto ${this.remoteServiceName}. 
            Provate un paio di volte e se non funziona chiamate il supporto.`;
  }

  messageToShow() {
    let message = this.errorMessage;
    if (this.remoteServiceName) {
      message = this.remoteServiceMessage;
    }
    return message;
  }

}
