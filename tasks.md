# High priority

- bad utxo info detection

- versioning in backup (version 1 implied if none)

- add note people can use keys generated elsewhere

- address reuse avoidance

  How to make it work theory:

  Backup file will have a large random starting number.

  Every time contract is used we add 1 to it.

  Hash of it goes into p2wsh/p2sh script and immidiately dropped.

  This would make each next address hard to predict

  When searching for utxo we keep checking for tx history as we add 1 to known random number until we find unused address to find the next number to use.

- Find a safe wallet integration to use as well? are there standard URI for bitcoin p2sh/p2wsh use?

  maybe:
  https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki


# Low priority

- multiple fee suggestions instead of just API's 2-block estimate?

- api visual failure reactions (page 3 for fee and page 4 for push not vital)

# Not sure

- dollar values for owner spending. must be optional, default off.

# Known Issues

# Suggestions

