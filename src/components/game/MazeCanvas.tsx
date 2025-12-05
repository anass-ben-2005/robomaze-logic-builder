import { useEffect, useRef } from 'react';
import { Level, RobotState, Direction } from '@/game/types';

interface MazeCanvasProps {
  level: Level;
  robot: RobotState;
  collectedStars: [number, number][];
  isShaking?: boolean;
  isWinGlow?: boolean;
}

const TILE_SIZE = 40;

export function MazeCanvas({ level, robot, collectedStars, isShaking, isWinGlow }: MazeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const [width, height] = level.size;
    canvas.width = width * TILE_SIZE;
    canvas.height = height * TILE_SIZE;

    // Clear canvas
    ctx.fillStyle = '#2d5a27';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid tiles
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const isWall = level.walls.some(([wx, wy]) => wx === x && wy === y);
        const isStart = x === level.start[0] && y === level.start[1];
        const isExit = x === level.exit[0] && y === level.exit[1];
        const isStar = level.stars.some(([sx, sy]) => sx === x && sy === y) &&
          !collectedStars.some(([cx, cy]) => cx === x && cy === y);

        drawTile(ctx, x, y, isWall, isStart, isExit, isStar);
      }
    }

    // Draw robot
    drawRobot(ctx, robot.x, robot.y, robot.direction);

  }, [level, robot, collectedStars]);

  function drawTile(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    isWall: boolean,
    isStart: boolean,
    isExit: boolean,
    isStar: boolean
  ) {
    const px = x * TILE_SIZE;
    const py = y * TILE_SIZE;

    if (isWall) {
      // Stone wall - gray blocks
      ctx.fillStyle = '#7f7f7f';
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      
      // Pixel detail
      ctx.fillStyle = '#5f5f5f';
      ctx.fillRect(px, py + TILE_SIZE - 4, TILE_SIZE, 4);
      ctx.fillRect(px + TILE_SIZE - 4, py, 4, TILE_SIZE);
      
      ctx.fillStyle = '#9f9f9f';
      ctx.fillRect(px, py, TILE_SIZE, 4);
      ctx.fillRect(px, py, 4, TILE_SIZE);
      
      // Brick pattern
      ctx.fillStyle = '#6f6f6f';
      ctx.fillRect(px + 2, py + TILE_SIZE / 2 - 1, TILE_SIZE - 4, 2);
      ctx.fillRect(px + TILE_SIZE / 2 - 1, py + 2, 2, TILE_SIZE / 2 - 4);
      ctx.fillRect(px + TILE_SIZE / 2 - 1, py + TILE_SIZE / 2 + 2, 2, TILE_SIZE / 2 - 4);
    } else {
      // Grass tile
      ctx.fillStyle = '#6aa84f';
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      
      // Grass detail
      ctx.fillStyle = '#5a9840';
      ctx.fillRect(px + 4, py + 8, 2, 4);
      ctx.fillRect(px + 12, py + 16, 2, 4);
      ctx.fillRect(px + 24, py + 6, 2, 4);
      ctx.fillRect(px + 32, py + 20, 2, 4);
      ctx.fillRect(px + 18, py + 28, 2, 4);
      
      // Grid line
      ctx.strokeStyle = '#4a7830';
      ctx.lineWidth = 1;
      ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
    }

    if (isStart) {
      // Wood platform for start
      ctx.fillStyle = '#b97a57';
      ctx.fillRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      ctx.fillStyle = '#8b5a2b';
      ctx.fillRect(px + 4, py + TILE_SIZE - 12, TILE_SIZE - 8, 4);
      
      // S letter
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('S', px + TILE_SIZE / 2, py + TILE_SIZE / 2 + 4);
    }

    if (isExit) {
      // Exit portal - purple/magenta
      ctx.fillStyle = '#9932cc';
      ctx.fillRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      
      // Inner glow
      ctx.fillStyle = '#da70d6';
      ctx.fillRect(px + 8, py + 8, TILE_SIZE - 16, TILE_SIZE - 16);
      
      // Center sparkle
      ctx.fillStyle = '#fff';
      ctx.fillRect(px + TILE_SIZE / 2 - 2, py + TILE_SIZE / 2 - 2, 4, 4);
    }

    if (isStar) {
      drawStar(ctx, px + TILE_SIZE / 2, py + TILE_SIZE / 2, 12);
    }
  }

  function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const x = cx + Math.cos(angle) * size;
      const y = cy + Math.sin(angle) * size;
      
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    
    ctx.closePath();
    ctx.fill();
    
    // Inner highlight
    ctx.fillStyle = '#ffec8b';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const x = cx + Math.cos(angle) * (size * 0.5);
      const y = cy + Math.sin(angle) * (size * 0.5);
      
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }

  function drawRobot(ctx: CanvasRenderingContext2D, x: number, y: number, direction: Direction) {
    const px = x * TILE_SIZE + TILE_SIZE / 2;
    const py = y * TILE_SIZE + TILE_SIZE / 2;
    const size = TILE_SIZE * 0.35;

    // Robot body
    ctx.fillStyle = '#4a90d9';
    ctx.fillRect(px - size, py - size, size * 2, size * 2);
    
    // Dark edge
    ctx.fillStyle = '#2d5a8a';
    ctx.fillRect(px - size, py + size - 4, size * 2, 4);
    ctx.fillRect(px + size - 4, py - size, 4, size * 2);
    
    // Light edge
    ctx.fillStyle = '#6ab0f9';
    ctx.fillRect(px - size, py - size, size * 2, 4);
    ctx.fillRect(px - size, py - size, 4, size * 2);

    // Eyes
    ctx.fillStyle = '#fff';
    ctx.fillRect(px - size + 4, py - size + 6, 6, 6);
    ctx.fillRect(px + size - 10, py - size + 6, 6, 6);
    
    // Pupils
    ctx.fillStyle = '#000';
    ctx.fillRect(px - size + 6, py - size + 8, 2, 2);
    ctx.fillRect(px + size - 8, py - size + 8, 2, 2);

    // Direction indicator (antenna/arrow)
    ctx.fillStyle = '#ff6b6b';
    const arrowSize = 6;
    
    ctx.save();
    ctx.translate(px, py);
    
    const rotations: Record<Direction, number> = {
      up: -Math.PI / 2,
      right: 0,
      down: Math.PI / 2,
      left: Math.PI
    };
    ctx.rotate(rotations[direction]);
    
    // Draw arrow pointing right (will be rotated)
    ctx.beginPath();
    ctx.moveTo(size + 2, 0);
    ctx.lineTo(size - arrowSize, -arrowSize);
    ctx.lineTo(size - arrowSize, arrowSize);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  }

  const canvasClasses = [
    'border-4 border-wood-dark',
    isShaking ? 'animate-shake' : '',
    isWinGlow ? 'animate-pulse-glow' : ''
  ].filter(Boolean).join(' ');

  return (
    <canvas
      ref={canvasRef}
      className={canvasClasses}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
