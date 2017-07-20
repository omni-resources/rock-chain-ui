import { Injectable, Inject, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { AudioSong } from '../../models/PlayerStatus';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise.js';

const Web3 = require('web3');

@Injectable()
export class BlockchainService {
  web3: any;
  nowPlaying: AudioSong;
  songChanged: EventEmitter<any> = new EventEmitter();
  blockMined: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(environment.rpcEndpoint));
    this.setupBlockchainFilters();
  }

  setupBlockchainFilters = () => {
    // Log the transaction hash of any new pending transaction on the blockchain
    this.web3.eth.filter('pending').watch((error, result) => {
      if (!error) {
        const tx = this.web3.eth.getTransaction(result);
        /*if (tx.to === this.wagerService.instance.address && tx.from === this.web3.eth.accounts[0]) {
          const jsonAscii = this.web3.toAscii(tx.input.match(new RegExp('7b22.+227d'))[0]);
          const songData = JSON.parse(jsonAscii);
          this.nowPlaying = songData;
        }*/
        this.songChanged.emit(tx);
      }
    });

    // Log the object representing the most recently mined block on the blockchain
    this.web3.eth.filter('latest').watch((error, result) => {
      if (!error) {
        const block = this.web3.eth.getBlock(result);
        this.blockMined.emit(block);
      }
    });
  }

  getSongChangedEmitter = () => {
    return this.songChanged;
  }

  getBlockMinedEmitter = () => {
    return this.blockMined;
  }

  getAccountBalance = (walletId: string): Observable<string> => {
    return Observable.fromPromise(
      this.web3.fromWei(
        this.web3.eth.getBalance(walletId).toNumber(), 'ether'));
  }
}
