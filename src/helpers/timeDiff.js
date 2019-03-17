export default function timeDiff (inTimeStamp) {
  let diff = Date.now() - new Date(inTimeStamp);
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= d * (1000 * 60 * 60 * 24); // remove days
  const h = Math.floor(diff / (1000 * 60 * 60)) % 24;
  diff -= h * (1000 * 60 * 60); // remove hours
  const m = Math.floor(diff / (1000 * 60)) % 60;
  return {
    dhm: `${d} days ${h} hours ${m} min ago`,
    dh: `${d} days ${h} hours ago`
  };
}
