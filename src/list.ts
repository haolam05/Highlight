export type List<A> =
    | "nil"
    | {readonly kind: "cons", readonly hd: A, readonly tl: List<A>};

export const nil = "nil";

export function cons<A>(hd: A, tl: List<A>): List<A> {
  if (hd < 0 || 65536 <= hd)
    throw new Error(`invalid char code "${hd}"`)
  return {kind: "cons", hd: hd, tl: tl};
}


/**
 * Returns the length of the list.
 * @param L list whose length should be returned
 * @returns 0 if L = nil else 1 + len(tail(L))
 */
export function len<A>(L: List<A>): number {
  if (L === nil) {
    return 0;
  } else {
    return 1 + len(L.tl);
  }
}

/**
 * Returns the pair of lists you get by splitting L into its first n elements
 * and the rest of the list after that.
 * @param n number of elements before th split
 * @param L list to split
 * @requires n <= len(L) 
 * @returns (P, S) such that L = concat(P, S), len(P) = n, and len(S) = len(L)-n
 */
export function split<A>(n: number, L: List<A>): readonly [List<A>, List<A>] {
  if (n === 0) {
    return [nil, L];
  } else if (L === nil) {
    throw new Error(`list does not contain ${n} elements`);
  } else {
    const [P, S] = split(n - 1, L.tl);
    return [cons(L.hd, P), S];
  }
}

/**
 * Returns the pair of lists you get by splitting L at the spot where the first
 * c appears. That value is returned as the first element in the right list.
 * @param c value to split
 * @param L list to split
 * @returns (P, S) such that L = concat(P, S), c is not in L, and
 *     either S = nil or head(S) = c
 */
export function split_at<A>(L: List<A>, c: A): [List<A>, List<A>] {
  if (L === nil) {
    return [nil, nil];
  } else if (L.hd === c) {
    return [nil, L];
  } else {
    const [P, S] = split_at(L.tl, c);
    return [cons(L.hd, P), S];
  }
}

/**
 * Returns the elements of a list, packed into an array.
 * @param L the list to turn into an array
 * @returns array containing the same elements as in L in the same order
 */
export function compact_list<A>(L: List<A>): Array<A> {
  const arr: A[] = [];
  while (L !== nil) {
      arr.push(L.hd);
      L = L.tl;
  }
  return arr;
}

/**
 * Returns the elements in the given array as a list.
 * @param arr the array to turn into a list
 * @returns list containing the same elements as in arr in the same order
 */
export function explode_array<A>(arr: ReadonlyArray<A>): List<A> {
  let L: List<A> = nil;
  for (let i = arr.length - 1; i >= 0; i--) {
      L = cons(arr[i], L);
  }
  return L;
}
