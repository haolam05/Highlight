import { ColorInfo, COLORS } from './colors';
import { List, nil } from './list';


// Make sure the colors are in sorted order.
// (The list implementation does not assume this but the tree does.)
function checkSorted(colors: List<ColorInfo>) {
  if (colors !== nil && colors.tl !== nil) {
    if (!(colors.hd[0] < colors.tl.hd[0]))
      throw new Error(`not in sorted order: ${colors.hd[0]} < ${colors.tl.hd[0]}`);
    checkSorted(colors.tl);
  }
}


describe('colors', function() {

  it('sorted', function() {
    checkSorted(COLORS);
  });

});