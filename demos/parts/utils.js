export function min(arr) {
  return arr
    .filter((v) => v != null)
    .reduce((min, v) => (v < min ? v : min), Infinity);
}

export function max(arr) {
  return arr
    .filter((v) => v != null)
    .reduce((max, v) => (v > max ? v : max), -Infinity);
}

export function unique(arr) {
  return arr
    .filter((v) => v != null)
    .reduce(
      (uniq, v) => (uniq.indexOf(v) < 0 ? (uniq.push(v), uniq) : uniq),
      []
    );
}

export function normalize(min, max, v) {
  return (v - min) / (max - min);
}
