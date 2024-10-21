
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
 
module.exports.deploy = async (request) => {
  try {

    const web3 = new Web3(new HDWalletProvider(
      process.env.MNEMONIC,
      process.env.INFURA_URL
    ));
 
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
 
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log('Gas balance of deploying account:', balance);
 
    const estimatedGas = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: request })
      .estimateGas();
 
    console.log('Estimated Gas:', estimatedGas);
    const gasLimit = estimatedGas + 10000;
 
    // Set a reasonable gas price (in wei)
    const gasPrice = await web3.eth.getGasPrice();
    console.log('Current Gas Price:', gasPrice);
 
    // Calculate the total cost
    const totalCost = estimatedGas * gasPrice;
    console.log('Total Cost (wei):', totalCost);
 
    // // Check if balance is sufficient
    // if (parseInt(balance) < totalCost) {
    //   throw new Error(`Insufficient funds: balance ${balance}, required ${totalCost}`);
    // }
 
    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: request })
      .send({ gas: gasLimit, from: accounts[0] });
 
    console.log('Contract deployed to', result.options.address);
 
    return result.options.address;
  } catch (error) {
    console.error('Error deploying contract:', error);
    return "Failed";
  }
};
 