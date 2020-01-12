# Bitcoin Smart Contracts in Browser

Client side Vue based front end showing the power of Bitcoin smart contracts as various decentralized applications (dApps)

[Current github pages demo.](https://ildarmgt.github.io/bitcoin-web-contracts/)

The latest compiled release used can be found in `./docs/` folder

Compiled .html build can be used offline & on air-gapped computers

## To run precompiled client
```
./docs/index.html # open in browser
```

## To build project from scratch

This compiles the project in the docs folder so it's easily published on github pages

```
git clone https://github.com/ildarmgt/bitcoin-web-contracts.git btcdapps
cd btcdapps
npm install
npm run build
./docs/index.html # open in browser
```

## To run project on localhost

```
npm run serve
```
This makes it accessible locally at http://localhost:8080

## Testnet bitcoin faucets (free testnet coins)

https://bitcoinfaucet.uo1.net/send.php (segwit compatible)

In testnet mode selected, link for faucet will be available inside the app

## Method used for Inheritance Contract

Contract used is the following:

 `./src/bitcoin/index.js`
```
const script = bitcoin.script.compile([

  op.OP_IF, // spender submits TRUE (owner branch)

    // check submitted signature vs this public key
    // if a match, puts TRUE on top of stack, otherwise FALSE
    ownerKeys.publicKey, op.OP_CHECKSIG,

  op.OP_ELSE, // spender submits FALSE (heir branch)

    // abort if still locked, returns locktime
    encode(relLockTime), op.OP_CHECKSEQUENCEVERIFY,

    // clear locktime from stack
    op.OP_DROP,

    // check submitted signature vs this public key
    // if a match, puts TRUE on top of stack, otherwise FALSE
    heirKeys.publicKey, op.OP_CHECKSIG,

  op.OP_ENDIF

  // if TRUE on top of stack, tx is valid, otherwise fails
]);
```

This allows owner to relock funds in same address and the heir can claim if enough time passes from that known address. This requires action on behalf of owner to refresh to remain trust minimized.

Alternative methods:

1. LN-type punishment script where owner signs and gives heir a transaction to withdraw funds whenever. The output has an unlock script on it with a delay before it becomes spendable by the heir but before which it's only spendable by the owner. So if the owner is still around, they can monitor their address and confiscate the funds back before the heir has full access.

    The main downside of this apporach is the transaction would have to be updated and resent to heir every time the owner wants to spend the outputs as he would have to sign a different output. The heir would have to possibly go through tedious process of backing up the updated information each time. The second downside would be the heir can waste owner's fees on confiscations by doing it frequently.

2. The transaction can be done without custom scripts by including a [locktime](https://bitcoin.org/en/transactions-guide#locktime-and-sequence-number) as blockheight or unix time at which point it becomes spendable. The owner can render the heir transaction useless by spending the output before that time. Downside is once again having to resign updated transactions, sharing them with the heir, and heir having to back up the information frequently.

The approach used requires the least amount of work for both parties while having it accessible to spend by owner.

## Donations

BTC: 1HYhi1D8VCv4dRZhbAy1ghKGRv3UU34pb6