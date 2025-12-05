import { LeaderboardEntry, PlayerData } from './types';

const PLAYER_KEY = 'robomaze_player';
const LEADERBOARD_KEY = 'robomaze_leaderboard';

export function getPlayerData(): PlayerData | null {
  const data = localStorage.getItem(PLAYER_KEY);
  return data ? JSON.parse(data) : null;
}

export function savePlayerData(data: PlayerData): void {
  localStorage.setItem(PLAYER_KEY, JSON.stringify(data));
}

export function createPlayer(name: string): PlayerData {
  const player: PlayerData = {
    name,
    completedLevels: [],
    highScores: {}
  };
  savePlayerData(player);
  return player;
}

export function updatePlayerProgress(levelId: number, score: number): void {
  const player = getPlayerData();
  if (!player) return;

  if (!player.completedLevels.includes(levelId)) {
    player.completedLevels.push(levelId);
  }

  if (!player.highScores[levelId] || score > player.highScores[levelId]) {
    player.highScores[levelId] = score;
  }

  savePlayerData(player);
  updateLeaderboard(player.name, score, levelId);
}

export function getLeaderboard(): LeaderboardEntry[] {
  const data = localStorage.getItem(LEADERBOARD_KEY);
  return data ? JSON.parse(data) : [];
}

export function updateLeaderboard(name: string, score: number, level: number): void {
  const leaderboard = getLeaderboard();
  
  // Check if this player already has an entry for this level
  const existingIndex = leaderboard.findIndex(
    entry => entry.name === name && entry.level === level
  );

  if (existingIndex >= 0) {
    if (score > leaderboard[existingIndex].score) {
      leaderboard[existingIndex].score = score;
    }
  } else {
    leaderboard.push({ name, score, level });
  }

  // Sort by score descending and keep top 10
  leaderboard.sort((a, b) => b.score - a.score);
  const top10 = leaderboard.slice(0, 10);
  
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top10));
}

export function isLevelUnlocked(levelId: number): boolean {
  if (levelId === 1) return true;
  const player = getPlayerData();
  if (!player) return false;
  return player.completedLevels.includes(levelId - 1);
}
