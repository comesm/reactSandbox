const SHA256 = require('crypto-js/sha256');


class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();

    }

    calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; 
    }

    createGenesisBlock() {
        return new Block(0, new Date(), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    print() {
        this.chain.forEach(block => console.log(block));
    }

    isChainValid() {
        for( let i = 1; i < this.chain.length; i++) {
            let current = this.chain[i];
            let previous = this.chain[i- 1];
            if(current.hash !== current.calculateHash()) {
                return false;
            }
            if(current.previousHash !== previous.hash) {
                return false;
            }
        }
        return true;
    }

}

let coinChain = new BlockChain();

coinChain.addBlock(new Block(0, new Date(), {amount: 4}));
coinChain.addBlock(new Block(1, new Date(), {amount: 6}));

coinChain.print();

coinChain.chain[0].data = {amount: 100};


console.log(coinChain.isChainValid())


