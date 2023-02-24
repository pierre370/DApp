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

// const MORALIS_API_KEY = 'BWiMGBdJ5qkxQVL3zfWwWAchVNi23T5vTuwL9UmzuchXV3cAY9jIg2Visve4Bc8L';
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


const express = require('express');
const app = express();
const cors = require('cors');
// const routes = require('./routes');
const Web3 = require('web3');
const Web3Eth = require('web3-eth');
const mongodb = require('mongodb').MongoClient;
// const contract = require('@truffle/contract');
// const artifacts = require('./build/contracts/Contacts.json');

const CONTACT_ADDRESS = '0xc835ecA69e513E55605548a8C975fF7bd38ff76B';

const CONTACT_ABI = [
        {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "contacts",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "phone",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "count",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phone",
        "type": "string"
      }
    ],
    "name": "createContact",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

app.use(cors());
app.use(express.json());

if (typeof web3 !== 'undefined') {
        var web3 = new Web3(web3.currentProvider); 
} else {
        var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:3000'));
}
console.log('jkrfdlf')

mongodb.connect('mongodb://localhost:27017/blockchain-node-api',
        {
          useUnifiedTopology: true,
        }, async (err, client) => {
          console.log('dhfgdu')
        // const db =client.db('Cluster0');
        // const accounts = await web3.eth.getAccounts();
        
}).then(() => console.log('✅ Successfully connected to the database'))
.catch((e) => console.log(`⛔️ Error during database connection ${e}`));

// console.log('12', CONTACT_ABI)
const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
// console.log(contactList.methods.count().call())
        app.get('/contacts', async (request, response) => {
          // console.log('here', await contactList.methods.count().call())
          let cache = [];
          // const counter = await contactList.methods.count().call()
          // console.log('198', await counter)
          for (let i = 1; i <= 3; i++) {
            const contact = await contactList.methods.contacts(i).call();
            cache = [...cache, contact];
          }
          // console.log('hreur')
          response.json(cache);
        });
        app.listen(process.env.PORT || 3001, () => {
                console.log('listening on port '+ (process.env.PORT || 3001));
        });
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
// const fs = require('fs');
// const path = require('path');
// const solc = require('solc');
// const Web3 = require('Web3');
// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const mnemonic = 'liberty fragile enter lounge floor secret agree innocent swear letter weird team'; /* YOUR SEED PHRASE ... */
// const providerOrUrl = '<RINKEBY ENDPOINT HERE>' /* RINKEBY ENDPOINT */

// const provider = new HDWalletProvider({ mnemonic, providerOrUrl });
// const web3 = new Web3(provider);
// const content = fs.readFileSync('.contracts/Migrations.sol', 'utf8'); /* PATH TO CONTRACT */

// const input = {
//   language: 'Solidity',
//   sources: {
//     'Migrations.sol': { content }
//   },
//   settings: {
//     outputSelection: { '*': { '*': ['*'] } }
//   }
// };

// async function deploy (){
//   /* 1. Get Ethereum Account */
//   const [account] = await web3.eth.getAccounts();

//   /* 2. Compile Smart Contract */
//   const {contracts} = JSON.parse(
//     solc.compile(JSON.stringify(input))
//   );
// console.log('contracts', contracts)
//   const contract = contracts['Migrations.sol'].MyContract;

//   /* 2. Extract Abi And Bytecode From Contract */
//   const abi = contract.abi;
//   const bytecode = contract.evm.bytecode.object;

//   /* 3. Send Smart Contract To Blockchain */
//   const { _address } = await new web3.eth.Contract(abi)
//     .deploy({ data: bytecode })
//     .send({from: account, gas: 1000000 });

//   console.log("Contract Address =>", _address);
// };

// deploy();