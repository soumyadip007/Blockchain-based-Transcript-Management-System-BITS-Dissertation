require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const deploy = async () => {
  const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    process.env.INFURA_URL
  );
  const web3 = new Web3(provider);

  const accounts = await web3.eth.getAccounts();

  for (let account of accounts) {
    const balance = await web3.eth.getBalance(account);
    console.log(`Gas balance of account ${account}: ${web3.utils.fromWei(balance, 'ether')} ETH`);
  }
};

deploy();

