# MyEra Sticker Canvas App

A simple React application that allows users to place and manipulate stickers on a canvas using react-konva.

## Features

- 600 × 400 pixel canvas
- Three emoji sticker buttons
- Drag and drop stickers on canvas
- Snap-to-grid functionality (40px grid)
- Double-click to delete stickers
- Download canvas as PNG

## Technologies Used

- React
- TypeScript
- react-konva
- Konva

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

- Click on any emoji button to add a sticker to the canvas
- Drag stickers to reposition them (they will snap to a 40px grid)
- Double-click a sticker to remove it
- Click the Download button to save the canvas as a PNG file