require('dotenv').config();
const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Retrieve the base path from the environment variable
const basePath = process.env.BASE_CONTRACT_PATH;

// Resolve the complete path to the Solidity file
const inboxPath = path.resolve(basePath, 'contracts', 'Transcript.sol');


// Read the source code from the file
const source = fs.readFileSync(inboxPath, 'utf8');
//console.log(solc.compile(source,1));

const compiledContract = solc.compile(source, 1).contracts[':Transcript'];

module.exports = {
  interface: compiledContract.interface,
  bytecode: compiledContract.bytecode,
};