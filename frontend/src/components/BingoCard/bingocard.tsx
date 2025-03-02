import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

const BingoCard = () => {
  const [size, setSize] = useState(5); // Default 5x5 grid
  const [dimensions, setDimensions] = useState(500); // Default size in px
  const [cells, setCells] = useState(
    Array.from({ length: size * size }, (_, i) => ({ id: i, text: (i + 1).toString() }))
  );
  const cellSize = dimensions / size; // Maintain square layout
  const nodeRef = useRef<HTMLDivElement>(null!);

  const handleCellClick = (id: number) => {
    const newText = prompt("Enter new text for this cell:", cells[id].text);
    if (newText !== null) {
      setCells((prev) => prev.map((cell) => (cell.id === id ? { ...cell, text: newText } : cell)));
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <label className="mb-2 text-lg font-bold">Grid Size:</label>
      <input
        type="number"
        value={size}
        onChange={(e) => {
          const newSize = Math.max(2, Math.min(10, Number(e.target.value)));
          setSize(newSize);
          setCells(Array.from({ length: newSize * newSize }, (_, i) => ({ id: i, text: (i + 1).toString() })));
        }}
        className="mb-4 p-2 border rounded w-20 text-center"
      />
      <label className="mb-2 text-lg font-bold">Card Size:</label>
      <input
        type="number"
        value={dimensions}
        onChange={(e) => setDimensions(Math.max(200, Math.min(800, Number(e.target.value))))}
        className="mb-4 p-2 border rounded w-20 text-center"
      />
      <Draggable nodeRef={nodeRef} handle=".bingo-border">
        <div
          ref={nodeRef}
          className="relative"
          style={{ width: dimensions + 40, height: dimensions + 40, padding: 30 }}
        >
          <div
            className="bingo-border border-4 border-blue-500 p-2 cursor-move"
            style={{ width: dimensions, height: dimensions }}
          >
            <div
              className="grid border"
              style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, width: dimensions, height: dimensions }}
            >
              {cells.map((cell) => (
                <div
                  key={cell.id}
                  className="flex items-center justify-center border bg-gray-100 font-bold cursor-pointer"
                  style={{ width: cellSize, height: cellSize }}
                  onClick={() => handleCellClick(cell.id)}
                >
                  {cell.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default BingoCard;
