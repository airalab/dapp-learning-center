import { Promise } from 'es6-promise'
import _ from 'lodash'

export default class Blockchain {
  subscribes = []
  web3 = false

  constructor(web3) {
    this.web3 = web3
    if (this.web3) {
      this.observeLatestBlocks()
    }
  }

  observeLatestBlocks() {
    const self = this
    this.web3.eth.filter('latest').watch((e, hash) => {
      if (!e) {
        const blockInfo = self.web3.eth.getBlock(hash);
        _.forEach(self.subscribes, (item) => {
          if (_.isFunction(item)) {
            item(blockInfo)
          } else if (_.findIndex(blockInfo.transactions, i => i === item.tx) >= 0) {
            const transaction = self.web3.eth.getTransaction(item.tx)
            if (transaction) {
              item.cb(transaction)
              self.removeSubscribeTx(item.tx)
            }
          }
        })
      }
    });
  }
  observeBlock() {
    const self = this
    return new Promise((resolve) => {
      self.setSubscribe(() => {
        resolve()
      });
    });
  }
  setSubscribe(cb) {
    this.subscribes.push(cb)
  }
  subscribeTx(tx) {
    const self = this
    return new Promise((resolve) => {
      // console.log(self);
      // setTimeout(()=>{
      //   resolve(tx)
      // }, 8000)
      self.setSubscribe({
        tx,
        cb: (txId) => {
          resolve(txId)
        }
      });
    });
  }
  removeSubscribeTx(tx) {
    _.remove(this.subscribes, f => !_.isFunction(f) && f.tx === tx);
  }
}

// const blockchain = new Blockchain(getWeb3())

// blockchain.subscribeTx('0x111111').
//   then((tx)=>{
//     console.log('tx', tx);
//   }).
//   catch(function(e) {
//     console.log(e);
//   });
//
// blockchain.setSubscribe(()=>{
//   console.log('update 1');
// })
//
// blockchain.setSubscribe(()=>{
//   console.log('update 2');
// })
