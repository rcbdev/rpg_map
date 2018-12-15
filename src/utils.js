const isSameCell = (a, b) => a && b && a.x === b.x && a.y === b.y;
const getCellKey = cell => `${cell.x}-${cell.y}`;

export { isSameCell, getCellKey };
