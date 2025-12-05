import { LeaderboardEntry } from '@/game/types';
import { Trophy } from 'lucide-react';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export function Leaderboard({ entries }: LeaderboardProps) {
  const top3 = entries.slice(0, 3);

  return (
    <div className="wood-panel w-full max-w-sm">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-accent" />
        <h2 className="text-sm text-pixel-shadow">TOP SCORES</h2>
      </div>
      
      {top3.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-4">
          No scores yet. Be the first!
        </p>
      ) : (
        <div className="space-y-2">
          {top3.map((entry, index) => (
            <div
              key={`${entry.name}-${entry.level}-${index}`}
              className="flex items-center justify-between p-2 bg-muted/30"
            >
              <div className="flex items-center gap-2">
                <span className={`
                  text-sm w-6 h-6 flex items-center justify-center
                  ${index === 0 ? 'text-accent' : 'text-muted-foreground'}
                `}>
                  {index + 1}
                </span>
                <span className="text-xs truncate max-w-[100px]">{entry.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">Lv{entry.level}</span>
                <span className="text-xs text-star">{entry.score}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
