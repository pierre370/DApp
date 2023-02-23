const Moralis = require('moralis').default;

const express = require('express');
const cors = require('cors');

const { EvmChain } = require('@moralisweb3/common-evm-utils');

const app = express()
const port = 4000

// allow access to React app domain
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

const MORALIS_API_KEY = 'BWiMGBdJ5qkxQVL3zfWwWAchVNi23T5vTuwL9UmzuchXV3cAY9jIg2Visve4Bc8L';
const address = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';

app.get('/balances', async (req, res) => {
  console.log(res)
  try {
    // Promise.all() for receiving data async from two endpoints
    const [nativeBalance, tokenBalances] = await Promise.all([
      Moralis.EvmApi.balance.getNativeBalance({
        chain: EvmChain.ETHEREUM,
        address,
      }),
      Moralis.EvmApi.token.getWalletTokenBalances({
        chain: EvmChain.ETHEREUM,
        address,
      }),
    ]);
    res.status(200).json({
      // formatting the output
      address,
      nativeBalance: nativeBalance.result.balance.ether,
      tokenBalances: tokenBalances.result.map((token) => token.display()),
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

app.get("/smart-contract", async (req, res) => {
  console.log("res")
  try {
    const [nativeBalance, tokenBalances] = await Promise.all([
      Moralis.EvmApi.balance.getNativeBalance({
        chain: EvmChain.ETHEREUM,
        address: "0xd9145CCE52D386f254917e481eB44e9943F39138",
      }),
      Moralis.EvmApi.token.getWalletTokenBalances({
        chain: EvmChain.ETHEREUM,
        address: "0xd9145CCE52D386f254917e481eB44e9943F39138",
      }),
    ]);
    res.status(200).json({
      address,
      nativeBalance: nativeBalance.result.balance.ether,
      tokenBalances: tokenBalances.result.map((token) => token.display()),
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

const startServer = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startServer();