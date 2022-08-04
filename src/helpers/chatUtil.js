export function isFeedAtTop(scrollTop) {
  return 0 === scrollTop;
}

export function isAtBottom(ele) {
  return ele?.clientHeight + ele?.scrollTop >= ele?.scrollHeight;
}
