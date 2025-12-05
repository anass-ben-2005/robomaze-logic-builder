import { Level } from '@/game/types';
import { Lock, Star } from 'lucide-react';

interface LevelCardProps {
  level: Level;
  isUnlocked: boolean;
  isCompleted: boolean;
  highScore?: number;
  onClick: () => void;
}

export function LevelCard({ level, isUnlocked, isCompleted, highScore, onClick }: LevelCardProps) {
  const difficultyColor = level.id <= 5 
    ? 'bg-grass' 
    : level.id <= 10 
    ? 'bg-sky' 
    : level.id <= 15 
    ? 'bg-accent' 
    : 'bg-destructive';

  return (
    <button
      onClick={onClick}
      disabled={!isUnlocked}
      className={`
        relative p-4 transition-all duration-200
        ${isUnlocked 
          ? 'wood-panel hover:brightness-110 cursor-pointer' 
          : 'stone-panel opacity-60 cursor-not-allowed'
        }
      `}
    >
      <div className="flex flex-col items-center gap-2">
        <div className={`
          w-12 h-12 flex items-center justify-center text-lg
          ${difficultyColor}
        `}>
          {isUnlocked ? level.id : <Lock className="w-5 h-5" />}
        </div>
        
        <div className="text-[10px] text-muted-foreground">
          {level.size[0]}×{level.size[1]}
        </div>
        
        {isCompleted && (
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-star fill-star" />
            <span className="text-[10px] text-star">{highScore}</span>
          </div>
        )}
      </div>
    </button>
  );
}
