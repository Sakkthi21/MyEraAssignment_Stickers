import React, { useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import './App.css';

interface Sticker {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const GRID_SIZE = 40;

const App: React.FC = () => {
  const [stickers, setStickers] = useState<Sticker[]>([]);

  const addSticker = (emoji: string) => {
    // Snap to grid
    const x = Math.round(CANVAS_WIDTH / 4 / GRID_SIZE) * GRID_SIZE;
    const y = Math.round(CANVAS_HEIGHT / 4 / GRID_SIZE) * GRID_SIZE;

    setStickers([
      ...stickers,
      {
        id: Date.now(),
        x,
        y,
        emoji,
      },
    ]);
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>, id: number) => {
    const { x, y } = e.target.position();
    // Snap to grid on drag end
    const newX = Math.round(x / GRID_SIZE) * GRID_SIZE;
    const newY = Math.round(y / GRID_SIZE) * GRID_SIZE;

    setStickers(
      stickers.map((sticker) =>
        sticker.id === id ? { ...sticker, x: newX, y: newY } : sticker
      )
    );
  };

  const handleDelete = (id: number) => {
    setStickers(stickers.filter((sticker) => sticker.id !== id));
  };

  const downloadCanvas = () => {
    const dataURL = document.querySelector('canvas')?.toDataURL();
    if (dataURL) {
      const link = document.createElement('a');
      link.download = 'sticker-canvas.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const clearCanvas = () => {
    setStickers([]);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="buttons">
          <button onClick={() => addSticker('😊')}>😊</button>
          <button onClick={() => addSticker('☀️')}>☀️</button>
          <button onClick={() => addSticker('❤️')}>❤️</button>
        </div>
        <Stage
          width={600}
          height={400}
          className="Stage"
        >
          <Layer>
            {stickers.map((sticker) => (
              <Text
                key={sticker.id}
                text={sticker.emoji}
                x={sticker.x}
                y={sticker.y}
                fontSize={40}
                draggable
                fill="white"
                onDragEnd={(e) => handleDragEnd(e, sticker.id)}
                onDblClick={() => handleDelete(sticker.id)}
              />
            ))}
          </Layer>
        </Stage>
        <div className="action-buttons">
          <button className="download-btn" onClick={downloadCanvas}>Download Canvas</button>
          <button className="clear-btn" onClick={clearCanvas}>Clear Canvas</button>
        </div>
      </div>
    </div>
  );
};

export default App;