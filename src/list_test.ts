import * as assert from 'assert';
import { nil, cons, len, split, compact_list, explode_array, split_at } from './list';
import { explode } from './char_list';


describe('list', function() {

  it('len', function() {
    assert.deepEqual(len(nil), 0);
    assert.deepEqual(len(cons(1, nil)), 1);
    assert.deepEqual(len(cons(1, cons(2, nil))), 2);
    assert.deepEqual(len(cons(3, cons(2, cons(1, nil)))), 3);
  });

  it('split', function() {
    assert.deepEqual(split(0, explode("")), [nil, nil]);

    assert.deepEqual(split(0, explode("a")), [nil, explode("a")]);
    assert.deepEqual(split(1, explode("a")), [explode("a"), nil]);

    assert.deepEqual(split(0, explode("as")), [nil, explode("as")]);
    assert.deepEqual(split(1, explode("as")), [explode("a"), explode("s")]);
    assert.deepEqual(split(2, explode("as")), [explode("as"), nil]);

    assert.deepEqual(split(0, explode("stray")), [nil, explode("stray")]);
    assert.deepEqual(split(1, explode("stray")), [explode("s"), explode("tray")]);
    assert.deepEqual(split(2, explode("stray")), [explode("st"), explode("ray")]);
    assert.deepEqual(split(3, explode("stray")), [explode("str"), explode("ay")]);
    assert.deepEqual(split(4, explode("stray")), [explode("stra"), explode("y")]);
    assert.deepEqual(split(5, explode("stray")), [explode("stray"), explode("")]);
  });
  
  it('split_at', function() {
    assert.deepEqual(split_at(nil, 1), [nil, nil]);                                         // 0-1-many heuristic, 1st base case #1 (L === nil)
    assert.deepEqual(split_at(nil, 2), [nil, nil]);                                         // 0-1-many heuristic, 2nd base case #1 (L === nil)
    assert.deepEqual(split_at(cons(1, nil), 1), [nil, cons(1, nil)]);                       // 0-1-many heuristic, 1st base case #2 (L.hd === c)
    assert.deepEqual(split_at(cons(2, cons(1, nil)), 2), [nil, cons(2, cons(1, nil))]);     // 0-1-many heuristic, 2nd base case #2 (L.hd === c)
    assert.deepEqual(split_at(cons(2, cons(1, nil)), 1), [cons(2, nil), cons(1, nil)]);     // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(split_at(cons(1, nil), 2), [cons(1, nil), nil]);                       // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(split_at(cons(1, cons(2, cons(3, cons(4, cons(5, nil))))), 3), [cons(1, cons(2, nil)), cons(3, cons(4, cons(5, nil)))]);     // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(split_at(cons(1, cons(2, cons(3, cons(4, cons(5, nil))))), 5), [cons(1, cons(2, cons(3, cons(4, nil)))), cons(5, nil)]);     // 0-1-many heuristic, 1st many case, >1 recursive call
  });

  it('compact_list', function() {
    assert.deepEqual(compact_list(nil), []);
    assert.deepEqual(compact_list(cons(1, nil)), [1]);
    assert.deepEqual(compact_list(cons(1, cons(2, nil))), [1, 2]);
    assert.deepEqual(compact_list(cons(3, cons(2, cons(1, nil)))), [3, 2, 1]);
  });

  it('explode_array', function() {
    assert.deepEqual(explode_array([]), nil);
    assert.deepEqual(explode_array([1]), cons(1, nil));
    assert.deepEqual(explode_array([1, 2]), cons(1, cons(2, nil)));
    assert.deepEqual(explode_array([1, 2, 3]), cons(1, cons(2, cons(3, nil))));
  });

});