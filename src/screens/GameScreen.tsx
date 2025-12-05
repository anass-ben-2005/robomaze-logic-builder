import { useState, useCallback, useEffect } from 'react';
import { Level, Command, GameState } from '@/game/types';
import { levels } from '@/game/levels';
import { MazeCanvas } from '@/components/game/MazeCanvas';
import { ProgramPanel } from '@/components/game/ProgramPanel';
import { GameHUD } from '@/components/game/GameHUD';
import { ResultModal } from '@/components/game/ResultModal';
import { soundManager } from '@/game/soundManager';
import { updatePlayerProgress } from '@/game/storage';
import {
  createInitialGameState,
  expandCommands,
  turnLeft,
  turnRight,
  getNextPosition,
  isWall,
  isStar,
  isExit,
  allStarsCollected,
  calculateScore
} from '@/game/gameEngine';

interface GameScreenProps {
  levelId: number;
  onHome: () => void;
  onNextLevel: () => void;
}

export function GameScreen({ levelId, onHome, onNextLevel }: GameScreenProps) {
  const level = levels.find(l => l.id === levelId) as Level;
  
  const [commands, setCommands] = useState<Command[]>([]);
  const [functionCommands, setFunctionCommands] = useState<Command[]>([]);
  const [gameState, setGameState] = useState<GameState>(() => createInitialGameState(level));
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const resetGame = useCallback(() => {
    setGameState(createInitialGameState(level));
    setShowResult(false);
    setFinalScore(0);
  }, [level]);

  const clearProgram = useCallback(() => {
    setCommands([]);
    setFunctionCommands([]);
    resetGame();
  }, [resetGame]);

  const executeProgram = useCallback(async () => {
    const expandedCommands = expandCommands(commands, functionCommands, level.recursionLimit);
    const maxInstructions = level.size[0] * level.size[1] * 2;

    if (expandedCommands.length === 0) return;

    setGameState(prev => ({ ...prev, isRunning: true }));

    let currentState = { ...createInitialGameState(level) };
    let instructionCount = 0;

    for (const cmd of expandedCommands) {
      if (instructionCount >= maxInstructions) {
        // Exceeded instruction limit
        setGameState(prev => ({ ...prev, isLose: true, isRunning: false }));
        soundManager.playLose();
        setShowResult(true);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 200));

      if (cmd.type === 'forward') {
        const [nextX, nextY] = getNextPosition(currentState.robot);
        
        if (isWall(nextX, nextY, level)) {
          // Hit a wall
          soundManager.playLose();
          setGameState(prev => ({ 
            ...prev, 
            isLose: true, 
            isRunning: false 
          }));
          setShowResult(true);
          return;
        }

        currentState.robot.x = nextX;
        currentState.robot.y = nextY;
        soundManager.playMove();

        // Check for star
        if (isStar(nextX, nextY, level, currentState.collectedStars)) {
          currentState.collectedStars = [...currentState.collectedStars, [nextX, nextY]];
          soundManager.playStar();
        }

        // Check for exit with all stars
        if (isExit(nextX, nextY, level) && allStarsCollected(level, currentState.collectedStars)) {
          const score = calculateScore(
            currentState.collectedStars.length,
            level.id,
            commands.length + functionCommands.length
          );
          
          soundManager.playWin();
          updatePlayerProgress(level.id, score);
          setFinalScore(score);
          setGameState({ 
            ...currentState, 
            isWin: true, 
            isRunning: false 
          });
          setShowResult(true);
          return;
        }

      } else if (cmd.type === 'left') {
        currentState.robot.direction = turnLeft(currentState.robot.direction);
      } else if (cmd.type === 'right') {
        currentState.robot.direction = turnRight(currentState.robot.direction);
      }

      setGameState({ ...currentState, isRunning: true });
      instructionCount++;
    }

    // Ran out of commands without winning
    if (!allStarsCollected(level, currentState.collectedStars) || 
        !isExit(currentState.robot.x, currentState.robot.y, level)) {
      soundManager.playLose();
      setGameState(prev => ({ ...prev, isLose: true, isRunning: false }));
      setShowResult(true);
    }
  }, [commands, functionCommands, level]);

  const handleNextLevel = () => {
    soundManager.playClick();
    clearProgram();
    onNextLevel();
  };

  const handleRetry = () => {
    soundManager.playClick();
    resetGame();
  };

  const handleHome = () => {
    soundManager.playClick();
    onHome();
  };

  const hasNextLevel = levelId < 20;

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <GameHUD
        level={level}
        starsCollected={gameState.collectedStars.length}
        totalStars={level.stars.length}
        onRun={executeProgram}
        onReset={clearProgram}
        onHome={handleHome}
        isRunning={gameState.isRunning}
        isComplete={gameState.isWin || gameState.isLose}
      />

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 mt-4">
        {/* Maze */}
        <div className="flex-shrink-0">
          <MazeCanvas
            level={level}
            robot={gameState.robot}
            collectedStars={gameState.collectedStars}
            isShaking={gameState.isLose}
            isWinGlow={gameState.isWin}
          />
        </div>

        {/* Program panel */}
        <ProgramPanel
          commands={commands}
          onCommandsChange={setCommands}
          functionCommands={functionCommands}
          onFunctionCommandsChange={setFunctionCommands}
          blockLimit={level.blockLimit}
          recursionLimit={level.recursionLimit}
          disabled={gameState.isRunning}
        />
      </div>

      {showResult && (
        <ResultModal
          isWin={gameState.isWin}
          score={finalScore}
          onRetry={handleRetry}
          onNextLevel={handleNextLevel}
          onHome={handleHome}
          hasNextLevel={hasNextLevel}
        />
      )}
    </div>
  );
}
