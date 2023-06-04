import React from 'react';
import { createRoot } from 'react-dom/client';
import { parseHighlightText } from './parser';
import { makeForm, showColors, showHighlights } from './ui';
import { ColorList } from './color_list';
import { makeColorTree } from './color_tree';

// Parse the query parameters in the URL.
const colorlist: ColorList = makeColorTree();  // makeSimpleColorList();
const params = new URLSearchParams(window.location.search);
const word = params.get("word");
const lines = params.get("lines");

const root = createRoot(document.getElementById('main')!);

try {
  // If the query included a word to search for, show the colors containing that
  if (word) {
    root.render(<React.StrictMode>{showColors({text: word, colorlist: colorlist})}</React.StrictMode>);

  // If the query included a list of lines, then show them highlighted.
  } else if (lines) {
    const highlights = parseHighlightText(lines);
    root.render(<React.StrictMode>{showHighlights({highlights: highlights, colorlist: colorlist})}</React.StrictMode>);

  // Otherwise, show the form asking them for input.
  } else {
    root.render(<React.StrictMode>{makeForm({})}</React.StrictMode>);
  }

} catch (e) {
  if (e instanceof Error) {
    root.render(<React.StrictMode><p>Error: {e.message}</p></React.StrictMode>);
  }
}
