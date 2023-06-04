import { ColorInfo } from './colors';


export type ColorNode =
    | "empty"
    | {readonly kind: "node", readonly info: ColorInfo,
       readonly before: ColorNode, readonly after: ColorNode};

export const empty = "empty";

// Note that node(c, A, B) has the following invariants:
//  - every color a in A has a.name < c.name
//  - every color b in B has c.name < b.name
export function node(info: ColorInfo, before: ColorNode, after: ColorNode): ColorNode {
  // Do some minimal checking of the invariant.
  // We can't do the entire subtree in O(1) time.
  if (before !== empty && info[0] <= before.info[0])
    throw new Error(`invariant violated: ${before.info[0]} <= ${info[0]}`);
  if (after !== empty && after.info[0] <= info[0])
    throw new Error(`invariant violated: ${info[0]} <= ${after.info[0]}`);

  return {kind: "node", info, before, after};
}