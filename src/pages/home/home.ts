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
  balanceUSD: string;

  constructor(public navCtrl: NavController, private eos: EosProvider, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.account = this.eos.account;
    this.eos.getAccountBalance().
      then(result => {
        this.balance = result[0];
        const eos = this.balance.split(' ')[0].trim();

        this.eos.getEosToUSD(Number.parseFloat(eos))
          .then(result => this.balanceUSD = `${result.toString()} USD`)
          .catch(error => alert(error));
      });
  }

  goSend() {
    this.navCtrl.push(SendPage);
  }

  goReceive() {
    this.navCtrl.push(ReceivePage);
  }

}
