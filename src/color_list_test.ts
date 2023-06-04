
import * as assert from 'assert';
import { nil, cons } from './list';
import { ColorList, makeSimpleColorList } from './color_list';

describe('color_list', function() {
  const colorlist: ColorList = makeSimpleColorList();

  it('findMatchingNames', function() {
    assert.deepEqual(colorlist.findMatchingNames("doesnotexist"), nil);
    assert.deepEqual(colorlist.findMatchingNames("indigo"), cons("indigo", nil));
    assert.deepEqual(colorlist.findMatchingNames("azure"), cons("azure", nil));
    assert.deepEqual(colorlist.findMatchingNames("lavender"),
        cons("lavender", cons("lavenderblush", nil)));
    assert.deepEqual(colorlist.findMatchingNames("pink"),
        cons("deeppink", cons("hotpink", cons("lightpink", cons("pink", nil)))));
  });

  it('getColorCss', function() {
    assert.deepEqual(colorlist.getColorCss("lavender"), ['#E6E6FA', '#101010']);
    assert.deepEqual(colorlist.getColorCss("indigo"), ['#4B0082', '#F0F0F0']);
  });
});