import { Level } from '@/game/types';
import { Play, RotateCcw, Home } from 'lucide-react';

interface GameHUDProps {
  level: Level;
  starsCollected: number;
  totalStars: number;
  onRun: () => void;
  onReset: () => void;
  onHome: () => void;
  isRunning: boolean;
  isComplete: boolean;
}

export function GameHUD({
  level,
  starsCollected,
  totalStars,
  onRun,
  onReset,
  onHome,
  isRunning,
  isComplete
}: GameHUDProps) {
  return (
    <div className="wood-panel flex items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <span className="text-muted-foreground">Level</span>
          <span className="ml-2 text-accent">{level.id}</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Stars</span>
          <span className="ml-2 text-star">★ {starsCollected}/{totalStars}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onHome}
          className="pixel-btn bg-secondary text-secondary-foreground p-2"
          title="Home"
        >
          <Home className="w-4 h-4" />
        </button>
        <button
          onClick={onReset}
          className="pixel-btn bg-secondary text-secondary-foreground p-2"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={onRun}
          disabled={isRunning || isComplete}
          className={`
            pixel-btn bg-primary text-primary-foreground px-4 py-2
            flex items-center gap-2
            ${(isRunning || isComplete) ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <Play className="w-4 h-4" />
          <span className="text-xs">RUN</span>
        </button>
      </div>
    </div>
  );
}
