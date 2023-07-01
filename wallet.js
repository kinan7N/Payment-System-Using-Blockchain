const bip39 = require('bip39');
const crypto = require('crypto');
const elliptic = require('elliptic');
const EC = elliptic.ec;
const { Buffer } = require('buffer');
const axios = require('axios');
global.Buffer = Buffer;

class Wallet {
  constructor(username,userMnemonic) {
    this.username = username;
    this.ec = new EC('secp256k1');
    this.keyPair = null;
    this.publicKey = null;
    this.privateKey = null;
    this.mnemonic = null;
  }

  async initialize() {
    try {
      this.mnemonic = await this.generateMnemonic();
      console.log("Mnemonic seed on retrieveMasterSeed:", this.mnemonic);

      const masterSeed = await this.retrieveMasterSeed(this.mnemonic);
      await this.extractKeyPairs(masterSeed);
      this.storePublicKey();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async generateMnemonic() {
    const mnemonic = await bip39.generateMnemonic();
    return mnemonic;
  }

  async retrieveMasterSeed(mnemonic) {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const masterSeed = seed.slice(0, 32).toString('hex');
    console.log('User master seed from mnemonic in generateMasterSeedFromMnemonic is:', masterSeed);
    return masterSeed;
  }

  async extractKeyPairs(masterSeed) {
    const privateKey = crypto.createHash('sha256').update(masterSeed).digest('hex');
    this.keyPair = this.ec.keyFromPrivate(privateKey);
    this.publicKey = this.keyPair.getPublic('hex');
    this.privateKey = privateKey;
  }

  storePublicKey() {
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('publicKey', this.publicKey);

    axios.post('./app/php/store_public_key.php', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  async generateMasterSeedFromMnemonic(userMnemonic) {
    const seed = await bip39.mnemonicToSeed(userMnemonic);
    const userMasterSeed = seed.slice(0, 32).toString('hex');
    console.log('User master seed from mnemonic in generateMasterSeedFromMnemonic is:', userMasterSeed);
    console.log('User mnemonic on generateMasterSeedFromMnemonic is:', userMnemonic);
  
    const wallet = new Wallet('', userMnemonic); // Pass an empty string as username and userMnemonic
    await wallet.extractKeyPairs(userMasterSeed);
  
    console.log('Public Key:', wallet.publicKey);
    console.log('Private Key:', wallet.privateKey);
  
    return {
      masterSeed: userMasterSeed,
      publicKey: wallet.publicKey,
      privateKey: wallet.privateKey
    };
  }
  
}

const wallet = new Wallet();
window.Wallet = Wallet;
window.walletInstance = wallet;


/*
const bip39 = require('bip39');
const crypto = require('crypto');
const elliptic = require('elliptic');
const EC = elliptic.ec;
const { Buffer } = require('buffer');
const axios = require('axios');
global.Buffer = Buffer;

class Wallet {
  constructor(username) {
    this.username = username;
    this.ec = new EC('secp256k1');
    this.keyPair = null;
    this.publicKey = null;
    this.privateKey = null;
    this.mnemonic = null;
    this.generateMnemonic()
      .then((mnemonic) => {
        this.mnemonic = mnemonic;
        return this.retrieveMasterSeed(this.mnemonic);
      })
      .then((masterSeed) => {
        return this.extractKeyPairs(masterSeed);
      })
      .then(() => {
        this.storePublicKey();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  async generateMnemonic() {
    const mnemonic = await bip39.generateMnemonic();
    return mnemonic;
  }

  async retrieveMasterSeed(mnemonic) {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const masterSeed = seed.slice(0, 32).toString('hex');
   // console.log('Master seed on retrieveMasterSeed:', masterSeed);
    console.log('Mnemonic seed on retrieveMasterSeed:', mnemonic);
    return masterSeed;
  }

  async extractKeyPairs(masterSeed) {
    const privateKey = crypto.createHash('sha256').update(masterSeed).digest('hex');
    this.keyPair = this.ec.keyFromPrivate(privateKey);
    this.publicKey = this.keyPair.getPublic('hex');
    this.privateKey = privateKey;

   // console.log('Public Key:', this.publicKey);
   // console.log('Private Key:', this.privateKey);
  }

  storePublicKey() {
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('publicKey', this.publicKey);

    axios.post('./app/php/store_public_key.php', formData)
      .then(response => {
        console.log(response.data);
       // console.log('Stored Public Key:', this.publicKey);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

const wallet = new Wallet();
window.Wallet = Wallet;
window.walletInstance = wallet;
*/


/*
const bip39 = require('bip39');
const crypto = require('crypto');
const elliptic = require('elliptic');
const EC = elliptic.ec;
const { Buffer } = require('buffer');
const axios = require('axios');
global.Buffer = Buffer;

class Wallet {
  constructor(username, userMnemonic) {
    this.username = username;
    this.ec = new EC('secp256k1');
    this.keyPair = null;
    this.publicKey = null;
    this.privateKey = null;
    this.mnemonic = null;
    this.generateKeyPair();
    this.storePublicKey();
    this.generateMnemonic().then((mnemonic) => {
      this.mnemonic = mnemonic;
      this.getMaster(this.mnemonic).then((masterSeed) => {
        //console.log('Master Seed in class:', masterSeed);
      });
    });
    
    this.generateMasterSeedFromMnemonic(userMnemonic);
  }

  async generateMnemonic() {
    const mnemonic = await bip39.generateMnemonic();
    console.log('mnemonic seed on generateMnemonic is:', mnemonic);
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const masterSeed = seed.slice(0, 32).toString('hex');
    console.log('master seed on generateMnemonic is:', masterSeed);
    //return masterSeed;
    return mnemonic;
  }

  generateAddress() {
    const publicKey = this.keyPair.getPublic('hex');
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    const address = hash.slice(0, 10);
    return address;
  }

  generateKeyPair() {
    const privateKey = crypto.randomBytes(32).toString('hex');
    this.keyPair = this.ec.genKeyPair();
    this.publicKey = this.keyPair.getPublic('hex');
    this.privateKey = this.keyPair.getPrivate('hex');
  }

  signTransaction(transaction) {
    const transactionHash = transaction.calculateHash();
    const signature = this.keyPair.sign(transactionHash);
    transaction.signature = signature.toDER('hex');
  }

  storePublicKey() {
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('publicKey', this.publicKey);

    axios.post('./app/php/store_public_key.php', formData)
      .then(response => {
        console.log(response.data);
        console.log('Stored Public Key:', this.publicKey);
      })
      .catch(error => {
        console.error(error);
      });
  }

  async getMaster(mnemonic) {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const masterSeed = seed.slice(0, 32).toString('hex');
    console.log('master seed on getMaster is:', masterSeed);
    console.log('mnemonic seed on getMaster is:', mnemonic);
    return masterSeed;
  }

  async generateMasterSeedFromMnemonic(userMnemonic) {
    const seed = await bip39.mnemonicToSeed(userMnemonic);
    const userMasterSeed = seed.slice(0, 32).toString('hex');
    console.log('User master seed from mnemonic in generateMasterSeedFromMnemonic is:', userMasterSeed);
    console.log('user mnemonic on generateMasterSeedFromMnemonic is:', userMnemonic);
    return userMasterSeed;
    
  }
}

const wallet = new Wallet();
window.Wallet = Wallet;
window.walletInstance = wallet;
*/