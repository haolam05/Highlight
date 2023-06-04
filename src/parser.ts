import { compact, explode } from './char_list';
import { List, nil, cons, explode_array, split_at } from './list';


/** Text and the name of the highlight (background) color to show it in. */
export type Highlight = {
  color: string,
  text: string
}


// Turns a list of lines into a list of Highlights. Each line should start with
// a color name, followed by a space, followed by the text with that color.
function getHighlights(lines: List<string>): List<Highlight> {
  if (lines === nil) {
    return nil;
  } else {
    const index = lines.hd.indexOf(' ');
    if (index < 0) {
      throw new Error(`line does not start with a color: "${lines.hd}"`);
    }
    const color = lines.hd.substring(0, index).toLowerCase();
    const text = lines.hd.substring(index+1).trim();
    return cons({color: color, text: text}, getHighlights(lines.tl));
  }
}


/**
 * Parses a list of highlights, written one highlight per line.
 * @param text Text to parse into highlights
 * @returns List of highlights described by the text, where each line is an
 *     individual highlight with the color being the first word of the line.
 */
export function parseHighlightLines(text: string): List<Highlight> {
  if (text.trim() === "") {
    return nil;
  } else {
    return getHighlights(explode_array(text.split('\n')));
  }
}


// TODO: Uncomment and complete:

const OPEN = "[".charCodeAt(0);
const MIDDLE = "|".charCodeAt(0);
const CLOSE = "]".charCodeAt(0);

/**
 * Returns a list of pairs in form of (c, T) where c is color name and T is text, which is parsed from given chars list
 * @param chars text to parse
 * @returns parse(L) where L = chars and parse is
 *    func parse(nil) := nil
 *         parse(L)   := cons(("white", compact(P)), cons((compact(R), compact(U)), parse(V.tl)))   if S != nil and T != nil and V != nil
 *         parse(L)   := cons(("white", compact(L)), nil)                                           if S  = nil or  T  = nil or  V  = nil
 *    where (P, S) = split-at(L, LB),
 *          (R, T) = split-at(S.tl, MB),
 *          (U, V) = split-at(T.tl, RB),
 *          P:List, S:List, R:List, T:List, U:List, V:List, L:List
 */
function findHighlights(chars: List<number>): List<Highlight> {
  if (chars === nil) {
    return nil;
  } else {
    const [P, S] = split_at(chars, OPEN);
    if (S !== nil) {
      const [R, T] = split_at(S.tl, MIDDLE);
      if (T !== nil) {
        const [U, V] = split_at(T.tl, CLOSE);
        if (V !== nil) {
          return cons({ color: "white", text: compact(P) }, cons({ color: compact(R).toLocaleLowerCase(), text: compact(U) }, findHighlights(V.tl)));
        } else {
          return cons({ color: "white", text: compact(chars) }, nil);
        }
      } else {
        return cons({ color: "white", text: compact(chars) }, nil);
      }
    } else {
      return cons({color: "white", text: compact(chars)}, nil);
    }
  }
}

/**
 * Returns a list of pairs in form of (c, T) where text T will be highlight with color c, which is parsed from given text string
 * @param text text to parse
 * @returns findHighlights(explode(text))
 */
export function parseHighlightText(text: string): List<Highlight> {
  return findHighlights(explode(text));
}