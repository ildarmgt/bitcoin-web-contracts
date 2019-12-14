# Bitcoin Smart Contracts in Browser

Client side Vue based front end showing the power of Bitcoin smart contracts as various decentralized applications (dApps)

[Current github pages demo.](https://ildarmgt.github.io/bitcoin-web-contracts/)

The latest compiled release used can be found in `./docs/` folder

Compiled .html build can be used offline & on air-gapped computers

### To run precompiled client
```
./docs/index.html # open in browser
```

### To build project from scratch

This compiles the project in the docs folder so it's easily published on github pages

```
git clone https://github.com/ildarmgt/bitcoin-web-contracts.git btcdapps
cd btcdapps
npm install
npm run build
./docs/index.html # open in browser
```

### To run project on localhost

This makes it accessible locally at http://localhost:8080

`npm run serve`

### Testnet bitcoin faucets

https://bitcoinfaucet.uo1.net/send.php