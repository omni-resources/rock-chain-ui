import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Register } from 'tc2017-contract-artifacts';
import { BlockchainService } from './blockchain.service';
import { Registration } from '../../models/Registration';
import { AppComponent } from '../app.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise.js';

const contract = require('truffle-contract');

@Injectable()
export class RegisterService {
  Register = contract(Register);
  blockchainService: BlockchainService;
  accountRegistered: EventEmitter<any> = new EventEmitter();

  constructor(@Inject(BlockchainService) _blockchainService: BlockchainService) {
    this.blockchainService = _blockchainService;
    this.Register.setProvider(this.blockchainService.web3.currentProvider);

  }

  setupContractWatchers = () => {
    this.Register.deployed().then((instance) => {
      const registration = instance.Registration();

      registration.watch((error, result) => {
        if (!error) {
          this.accountRegistered.emit(result);
        }
      });
    });
  }

  getAccountRegisteredEmitter = () => {
    return this.accountRegistered;
  }

  registerAccount = (registration: Registration): void => {
    const wallet = this.blockchainService.web3.personal.newAccount(registration.password);

    this.Register.deployed().then((instance) => {
      instance.register.sendTransaction(
        wallet,
        registration.charity,
        {
            from: this.blockchainService.web3.eth.accounts[0],
            gas: 4712388
        }
      );
    });
  }

  getAccountsForCharity = (charity: number): Observable<any> => {
    return Observable.fromPromise(this.Register.deployed().then((instance) => {
      instance.getAccountsByCharity.call(0).then((result) => {
        return result;
      });
    }));
  }
}
