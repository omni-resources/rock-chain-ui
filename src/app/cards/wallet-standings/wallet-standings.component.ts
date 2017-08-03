import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { Balance } from '../../../models/Balance';
import { Observable } from 'rxjs/Observable';
import { MdProgressSpinnerModule } from '@angular/material';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-wallet-standings',
  templateUrl: './wallet-standings.component.html',
  styleUrls: ['./wallet-standings.component.css']
})
export class WalletStandingsComponent implements OnInit {
  blockchainService: BlockchainService;
  balances: Array<Balance>;
  topBalance: number;

  constructor(private _blockchainService: BlockchainService) {
    this.blockchainService = _blockchainService;
    this.balances = new Array<Balance>();
  }

  ngOnInit() {
    const top20 = this.blockchainService.getAccounts()
      .flatMap(account => account)
      .filter(account => account !== this.blockchainService.genesisAccount)
      .mergeMap((account) =>
        this.blockchainService.getAccountBalance(account)
          .map(balance => {
            return {
              account: account,
              balance: balance,
              winProb: ''
            };
          })
      )
      .filter(wallet => wallet.balance > 0)
      .toArray()
      .map(wallets =>
        wallets
          .sort((a, b) => b.balance - a.balance)
          .splice(0, 20));



      top20.subscribe((wallets) => {
        top20.flatMap(x => x).map(x => x.balance).reduce((a, b) => a + b).subscribe(total => {
          wallets.forEach(wallet => {
            wallet.winProb = ((wallet.balance / total) * 100).toPrecision(4);
          });
          this.balances = wallets;
          this.topBalance = this.balances[0].balance;
        });
      });
  }

  getBalancePercentage = (balance: number) => {
    return Math.floor((balance / this.topBalance) * 100);
  }

  isMyWallet = (wallet: string): boolean => {
    return wallet === localStorage.getItem('walletId');
  }
}
