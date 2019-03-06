import bitcoin from 'bitcoinjs-lib';
import bip68 from 'bip68';

// generate new key
// network_choice = { 'bitcoin' | 'testnet' }
export const newWIF = (network_choice) => {
  const network = bitcoin.networks[network_choice];
  return bitcoin.ECPair.makeRandom({ network }).toWIF();
};

// check if private key is valid
export const isWifValid = ({ wif, networkChoice }) => {
  try {
    const network = bitcoin.networks[networkChoice];
    void bitcoin.ECPair.fromWIF(wif, network);
    return true;
  } catch (e) {
    return false;
  }
};

// returns all the info necessary to fund inheritance contract
// address should be unique for the 4 provided parameters
// pay to witness script hash (p2wsh) version
export const inhertianceContract = (payload) => {
  const { days, ownerWIF, heirWIF, networkChoice, addressType } = payload;
  // shortcuts
  const network = bitcoin.networks[networkChoice];
  const op = bitcoin.opcodes;
  const encode = bitcoin.script.number.encode;

  // get key pair object from WIF private keys
  const ownerKey = bitcoin.ECPair.fromWIF(ownerWIF, network);
  const heirKey = bitcoin.ECPair.fromWIF(heirWIF, network);

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
      ownerKey.publicKey, op.OP_CHECKSIG,

    op.OP_ELSE, // spender submits FALSE (heir branch)

      // abort if still locked, returns locktime
      encode(relLockTime), op.OP_CHECKSEQUENCEVERIFY,
      // clear locktime from stack
      op.OP_DROP,
      // check submitted signature vs this public key
      // if a match, puts TRUE on top of stack, otherwise FALSE
      heirKey.publicKey, op.OP_CHECKSIG,

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
    contractSummary: 'IF <ownerPublicKey> CHECKSIG ELSE <relativeLockTime> CHECKSEQUENCEVERIFY DROP <heirPublicKey> CHECKSIG ENDIF',
    ownerPrivateKeyWIF: ownerWIF,
    heirPrivateKeyWIF: heirWIF,
    witnessScriptHex: script.toString('hex'),
    witnessScriptHash: bitcoin.crypto.sha256(script).toString('hex'),
    relativeLockTime: relLockTime.toString(),
    currentDate: new Date().toString(),
    daysAfterConfirmForUnlock: days,
    contractAddress: p2wsh.address
  };

  const backupP2SH = {
    contract: 'inheritance timer',
    network: networkChoice,
    addressType: addressType,
    contractSummary: 'IF <ownerPublicKey> CHECKSIG ELSE <relativeLockTime> CHECKSEQUENCEVERIFY DROP <heirPublicKey> CHECKSIG ENDIF',
    ownerPrivateKeyWIF: ownerWIF,
    heirPrivateKeyWIF: heirWIF,
    redeemScriptHex: script.toString('hex'),
    redeemScriptHash: bitcoin.crypto.sha256(script).toString('hex'),
    relativeLockTime: relLockTime.toString(),
    currentDate: new Date().toString(),
    daysAfterConfirmForUnlock: days,
    contractAddress: p2sh.address
  };

  if (addressType === 'p2wsh') {
    return backupP2WSH;
  } else if (addressType === 'p2sh') {
    return backupP2SH;
  } else {
    return undefined;
  }
};
