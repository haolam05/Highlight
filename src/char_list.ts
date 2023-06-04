import { List, nil, cons } from './list';


/** Returns the elements of a list, packed into a string. */
export function compact(L: List<number>): string {
    const A: string[] = [];
    while (L !== nil) {
        A.push(String.fromCharCode(L.hd));
        L = L.tl;
    }
    return A.join("");
}

/** Returns the elements in the given array as a char list. */
export function explode(s: string): List<number> {
    let L: List<number> = nil;
    for (let i = s.length - 1; i >= 0; i--) {
        L = cons(s.charCodeAt(i), L);
    }
    return L;
}