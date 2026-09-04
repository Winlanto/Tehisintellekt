function countToZero(n) {
  if (n === 0) {
    return;
  }
  console.log(n);
  countToZero(n - 1);
  console.log(n);
}
countToZero(5);
 