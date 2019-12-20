import bitcoin from 'bitcoinjs-lib';
import bip68 from 'bip68';

// === OWNER SPENDING TRANSACTION GENERATION ==

export const ownerTx = (contract) => {
  try {
    const op = bitcoin.opcodes; // abreviation for op codes
    const network = bitcoin.networks[contract.networkChoice]; // network choice
    const hashType = bitcoin.Transaction.SIGHASH_ALL; // regular signature, signs all

    const ownerKeys = bitcoin.ECPair.fromWIF(contract.ownerPrivateKeyWIF, network);
    console.log('public key:', ownerKeys.publicKey.toString('hex'));
    const scriptHex = contract.scriptHex;

    // redeemScript is referenced as a hash in an unspent p2sh output (scriptPubKey)
    // and requires to provide it to run the script now
    // have to provide redeemScript (p2sh) or witnessScript (p2wsh) to spend
    const redeemScript = Buffer.from(scriptHex, 'hex');
    const witnessScript = redeemScript; // for now no difference

    // get current time
    const now = Math.floor(Date.now() / 1000);
    console.log('Current time data:', now);

    // start tx assemble
    const buildTx = new bitcoin.TransactionBuilder(network);
    // adding contract's chosen unspent input
    buildTx.addInput(contract.txid, contract.vout, 0xfffffffe);
    // adding desired destination output
    buildTx.addOutput(contract.toAddress, parseInt(contract.toAmount));
    // adding change output
    buildTx.addOutput(contract.changeAddress, parseInt(contract.changeAmount));
    // pre-build tx
    const tx = buildTx.buildIncomplete();

    // hash the tx so you can sign - p2wsh version (+ requires coin value of input signed)
    const hashForSigWitness = tx.hashForWitnessV0(0, witnessScript, contract.utxoValue, hashType);
    // and now for regular p2sh version
    const hashForSig = tx.hashForSignature(0, redeemScript, hashType);

    // create the signatures for above tx hashes - p2wsh version
    const ownerSigWitness = bitcoin.script.signature.encode(ownerKeys.sign(hashForSigWitness), hashType);
    // and p2sh version
    const ownerSig = bitcoin.script.signature.encode(ownerKeys.sign(hashForSig), hashType);

    // generate scriptSigs = input stack (like signatures) + the redeemScript
    // scriptSig provides data to the locked output's scriptPubKey
    // scriptSig ~ witness and redeemScript ~ witnessScript
    // witness = initial witness stack (variables) + witnessScript
    const witnessStackOwnerBranch = bitcoin.payments.p2wsh({
      redeem: {
        input: bitcoin.script.compile([
          ownerSigWitness, // submitting sig for comparison w/ pub key
          op.OP_TRUE // submit TRUE so it selects first branch of IF statement
        ]),
        output: witnessScript
      }
    }).witness;
    console.log('Owner branch stack: \n', witnessStackOwnerBranch.map(stack => stack.toString('hex')));
    console.log('owner sig: ', ownerSig);

    // adding the scriptWitness stack to the transaction
    tx.setWitness(0, witnessStackOwnerBranch);

    console.log('Broadcast this to transact (hex):', tx.toHex());
  } catch (e) {
    console.log('error: ', e);
  }

  // leaving off here:
  // (TODO)
  // - popular vuex with networkChoice from file
  // make sure other values are tehre as well like owner keys
  // add fees
  // add p2sh version
};

// === NEW CONTRACT GENERATION ===

// generate new key
export const newWIF = (network_choice) => {
  const network = bitcoin.networks[network_choice];
  return bitcoin.ECPair.makeRandom({ network }).toWIF();
};

// returns all the info necessary to fund inheritance contract
// address should be unique for the 5 provided parameters
export const inhertianceContract = (payload) => {
  const { days, ownerPrivateKeyWIF, heirPrivateKeyWIF, networkChoice, addressType } = payload;
  // shortcuts
  const network = bitcoin.networks[networkChoice];
  const op = bitcoin.opcodes;
  const encode = bitcoin.script.number.encode;

  // get key pair object from WIF private keys
  const ownerKeys = bitcoin.ECPair.fromWIF(ownerPrivateKeyWIF, network);
  const heirKeys = bitcoin.ECPair.fromWIF(heirPrivateKeyWIF, network);

  const relLockTime = bip68.encode({
    // must be multiple of 512 seconds (see BIP68)
    seconds: Math.floor(days * 24 * 60 * 60 / 512) * 512
  });

  // create contract logic
  // witness script and redeem script same declaration
  /* eslint-disable */
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
  /* eslint-enable */

  // calculate the p2wsh & p2sh address from this time version of script
  const p2wsh = bitcoin.payments.p2wsh({
    redeem: {
      output: script,
      network: network
    }
  });

  const p2sh = bitcoin.payments.p2sh({
    redeem: {
      output: script,
      network: network
    }
  });

  const backupP2WSH = {
    contract: 'inheritance timer',
    addressType: addressType,
    networkChoice: networkChoice,
    contractSummary: 'IF <ownerPublicKey> CHECKSIG ELSE <relativeLockTime> CHECKSEQUENCEVERIFY DROP <heirPublicKey> CHECKSIG ENDIF',
    ownerPrivateKeyWIF: ownerPrivateKeyWIF,
    heirPrivateKeyWIF: heirPrivateKeyWIF,
    witnessScriptHex: script.toString('hex'),
    witnessScriptHash: bitcoin.crypto.sha256(script).toString('hex'),
    relativeLockTime: relLockTime.toString(),
    currentDate: new Date().toString(),
    daysAfterConfirmForUnlock: days,
    address: p2wsh.address
  };

  const backupP2SH = {
    contract: 'inheritance timer',
    network: networkChoice,
    addressType: addressType,
    contractSummary: 'IF <ownerPublicKey> CHECKSIG ELSE <relativeLockTime> CHECKSEQUENCEVERIFY DROP <heirPublicKey> CHECKSIG ENDIF',
    ownerPrivateKeyWIF: ownerPrivateKeyWIF,
    heirPrivateKeyWIF: heirPrivateKeyWIF,
    redeemScriptHex: script.toString('hex'),
    redeemScriptHash: bitcoin.crypto.sha256(script).toString('hex'),
    relativeLockTime: relLockTime.toString(),
    currentDate: new Date().toString(),
    daysAfterConfirmForUnlock: days,
    address: p2sh.address
  };

  if (addressType === 'p2wsh') {
    return backupP2WSH;
  } else if (addressType === 'p2sh') {
    return backupP2SH;
  } else {
    return undefined;
  }
};

// === VALIDITY CHECKS ===

// check if private key is valid for a specific network
export const isWifValid = ({ wif, networkChoice }) => {
  try {
    const network = bitcoin.networks[networkChoice];
    bitcoin.ECPair.fromWIF(wif, network);
    return true;
  } catch (e) {
    return false;
  }
};

// returns which network the key/WIF is for or returns undefined
export const whatWIF = (wif) => {
  let network;
  try {
    bitcoin.ECPair.fromWIF(wif, bitcoin.networks.bitcoin);
    network = 'bitcoin';
  } catch (e) {}
  try {
    bitcoin.ECPair.fromWIF(wif, bitcoin.networks.testnet);
    network = 'testnet';
  } catch (e) {}
  return network;
};

// returns which network the key/WIF is for or returns undefined
export const whatAddress = (address) => {
  let network;
  try {
    bitcoin.address.toOutputScript(address, bitcoin.networks.bitcoin);
    network = 'bitcoin';
  } catch (e) {}
  try {
    bitcoin.address.toOutputScript(address, bitcoin.networks.testnet);
    network = 'testnet';
  } catch (e) {}
  return network;
};
