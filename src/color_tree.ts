import { List, len, nil, split } from './list';
import { COLORS, ColorInfo } from './colors';
import { ColorNode, empty, node } from './color_node';
import { ColorList, findMatchingNamesIn } from './color_list';

/**
 * Returns a Binary Search Tree that is made from a given List
 * @param L list of colors that will be used to make BST
 * @requires L is sorted alphabetically
 * @returns the ColorNode(BST) version of L
 */
export function makeBst(L: List<ColorInfo>): ColorNode {
    if (L === nil) {
        return empty;
    } else {
        const [P, S] = split(Math.floor(len(L) / 2), L);
        const [b, R] = split(1, S);

        // note: this case never be entered. Add "b !== nil" check to satisfy Typescript typechecker
        if (b !== nil) {
            return node(b.hd, makeBst(P), makeBst(R));
        } else {
            return empty;
        }
    }
}

/**
 * Lookup a "color name" from a "color list"
 * @param y "color name" to lookup, case insensitive
 * @param root "color list" that is stored in a Binary Search Tree
 * @returns root if "color name" is found in "color list" else returns empty
 */
export function lookup(y: string, root: ColorNode): ColorNode {
    if (root === empty) {
        return empty;
    } else if (root.info[0].toLocaleLowerCase() === y.toLocaleLowerCase()) {
        return root;
    } else if (root.info[0].toLocaleLowerCase() < y.toLocaleLowerCase()) {
        return lookup(y, root.after);
    } else {    // root.info[0].toLocaleLowerCase() > y.toLocaleLowerCase()
        return lookup(y, root.before);
    }
}

// TODO: add interfaces, classes, functions here
class ColorTree implements ColorList {
    // AF: obj = this.colors
    // RI: this.colors_bst = makeBst(obj)
    readonly colors: List<ColorInfo>
    readonly colors_bst: ColorNode;

    // make obj = colorinfo
    constructor(colorinfo: List<ColorInfo>) {
        this.colors = colorinfo;
        this.colors_bst = makeBst(colorinfo);
    }

    findMatchingNames = (text: string): List<string> => {
        return findMatchingNamesIn(text, this.colors);
    }

    getColorCss = (name: string): readonly [string, string] => {
        const result: ColorNode = lookup(name, this.colors_bst);
        if (result === empty) {
            throw new Error(`no color called "${name}"`);
        } else {
            return [result.info[1], result.info[2] ? '#F0F0F0' : '#101010'];
        }
    }
}

/**
 * Returns a color list that is made from COLORS list
 * @returns an instance ColorTree that uses colors from the COLORS list
 */
export function makeColorTree(): ColorTree {
    return new ColorTree(COLORS);
}