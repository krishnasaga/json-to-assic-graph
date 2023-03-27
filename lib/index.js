const boxen = require('boxen');

// Function to print graph in ASCII format
function printGraph(graph) {
  const nodes = graph.nodes.map(node => node.label);
  const links = graph.links.map(link => [nodes.indexOf(link.source), nodes.indexOf(link.target)]);

  const maxLength = Math.max(...nodes.map(node => node.length));
  const padding = ' '.repeat(maxLength);

  const lines = [];

  for (let i = 0; i < nodes.length; i++) {
    const neighbors = links.filter(link => link.includes(i)).map(link => link[link.indexOf(i) === 0 ? 1 : 0]);
    const paddingLength = maxLength - nodes[i].length;
    let line = nodes[i] + ' '.repeat(paddingLength) + '  ';

    if (neighbors.length > 0) {
      if (neighbors.includes(i)) {
        line += '+';
      } else {
        line += '|';
      }
    } else {
      line += ' ';
    }

    // Add box around the label
    line = boxen(line, { padding: 1, borderStyle: 'double' });

    lines.push(line);

    if (neighbors.length > 0) {
      const maxNeighborLength = Math.max(...neighbors.map(neighbor => nodes[neighbor].length));

      for (let j = 0; j < maxNeighborLength; j++) {
        line = ' '.repeat(maxLength) + '  ';

        for (let k = 0; k < neighbors.length; k++) {
          const neighbor = neighbors[k];
          const neighborNode = nodes[neighbor];
          const paddingLength = maxNeighborLength - neighborNode.length;

          if (j < neighborNode.length) {
            line += neighborNode[j];
          } else {
            line += ' ';
          }

          line += ' '.repeat(paddingLength);

          if (k < neighbors.length - 1) {
            line += '|';
          } else {
            line += ' ';
          }
        }

        lines.push(line);
      }
    }
  }

  console.log(lines.join('\n'));
}
