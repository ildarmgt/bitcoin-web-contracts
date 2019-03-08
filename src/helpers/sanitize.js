export default function sanitize (inString, type) {
  let filter;
  if (type === 'base58') {
    // https://en.wikipedia.org/wiki/Base58#cite_note-3
    filter = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  } else if (type === 'hex') {
    filter = '0123456789abcdef';
  } else if (type === 'basic') {
    filter = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  } else {
    console.log('sanitize: valid type not provided');
    return undefined;
  }

  const res = inString
    .split('')
    .filter(letter => filter.indexOf(letter) > -1)
    .join('');

  return res;
}
