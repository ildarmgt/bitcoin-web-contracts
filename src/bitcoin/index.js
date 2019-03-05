import bitcoin from 'bitcoinjs-lib';
import bip68 from 'bip68';

// generate new key
// network_choice = { 'bitcoin' | 'testnet' }
export const newWIF = (network_choice) => {
  const network = bitcoin.networks[network_choice];
  return bitcoin.ECPair.makeRandom({ network }).toWIF();
};

// returns all the info necessary to fund inheritance contract
// address should be unique for the 4 provided parameters
export const inhertianceContract = ({ days, ownerWIF, heirWIF, networkChoice }) => {
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
  /* eslint-disable */
  const witnessScript = bitcoin.script.compile([

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

  // calculate the p2wsh address from this time version of script
  const p2wsh = bitcoin.payments.p2wsh({
    redeem: {
      output: witnessScript,
      network: network
    }
  });

  const backup = {
    contract: 'inheritance timer',
    contractSummary: 'IF <ownerPublicKey> CHECKSIG ELSE <relativeLockTime> CHECKSEQUENCEVERIFY DROP <heirPublicKey> CHECKSIG ENDIF',
    ownerPrivateKeyWIF: ownerWIF,
    heirPrivateKeyWIF: heirWIF,
    witnessScriptHex: witnessScript.toString('hex'),
    witnessScriptHash: bitcoin.crypto.sha256(witnessScript).toString('hex'),
    relativeLockTime: relLockTime.toString(),
    currentDate: new Date().toString(),
    daysAfterConfirmForUnlock: days,
    contractAddress: p2wsh.address
  };

  return backup;
};
