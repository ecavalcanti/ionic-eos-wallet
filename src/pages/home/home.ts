import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EosProvider } from '../../providers/eos/eos';
import { SendPage } from '../send/send'
import { ReceivePage } from '../receive/receive';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  balance: string;
  account: string;

  constructor(public navCtrl: NavController, private eos: EosProvider, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.account = this.eos.account;
    this.eos.getAccountBalance().
      then(result => this.balance = result[0])
  }

  goSend() {
    this.navCtrl.push(SendPage);
  }

  goReceive() {
    this.navCtrl.push(ReceivePage);
  }

}
