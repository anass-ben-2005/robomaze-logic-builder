import { useState, useEffect } from 'react';
import { Leaderboard } from '@/components/game/Leaderboard';
import { getPlayerData, createPlayer, getLeaderboard } from '@/game/storage';
import { soundManager } from '@/game/soundManager';
import { LeaderboardEntry, PlayerData } from '@/game/types';

interface HomeScreenProps {
  onStart: () => void;
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  const [playerName, setPlayerName] = useState('');
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const existingPlayer = getPlayerData();
    if (existingPlayer) {
      setPlayer(existingPlayer);
      setPlayerName(existingPlayer.name);
    }
    setLeaderboard(getLeaderboard());
  }, []);

  const handleStart = () => {
    soundManager.init();
    soundManager.playClick();
    
    if (!player && playerName.trim()) {
      createPlayer(playerName.trim());
    }
    
    onStart();
  };

  const canStart = player || playerName.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
      {/* Logo */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl text-accent text-pixel-shadow mb-2">
          ROBOMAZE
        </h1>
        <p className="text-sm text-grass text-pixel-shadow">Minecraft Edition</p>
      </div>

      {/* Name input */}
      <div className="wood-panel w-full max-w-sm">
        <label className="block text-xs text-muted-foreground mb-2 text-center">
          {player ? 'Welcome back!' : 'Enter your name'}
        </label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Player name..."
          maxLength={12}
          className="pixel-input w-full text-center text-sm"
          disabled={!!player}
        />
        {player && (
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Levels completed: {player.completedLevels.length}/20
          </p>
        )}
      </div>

      {/* Start button */}
      <button
        onClick={handleStart}
        disabled={!canStart}
        className={`
          pixel-btn bg-primary text-primary-foreground px-8 py-4 text-lg
          ${!canStart ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        START
      </button>

      {/* Leaderboard */}
      <Leaderboard entries={leaderboard} />

      {/* Instructions */}
      <div className="text-[10px] text-muted-foreground text-center max-w-sm">
        <p>Program your robot to collect all stars and reach the exit!</p>
        <p className="mt-1">Drag command blocks to create your program.</p>
      </div>
    </div>
  );
}
