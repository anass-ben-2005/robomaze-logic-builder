import { levels } from '@/game/levels';
import { LevelCard } from '@/components/game/LevelCard';
import { getPlayerData, isLevelUnlocked } from '@/game/storage';
import { soundManager } from '@/game/soundManager';
import { ArrowLeft } from 'lucide-react';

interface LevelSelectScreenProps {
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
}

export function LevelSelectScreen({ onSelectLevel, onBack }: LevelSelectScreenProps) {
  const player = getPlayerData();

  const handleSelectLevel = (levelId: number) => {
    soundManager.playClick();
    onSelectLevel(levelId);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="pixel-btn bg-secondary text-secondary-foreground p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-xl text-accent text-pixel-shadow">SELECT LEVEL</h1>
      </div>

      {/* Level grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-w-2xl mx-auto">
        {levels.map(level => {
          const unlocked = isLevelUnlocked(level.id);
          const completed = player?.completedLevels.includes(level.id) || false;
          const highScore = player?.highScores[level.id];

          return (
            <LevelCard
              key={level.id}
              level={level}
              isUnlocked={unlocked}
              isCompleted={completed}
              highScore={highScore}
              onClick={() => unlocked && handleSelectLevel(level.id)}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 text-[10px]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-grass" />
          <span className="text-muted-foreground">Easy (1-5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-sky" />
          <span className="text-muted-foreground">Medium (6-10)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent" />
          <span className="text-muted-foreground">Hard (11-15)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-destructive" />
          <span className="text-muted-foreground">Very Hard (16-20)</span>
        </div>
      </div>
    </div>
  );
}
