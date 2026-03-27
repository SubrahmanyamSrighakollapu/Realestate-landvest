const fs = require('fs');
let src = fs.readFileSync('src/marketing/pages/projects/PlotLayout.jsx', 'utf8');

// 1. Replace ROWS_PER_COL with staggered starts + varying rows
const oldRows = `  // Each column has its own list of plot heights — this creates natural irregular outline
  // Columns have different numbers of plots and different area distributions
  const ROWS_PER_COL_A = [7, 8, 7, 8, 7, 6]; // block A: each col has this many plots
  const ROWS_PER_COL_B = [6, 7, 8, 7, 8, 7]; // block B

  const canvasW = COLS * PLOT_W;

  // Build block: returns plots and the max Y reached per column
  const buildBlock = (rowsPerCol, startY, blockLabel, poolStart) => {
    const blockPlots = [];
    let idx = poolStart;
    const colMaxY = [];

    for (let col = 0; col < COLS; col++) {
      const numRows = rowsPerCol[col];
      let y = startY;
      for (let row = 0; row < numRows; row++) {
        const area = areaPool[idx % areaPool.length];
        const h    = plotH(area);
        const x    = col * PLOT_W;
        blockPlots.push({
          id: idx + 1, plotNo: String(idx + 1),
          x, y, w: PLOT_W, h,
          block: blockLabel,
          status: pool[idx % pool.length],
          facing: facings[idx % 4], area,
          dims: PLOT_DIMS[area] || { w:"9'0\\"", d:"13'4\\""},
          price: (area * PRICE_PER_SQYD).toLocaleString('en-IN'),
          pricePerSqYd: PRICE_PER_SQYD.toLocaleString('en-IN'),
          isCorner: col === 0 || col === COLS - 1,
          distToRoad: Math.floor(Math.random() * 30) + 5,
          distToGate: Math.floor(Math.random() * 120) + 20,
        });
        y += h;
        idx++;
      }
      colMaxY.push(y);
    }
    return { blockPlots, colMaxY, nextIdx: idx };
  };`;

const newRows = `  // Each column: different start offset + different row count = natural irregular outline
  // colStartOffset: how many plot-heights each col is offset from top (creates staggered top edge)
  // ROWS_PER_COL: different row counts create staggered bottom edge
  const COL_TOP_OFFSET_A = [2, 0, 1, 0, 2, 1]; // in plot units (multiples of BASE_H)
  const ROWS_PER_COL_A   = [5, 8, 6, 8, 5, 7];
  const COL_TOP_OFFSET_B = [1, 0, 2, 0, 1, 2];
  const ROWS_PER_COL_B   = [7, 6, 5, 7, 6, 5];

  const canvasW = COLS * PLOT_W;

  const buildBlock = (rowsPerCol, topOffsets, startY, blockLabel, poolStart) => {
    const blockPlots = [];
    let idx = poolStart;
    const colTopY = [];
    const colBotY = [];

    for (let col = 0; col < COLS; col++) {
      const numRows = rowsPerCol[col];
      const offsetY = topOffsets[col] * BASE_H;
      let y = startY + offsetY;
      colTopY.push(y);
      for (let row = 0; row < numRows; row++) {
        const area = areaPool[idx % areaPool.length];
        const h    = plotH(area);
        blockPlots.push({
          id: idx + 1, plotNo: String(idx + 1),
          x: col * PLOT_W, y, w: PLOT_W, h,
          block: blockLabel,
          status: pool[idx % pool.length],
          facing: facings[idx % 4], area,
          dims: PLOT_DIMS[area] || { w:"9'0\\"", d:"13'4\\""},
          price: (area * PRICE_PER_SQYD).toLocaleString('en-IN'),
          pricePerSqYd: PRICE_PER_SQYD.toLocaleString('en-IN'),
          isCorner: col === 0 || col === COLS - 1,
          distToRoad: Math.floor(Math.random() * 30) + 5,
          distToGate: Math.floor(Math.random() * 120) + 20,
        });
        y += h;
        idx++;
      }
      colBotY.push(y);
    }
    return { blockPlots, colTopY, colBotY, nextIdx: idx };
  };`;

if (src.includes(oldRows)) {
  src = src.replace(oldRows, newRows);
  console.log('replaced rows section');
} else {
  console.log('NOT FOUND - trying partial match');
  const idx = src.indexOf('ROWS_PER_COL_A = [7, 8, 7, 8, 7, 6]');
  console.log('partial idx:', idx);
}

// 2. Replace buildBlock calls and boundary
const oldCalls = `  const { blockPlots: blockA, colMaxY: colMaxA, nextIdx } =
    buildBlock(ROWS_PER_COL_A, 0, 'A', 0);

  // midRoadY = max of all block A column bottoms
  const midRoadY = Math.max(...colMaxA);

  const { blockPlots: blockB, colMaxY: colMaxB } =
    buildBlock(ROWS_PER_COL_B, midRoadY + MRW, 'B', nextIdx);

  plots.push(...blockA, ...blockB);

  const canvasH = Math.max(...colMaxB) + 4;

  // Boundary traced from actual outer plot edges
  const bPts = [];
  bPts.push([0, 0], [canvasW, 0]);
  bPts.push([canvasW, colMaxA[COLS-1]]);
  bPts.push([canvasW, midRoadY + MRW]);
  bPts.push([canvasW, colMaxB[COLS-1]]);
  for (let col = COLS-1; col >= 0; col--) {
    bPts.push([(col+1)*PLOT_W, colMaxB[col]]);
    bPts.push([col*PLOT_W,     colMaxB[col]]);
  }
  bPts.push([0, colMaxB[0]]);
  bPts.push([0, midRoadY + MRW]);
  bPts.push([0, colMaxA[0]]);
  bPts.push([0, 0]);

  return { plots, midRoadY, MRW, canvasW, canvasH, boundaryPts: bPts, colMaxA, colMaxB };`;

const newCalls = `  const { blockPlots: blockA, colTopY: colTopA, colBotY: colBotA, nextIdx } =
    buildBlock(ROWS_PER_COL_A, COL_TOP_OFFSET_A, 0, 'A', 0);

  const midRoadY = Math.max(...colBotA);

  const { blockPlots: blockB, colTopY: colTopB, colBotY: colBotB } =
    buildBlock(ROWS_PER_COL_B, COL_TOP_OFFSET_B, midRoadY + MRW, 'B', nextIdx);

  plots.push(...blockA, ...blockB);
  const canvasH = Math.max(...colBotB) + 4;

  // Boundary = stepped polygon from actual outer plot edges
  const bPts = [];
  // TOP: stepped across block A column tops (left to right)
  for (let col = 0; col < COLS; col++) {
    if (col === 0) bPts.push([0, colTopA[col]]);
    else if (colTopA[col] !== colTopA[col-1]) bPts.push([col*PLOT_W, colTopA[col-1]], [col*PLOT_W, colTopA[col]]);
    if (col === COLS-1) bPts.push([canvasW, colTopA[col]]);
  }
  // RIGHT: down block A right col, skip road, down block B right col
  bPts.push([canvasW, colBotA[COLS-1]]);
  bPts.push([canvasW, midRoadY + MRW]);
  bPts.push([canvasW, colBotB[COLS-1]]);
  // BOTTOM: stepped across block B column bottoms (right to left)
  for (let col = COLS-1; col >= 0; col--) {
    if (col === COLS-1) bPts.push([(col+1)*PLOT_W, colBotB[col]]);
    else if (colBotB[col] !== colBotB[col+1]) bPts.push([(col+1)*PLOT_W, colBotB[col+1]], [(col+1)*PLOT_W, colBotB[col]]);
    if (col === 0) bPts.push([0, colBotB[col]]);
  }
  // LEFT: up block B left col, skip road, up block A left col
  bPts.push([0, colTopB[0]]);
  bPts.push([0, midRoadY + MRW]);
  bPts.push([0, colBotA[0]]);
  bPts.push([0, colTopA[0]]);

  return { plots, midRoadY, MRW, canvasW, canvasH, boundaryPts: bPts };`;

if (src.includes(oldCalls)) {
  src = src.replace(oldCalls, newCalls);
  console.log('replaced calls section');
} else {
  console.log('calls section NOT FOUND');
}

// 3. Fix destructuring
src = src.replace(
  'const { plots, midRoadY, MRW, canvasW, canvasH, boundaryPts, colMaxA, colMaxB } = useMemo',
  'const { plots, midRoadY, MRW, canvasW, canvasH, boundaryPts } = useMemo'
);

fs.writeFileSync('src/marketing/pages/projects/PlotLayout.jsx', src);
console.log('done');
