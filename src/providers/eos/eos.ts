import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Eos from 'eosjs';

/*
  Generated class for the EosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EosProvider {
  private eos: any;
  public account: string;
  private key: string;
  private apiUrl: string = "https://api.coinmarketcap.com/v2/ticker/1765/";

  constructor(public http: HttpClient) {
    this.eos = Eos({
      chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
      httpEndpoint: 'https://api-kylin.eoslaomao.com'
    })
  }

  getAccountBalance() {
    return this.eos.getCurrencyBalance('eosio.token', this.account)
  }

  getEosToUSD(value: number) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(result => {
        const usdValue = (result["data"].quotes.USD.price * value).toFixed(2);
        resolve(usdValue);
      }, err => {
        console.log(err);
      });
    });
  }

  setCredentials(account: string, key: string) {
    this.account = account;
    this.key = key;
  }

  transfer(to: string, value: number) {
    const options = {
      keyProvider : this.key
    }
    return this.eos.transfer(this.account, to, `${value.toFixed(4)} EOS`, '', options);
  }

}
