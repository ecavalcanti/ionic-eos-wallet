import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { EosProvider } from '../../providers/eos/eos';

/**
 * Generated class for the SendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {
  toAccount: string;
  value: string;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      private eos: EosProvider,
      private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendPage');
  }

  send() {
    this.eos.transfer(this.toAccount, Number.parseFloat(this.value))
      .then(result => {
        this.navCtrl.pop();
        const toast = this.toastCtrl.create({
          message: 'The operation was successfully',
          duration: 3000,
          position: 'top',
          cssClass: 'toast-success'
        });
        toast.present();
      })
      .catch(err => {
        console.log(err);
        const toast = this.toastCtrl.create({
          message: 'Transaction error.',
          duration: 3000,
          position: 'top',
          cssClass: 'toast-danger'
        });
        toast.present();
      })
  }

}
