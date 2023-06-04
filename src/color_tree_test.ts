import * as assert from 'assert';
import { lookup, makeBst, makeColorTree } from "./color_tree";
import { cons, explode_array, nil } from "./list";
import { ColorNode, empty, node } from "./color_node";
import { ColorList } from './color_list';

describe('color_tree', function() {

    // TODO: Uncomment given example tests and add more test cases

    it('make_bst', function() {
        assert.deepEqual(makeBst(explode_array([                    // 0-1-many heuristic, base case
        ])), empty);
        assert.deepEqual(makeBst(explode_array([                    // 0-1-many heuristic, 1st 1 case, single recursive call
            ['blue', '#0000FF', true],
          ])), node(['blue', '#0000FF', true], empty, empty));
        assert.deepEqual(makeBst(explode_array([                    // 0-1-many heuristic, 2nd 1 case, single recursive call
            ['blue', '#0000FF', true],
            ['cyan', '#00FFFF', false]
        ])), node(['cyan', '#00FFFF', false], node(['blue', '#0000FF', true], empty, empty), empty));
        assert.deepEqual(makeBst(explode_array([                    // 0-1-many heuristic, 1st many case, >1 recursive call
            ['blue', '#0000FF', true],
            ['cyan', '#00FFFF', false],
            ['dodgerblue', '#1E90FF', true],
            ['firebrick', '#B22222', true]
        ])), node(['dodgerblue', '#1E90FF', true], node(['cyan', '#00FFFF', false], node(['blue', '#0000FF', true], empty, empty), empty), node(['firebrick', '#B22222', true], empty, empty)));
        assert.deepEqual(makeBst(explode_array([                    // 0-1-many heuristic, 2nd many case, >1 recursive call
            ['blue', '#0000FF', true],
            ['cyan', '#00FFFF', false],
            ['dodgerblue', '#1E90FF', true],
            ['firebrick', '#B22222', true],
            ['grey', '#808080', true],
            ['honeydew', '#F0FFF0', false],
            ['ivory', '#FFFFF0', false],
            ['khaki', '#F0E68C', false],
            ['lavender', '#E6E6FA', false]
        ])), node(['grey', '#808080', true],
                node(['dodgerblue', '#1E90FF', true], node(['cyan', '#00FFFF', false], node(['blue', '#0000FF', true], empty, empty), empty), node(['firebrick', '#B22222', true], empty, empty)), 
                node(['khaki', '#F0E68C', false], node(['ivory', '#FFFFF0', false], node(['honeydew', '#F0FFF0', false], empty, empty), empty), node(['lavender', '#E6E6FA', false], empty, empty))));
    });

    it('lookup', function() {
        const bst: ColorNode = node(['grey', '#808080', true],
            node(['dodgerblue', '#1E90FF', true], node(['cyan', '#00FFFF', false], node(['blue', '#0000FF', true], empty, empty), empty), node(['firebrick', '#B22222', true], empty, empty)),
            node(['khaki', '#F0E68C', false], node(['ivory', '#FFFFF0', false], node(['honeydew', '#F0FFF0', false], empty, empty), empty), node(['lavender', '#E6E6FA', false], empty, empty)));

        assert.deepEqual(lookup('blue', empty), empty);                                             // 0-1-many heuristic, 1st base case #1 (root is empty)
        assert.deepEqual(lookup('yellow', empty), empty);                                           // 0-1-many heuristic, 2nd base case #1 (root is empty)

        let result: ColorNode = lookup('Yellow', node(['Yellow', '#FFFF00', false], empty, empty));
        if (result != empty) { assert.deepEqual(result.info, ['Yellow', '#FFFF00', false]); }       // 0-1-many heuristic, 1st base case #2 (color is found)

        result = lookup('blue', node(['blue', '#0000FF', true], empty, empty));
        if (result != empty) { assert.deepEqual(result.info, ['blue', '#0000FF', true]); }          // 0-1-many heuristic, 2nd base case #2 (color is found)
           
        result = lookup('blue', node(['cyan', '#00FFFF', false], empty, empty));
        assert.deepEqual(result, empty);                                                            // 0-1-many heuristic, 1st 1 case, single recursive call    #1 (search left of BST)

        result = lookup('blue', node(['grey', '#808080', true], empty, empty));
        assert.deepEqual(result, empty);                                                            // 0-1-many heuristic, 2nd 1 case, single recursive call    #1 (search left of BST)

        result = lookup('blue', bst);
        if (result != empty) { assert.deepEqual(result.info, ['blue', '#0000FF', true]); }          // 0-1-many heuristic, 1st many case, >1 recursive call     #1 (search left of BST)

        result = lookup('cyan', bst);
        if (result != empty) { assert.deepEqual(result.info, ['cyan', '#00FFFF', false]); }         // 0-1-many heuristic, 2nd many case, >1 recursive call     #1 (search left of BST)
        
        result = lookup('cyan', node(['blue', '#0000FF', true], empty, empty));
        assert.deepEqual(result, empty);                                                            // 0-1-many heuristic, 1st 1 case, single recursive call    #2 (search right of BST)

        result = lookup('grey', node(['blue', '#0000FF', true], empty, empty));
        assert.deepEqual(result, empty);                                                            // 0-1-many heuristic, 2nd 1 case, single recursive call    #2 (search right of BST)
        
        result = lookup('lavender', bst);
        if (result != empty) { assert.deepEqual(result.info, ['lavender', '#E6E6FA', false]); }     // 0-1-many heuristic, 1st many case, >1 recursive call     #2 (search right of BST)
    
        result = lookup('honeydew', bst);
        if (result != empty) { assert.deepEqual(result.info, ['honeydew', '#F0FFF0', false]); }     // 0-1-many heuristic, 2nd many case, >1 recursive call     #2 (search right of BST)
    });

    const colorlist: ColorList = makeColorTree();

    it('findMatchingNames', function () {
        assert.deepEqual(colorlist.findMatchingNames("doesnotexist"), nil);
        assert.deepEqual(colorlist.findMatchingNames("indigo"), cons("indigo", nil));
        assert.deepEqual(colorlist.findMatchingNames("azure"), cons("azure", nil));
        assert.deepEqual(colorlist.findMatchingNames("lavender"),
            cons("lavender", cons("lavenderblush", nil)));
        assert.deepEqual(colorlist.findMatchingNames("pink"),
            cons("deeppink", cons("hotpink", cons("lightpink", cons("pink", nil)))));
    });

    it('getColorCss', function () {
        assert.deepEqual(colorlist.getColorCss("lavender"), ['#E6E6FA', '#101010']);
        assert.deepEqual(colorlist.getColorCss("indigo"), ['#4B0082', '#F0F0F0']);
    });
});