import { Level, Command, Direction, RobotState, GameState } from './types';

export function createInitialGameState(level: Level): GameState {
  return {
    robot: {
      x: level.start[0],
      y: level.start[1],
      direction: 'right' as Direction
    },
    collectedStars: [],
    isRunning: false,
    isWin: false,
    isLose: false,
    executionStep: 0
  };
}

export function turnLeft(direction: Direction): Direction {
  const turns: Record<Direction, Direction> = {
    up: 'left',
    left: 'down',
    down: 'right',
    right: 'up'
  };
  return turns[direction];
}

export function turnRight(direction: Direction): Direction {
  const turns: Record<Direction, Direction> = {
    up: 'right',
    right: 'down',
    down: 'left',
    left: 'up'
  };
  return turns[direction];
}

export function getNextPosition(robot: RobotState): [number, number] {
  const dx: Record<Direction, number> = { up: 0, down: 0, left: -1, right: 1 };
  const dy: Record<Direction, number> = { up: -1, down: 1, left: 0, right: 0 };
  
  return [robot.x + dx[robot.direction], robot.y + dy[robot.direction]];
}

export function isWall(x: number, y: number, level: Level): boolean {
  // Check boundaries
  if (x < 0 || x >= level.size[0] || y < 0 || y >= level.size[1]) {
    return true;
  }
  // Check wall tiles
  return level.walls.some(([wx, wy]) => wx === x && wy === y);
}

export function isStar(x: number, y: number, level: Level, collected: [number, number][]): boolean {
  return level.stars.some(([sx, sy]) => 
    sx === x && sy === y && !collected.some(([cx, cy]) => cx === x && cy === y)
  );
}

export function isExit(x: number, y: number, level: Level): boolean {
  return x === level.exit[0] && y === level.exit[1];
}

export function allStarsCollected(level: Level, collected: [number, number][]): boolean {
  return collected.length === level.stars.length;
}

export function expandCommands(
  commands: Command[],
  functionCommands: Command[],
  recursionLimit: number
): Command[] {
  const result: Command[] = [];
  let recursionCount = 0;

  function expand(cmds: Command[]) {
    for (const cmd of cmds) {
      if (cmd.type === 'function') {
        if (recursionCount < recursionLimit && functionCommands.length > 0) {
          recursionCount++;
          expand(functionCommands);
        }
      } else {
        result.push(cmd);
      }
    }
  }

  expand(commands);
  return result;
}

export function calculateScore(
  starsCollected: number,
  levelId: number,
  blocksUsed: number
): number {
  const levelMultiplier = Math.floor(levelId / 5) + 1;
  return Math.max(0, (starsCollected * 100 * levelMultiplier) - blocksUsed * 5);
}
