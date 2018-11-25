import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EosProvider } from '../../providers/eos/eos';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  account: string = "coinconat123";
  key: string = "5JAKHmi89rsFe2JbD3jV7G75sR4J7S7fHCPiqk3ru3kQvaUWt3k";

  constructor(public navCtrl: NavController, public navParams: NavParams, private eos: EosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  goHome() {
    this.eos.setCredentials(this.account, this.key);
    this.navCtrl.setRoot(HomePage);
  }

}
