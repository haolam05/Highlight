import * as assert from 'assert';
import * as React from 'react';
import { explode_array } from './list';
import { showColors, showHighlights } from './ui';
import { ColorList, makeSimpleColorList } from './color_list';


describe('ui', function() {
  const colorlist: ColorList = makeSimpleColorList();

  it('showColors', function() {
    assert.deepEqual(
        showColors({text: 'pretendo', colorlist: colorlist}), <div>{[]}</div>);
    assert.deepEqual(
        showColors({text: 'indigo', colorlist: colorlist}),
        <div>{[
          <span className="color-border" key="indigo"><span className="color-card"
                style={{backgroundColor: '#4B0082', color: '#F0F0F0'}}>indigo</span></span>
        ]}</div>);
    assert.deepEqual(
        showColors({text: 'lavender', colorlist: colorlist}),
        <div>{[
          <span className="color-border" key="lavender"><span className="color-card"
                style={{backgroundColor: '#E6E6FA', color: '#101010'}}>lavender</span></span>,
          <span className="color-border" key="lavenderblush"><span className="color-card"
                style={{backgroundColor: '#FFF0F5', color: '#101010'}}>lavenderblush</span></span>
        ]}</div>);
  });


  it('showHighlights', function() {
    assert.deepEqual(
        showHighlights({highlights: explode_array([]), colorlist: colorlist}),
        <div>{[]}</div>);
    assert.deepEqual(
        showHighlights({highlights: explode_array([
            {color: 'red', text: 'a quick brown'}
          ]), colorlist: colorlist}),
        <div>{[
          <span className="highlight" key={0}
                style={{backgroundColor: '#FF0000', color: '#F0F0F0'}}>a quick brown</span>
        ]}</div>);
    assert.deepEqual(
        showHighlights({highlights: explode_array([
            {color: 'red', text: 'a quick brown'},
            {color: 'green', text: 'fox jumped over'},
            {color: 'blue', text: 'the lazy dog'}
          ]), colorlist: colorlist}),
        <div>{[
          <span className="highlight" key={0}
                style={{backgroundColor: '#FF0000', color: '#F0F0F0'}}>a quick brown</span>,
          <span className="highlight" key={1}
                style={{backgroundColor: '#008000', color: '#F0F0F0'}}>fox jumped over</span>,
          <span className="highlight" key={2}
                style={{backgroundColor: '#0000FF', color: '#F0F0F0'}}>the lazy dog</span>
        ]}</div>);
  });
});
