import * as assert from 'assert';
import { explode_array } from './list';
import { parseHighlightLines, parseHighlightText } from './parser';


describe('parser', function() {

  it('parseHighlightLines', function() {
    assert.deepEqual(parseHighlightLines(""), explode_array([]));
    assert.deepEqual(
      parseHighlightLines("Red hi there"),
      explode_array([
        {color: 'red', text: 'hi there'},
      ]));
    assert.deepEqual(
      parseHighlightLines("Red hi there\nGreen more text"),
      explode_array([
        {color: 'red', text: 'hi there'},
        {color: 'green', text: 'more text'},
      ]));
    assert.deepEqual(
      parseHighlightLines("Red hi there\nGreen more text\nBlue really? more?"),
      explode_array([
        {color: 'red', text: 'hi there'},
        {color: 'green', text: 'more text'},
        {color: 'blue', text: 'really? more?'},
      ]));
  });

  // TODO: Uncomment to test
  it('parseHighlightText', function() {
    assert.deepEqual(parseHighlightLines(""), explode_array([]));
    assert.deepEqual(
      parseHighlightText("hi there"),
      explode_array([
        {color: 'white', text: 'hi there'},
      ]));
    assert.deepEqual(
      parseHighlightText("hi there [Red|be dragons]"),
      explode_array([
        {color: 'white', text: 'hi there '},
        {color: 'red', text: 'be dragons'},
      ]));
    assert.deepEqual(
      parseHighlightText("oh [Green|goodbye be dragons]"),
      explode_array([
        {color: 'white', text: 'oh '},
        {color: 'green', text: 'goodbye be dragons'},
      ]));
    assert.deepEqual(
      parseHighlightText("hi there [Red|be dragons] and stuff"),
      explode_array([
        {color: 'white', text: 'hi there '},
        {color: 'red', text: 'be dragons'},
        {color: 'white', text: ' and stuff'},
      ]));
    assert.deepEqual(
      parseHighlightText("hi there [Red|be dragons] and [Blue|stuff], man"),
      explode_array([
        {color: 'white', text: 'hi there '},
        {color: 'red', text: 'be dragons'},
        {color: 'white', text: ' and '},
        {color: 'blue', text: 'stuff'},
        {color: 'white', text: ', man'},
      ]));

    // broken in various places
    assert.deepEqual(
      parseHighlightText("hi there [Red|be dragons and stuff"),
      explode_array([
        {color: 'white', text: 'hi there [Red|be dragons and stuff'},
      ]));
    assert.deepEqual(
      parseHighlightText("hi there [Red]be dragons and stuff"),
      explode_array([
        {color: 'white', text: 'hi there [Red]be dragons and stuff'},
      ]));
  });
});