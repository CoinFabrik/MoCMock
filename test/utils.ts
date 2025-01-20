type NextTCArgs =
  | { nextTCInterestPayment: bigint; currentBlock: number }
  | { nextTCInterestPayment?: never; currentBlock?: never };

export function condPubStatus({
  qACLockedInPending,
  ema,
  bts,
  nextTCArgs,
}: {
  qACLockedInPending?: bigint;
  ema?: boolean;
  bts?: bigint;
  nextTCArgs?: NextTCArgs;
}): boolean {
  if (
    (qACLockedInPending != undefined && qACLockedInPending > BigInt(0)) ||
    ema === true ||
    (bts != undefined && bts === BigInt(0)) ||
    (nextTCArgs != undefined &&
      nextTCArgs.nextTCInterestPayment != undefined &&
      nextTCArgs.currentBlock > nextTCArgs.nextTCInterestPayment)
  ) {
    return true;
  }

  return false;
}
