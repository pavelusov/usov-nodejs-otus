export function merge(left: number[], right: number[]) {
  const { length: leftLength } = left;
  const { length: rightLength } = right;
  const results = [];
  let i = 0;
  let j = 0;

  while (i < leftLength && j < rightLength) {
    const rightValue = right[j];
    const leftValue = left[i];

    if (rightValue > leftValue) {
      results.push(leftValue);
      i++;
    } else {
      results.push(rightValue);
      j++;
    }
  }

  while (i < leftLength) {
    results.push(left[i]);
    i++;
  }

  while (j < rightLength) {
    results.push(right[j]);
    j++;
  }

  return results;
}

export function sortMerge(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = sortMerge(arr.slice(0, mid));
  const right = sortMerge(arr.slice(mid));
  return merge(left, right);
}
