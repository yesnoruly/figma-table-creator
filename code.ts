// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

figma.ui.resize(400, 400);

figma.ui.onmessage = (msg) => {
  const { rows, columns, row_height, column_width } = msg;

  const nodes = [];

  for (let i = 0; i < rows; i++) {
    for (let y = 0; y < columns; y++) {
      const cellNode = figma.createRectangle();

      cellNode.resize(parseInt(column_width), parseInt(row_height))

      cellNode.x = y * parseFloat(column_width);
      cellNode.y = i * parseFloat(row_height);

      cellNode.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];

      figma.currentPage.appendChild(cellNode);
      nodes.push(cellNode);
    }
  }

  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
};
