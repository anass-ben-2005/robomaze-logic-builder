import { useEffect, useState } from 'react';
import { Trophy, RotateCcw, ArrowRight, Home } from 'lucide-react';

interface ResultModalProps {
  isWin: boolean;
  score: number;
  onRetry: () => void;
  onNextLevel: () => void;
  onHome: () => void;
  hasNextLevel: boolean;
}

export function ResultModal({
  isWin,
  score,
  onRetry,
  onNextLevel,
  onHome,
  hasNextLevel
}: ResultModalProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (isWin && score > 0) {
      const duration = 1000;
      const steps = 20;
      const increment = score / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(interval);
        } else {
          setDisplayScore(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [isWin, score]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
      <div className={`
        wood-panel max-w-md w-full mx-4 text-center
        ${isWin ? 'animate-scale-in' : 'animate-shake'}
      `}>
        {isWin ? (
          <>
            <div className="text-accent text-2xl mb-4 flex items-center justify-center gap-2">
              <Trophy className="w-8 h-8" />
              <span className="text-pixel-shadow">VICTORY!</span>
            </div>
            <div className="text-lg mb-6">
              <span className="text-muted-foreground">Score:</span>
              <span className="ml-2 text-star text-2xl">{displayScore}</span>
            </div>
          </>
        ) : (
          <>
            <div className="text-destructive text-2xl mb-4 text-pixel-shadow">
              GAME OVER
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              The robot hit a wall or got lost!
            </p>
          </>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={onRetry}
            className="pixel-btn bg-secondary text-secondary-foreground flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-xs">RETRY</span>
          </button>
          
          {isWin && hasNextLevel && (
            <button
              onClick={onNextLevel}
              className="pixel-btn bg-primary text-primary-foreground flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              <span className="text-xs">NEXT LEVEL</span>
            </button>
          )}
          
          <button
            onClick={onHome}
            className="pixel-btn bg-muted text-muted-foreground flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span className="text-xs">HOME</span>
          </button>
        </div>
      </div>
    </div>
  );
}
