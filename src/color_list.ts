import { ColorInfo, COLORS } from './colors';
import { List, cons, nil } from './list';

/** 
 * A color list that has useful functions to retrieve its information
 * */
export interface ColorList {
  /**
   * Returns a list of all color names that include the given text
   * @param text Text to look for in the names of the colors (case insensitive)
   * @returns list of all color names that include the given text
   */
  findMatchingNames(text: string): List<string>;

  /**
   * Returns the background and foreground CSS colors to highlight with this color.
   * @param name Name of the color to look for
   * @throws Error if there is no such color
   * @returns (bg, fg) where bg is the CSS background color and fg is foreground
   */
  getColorCss(name: string): readonly [string, string];
}

class SimpleColorList implements ColorList {
  // AF: obj = this.colors
  readonly colors: List<ColorInfo>

  // makes obj = colorinfo
  constructor(colorinfo: List<ColorInfo>) {
    this.colors = colorinfo;
  }

  findMatchingNames = (text: string): List<string> => {
    return findMatchingNamesIn(text, this.colors);
  }

  getColorCss = (name: string): readonly [string, string] => {
    return getColorCssIn(name, this.colors);
  }
}

/**
 * Returns a color list that is made from COLORS list
 * @returns an instance of SimpleColorList that uses colors from the COLORS list
 */
export function makeSimpleColorList(): SimpleColorList {
  return new SimpleColorList(COLORS);
}

// Returns a new list containing just the names of those colors that include the
// given text.
export function findMatchingNamesIn(text: string, colors: List<ColorInfo>): List<string> {
  if (colors === nil) {
    return nil;
  } else if (colors.hd[0].includes(text)) {
    return cons(colors.hd[0], findMatchingNamesIn(text, colors.tl));
  } else {
    return findMatchingNamesIn(text, colors.tl);
  }
}

// Returns the colors from the (first) list entry with this color name. Throws
// an Error none is found (i.e., we hit the end of the list).
function getColorCssIn(name: string, colors: List<ColorInfo>): readonly [string, string] {
  if (colors === nil) {
    throw new Error(`no color called "${name}"`);
  } else if (colors.hd[0] === name) {
    return [colors.hd[1], colors.hd[2] ? '#F0F0F0' : '#101010'];
  } else {
    return getColorCssIn(name, colors.tl);
  }
}