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

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const cellNode: RectangleNode = figma.createRectangle();

      cellNode.resize(parseInt(column_width), parseInt(row_height));

      // Set the x and y coordinates of a node in grid
      cellNode.x = c * parseFloat(column_width);
      cellNode.y = r * parseFloat(row_height);

      // Styling table
      cellNode.fills = [
        { type: "SOLID", color: { r: 0.82, g: 0.84, b: 0.84 } },
      ];
      // Borders
      cellNode.strokes = [
        {
          type: "SOLID",
          color: { r: 0, g: 0, b: 0 },
        },
      ];
      cellNode.strokeAlign = "CENTER";

      // Add new node in table
      figma.currentPage.appendChild(cellNode);
      nodes.push(cellNode);
    }
  }
  // Select and zoom to created nodes
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
};
