export interface Level {
  id: number;
  size: [number, number];
  start: [number, number];
  exit: [number, number];
  stars: [number, number][];
  walls: [number, number][];
  blockLimit: number;
  recursionLimit: number;
}

export type CommandType = 'forward' | 'left' | 'right' | 'function';

export interface Command {
  id: string;
  type: CommandType;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface RobotState {
  x: number;
  y: number;
  direction: Direction;
}

export interface GameState {
  robot: RobotState;
  collectedStars: [number, number][];
  isRunning: boolean;
  isWin: boolean;
  isLose: boolean;
  executionStep: number;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  level: number;
}

export interface PlayerData {
  name: string;
  completedLevels: number[];
  highScores: Record<number, number>;
}
