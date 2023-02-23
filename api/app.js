const Moralis = require('moralis').default;

// const express = require('express');
// const cors = require('cors');

// const { EvmChain } = require('@moralisweb3/common-evm-utils');

// const app = express()
const port = 4000

// // allow access to React app domain
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );

const MORALIS_API_KEY = 'BWiMGBdJ5qkxQVL3zfWwWAchVNi23T5vTuwL9UmzuchXV3cAY9jIg2Visve4Bc8L';
// const address = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';

// app.get('/balances', async (req, res) => {
//   console.log(res)
//   try {
//     // Promise.all() for receiving data async from two endpoints
//     const [nativeBalance, tokenBalances] = await Promise.all([
//       Moralis.EvmApi.balance.getNativeBalance({
//         chain: EvmChain.ETHEREUM,
//         address,
//       }),
//       Moralis.EvmApi.token.getWalletTokenBalances({
//         chain: EvmChain.ETHEREUM,
//         address,
//       }),
//     ]);
//     res.status(200).json({
//       // formatting the output
//       address,
//       nativeBalance: nativeBalance.result.balance.ether,
//       tokenBalances: tokenBalances.result.map((token) => token.display()),
//     });
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     res.status(500);
//     res.json({ error: error.message });
//   }
// });

// app.get("/smart-contract", async (req, res) => {
//   console.log("res")
//   try {
//     const [nativeBalance, tokenBalances] = await Promise.all([
//       Moralis.EvmApi.balance.getNativeBalance({
//         chain: EvmChain.ETHEREUM,
//         address: "0xd9145CCE52D386f254917e481eB44e9943F39138",
//       }),
//       Moralis.EvmApi.token.getWalletTokenBalances({
//         chain: EvmChain.ETHEREUM,
//         address: "0xd9145CCE52D386f254917e481eB44e9943F39138",
//       }),
//     ]);
//     res.status(200).json({
//       address,
//       nativeBalance: nativeBalance.result.balance.ether,
//       tokenBalances: tokenBalances.result.map((token) => token.display()),
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500);
//     res.json({ error: error.message });
//   }
// });

// const startServer = async () => {
//   await Moralis.start({
//     apiKey: MORALIS_API_KEY,
//   });

//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// };

// startServer();


// const express = require('express');
// const app = express();
// const cors = require('cors');
// // const routes = require('./routes');
// const Web3 = require('web3');
// const Web3Eth = require('web3-eth');
// const mongodb = require('mongodb').MongoClient;
// // const contract = require('@truffle/contract');
// // const artifacts = require('./build/contracts/Contacts.json');
// const CONTACT_ABI = require('./config');
// const CONTACT_ADDRESS = require('./config');

// app.use(cors());
// app.use(express.json());

// if (typeof web3 !== 'undefined') {
//         var web3 = new Web3(web3.currentProvider); 
// } else {
//         var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
// }

// mongodb.connect('mongodb://127.0.0.1:27017/blockchain-node-api',
//         {
//                 useUnifiedTopology: true,
//         }, async (err, client) => {
//         const db =client.db('Cluster0');
//         const accounts = await web3.eth.getAccounts();
//         const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);

//         app.get('/contacts', async (request, response) => {
//           console.log('here')
//           let cache = [];
//           const COUNTER = await contactList.methods.count().call();

//           for (let i = 1; i <= COUNTER; i++) {
//             const contact = await contactList.methods.contacts(i).call();
//             cache = [...cache, contact];
//           }

//           response.json(cache);
//         });
//         app.listen(process.env.PORT || 3001, () => {
//                 console.log('listening on port '+ (process.env.PORT || 3001));
//         });
// });

// const startServer = async () => {
//   await Moralis.start({
//     apiKey: MORALIS_API_KEY,
//   });

//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// };

// startServer();

/* Compile And Push To Eth Network */
const fs = require('fs');
const path = require('path');
const solc = require('solc');
const Web3 = require('Web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = '<YOUR SEED PHRASE HERE>'; /* YOUR SEED PHRASE ... */
const providerOrUrl = '<RINKEBY ENDPOINT HERE>' /* RINKEBY ENDPOINT */

const provider = new HDWalletProvider({ mnemonic, providerOrUrl });
const web3 = new Web3(provider);
const content = fs.readFileSync('.contracts/Migrations.sol', 'utf8'); /* PATH TO CONTRACT */

const input = {
  language: 'Solidity',
  sources: {
    'Migrations.sol': { content }
  },
  settings: {
    outputSelection: { '*': { '*': ['*'] } }
  }
};

async function deploy (){
  /* 1. Get Ethereum Account */
  const [account] = await web3.eth.getAccounts();

  /* 2. Compile Smart Contract */
  const {contracts} = JSON.parse(
    solc.compile(JSON.stringify(input))
  );
console.log('contracts', contracts)
  const contract = contracts['Migrations.sol'].MyContract;

  /* 2. Extract Abi And Bytecode From Contract */
  const abi = contract.abi;
  const bytecode = contract.evm.bytecode.object;

  /* 3. Send Smart Contract To Blockchain */
  const { _address } = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({from: account, gas: 1000000 });

  console.log("Contract Address =>", _address);
};

deploy();