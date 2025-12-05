import { useState } from 'react';
import { HomeScreen } from '@/screens/HomeScreen';
import { LevelSelectScreen } from '@/screens/LevelSelectScreen';
import { GameScreen } from '@/screens/GameScreen';

type Screen = 'home' | 'levelSelect' | 'game';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedLevel, setSelectedLevel] = useState(1);

  const handleStart = () => {
    setCurrentScreen('levelSelect');
  };

  const handleSelectLevel = (levelId: number) => {
    setSelectedLevel(levelId);
    setCurrentScreen('game');
  };

  const handleHome = () => {
    setCurrentScreen('home');
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  const handleNextLevel = () => {
    if (selectedLevel < 20) {
      setSelectedLevel(selectedLevel + 1);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {currentScreen === 'home' && (
        <HomeScreen onStart={handleStart} />
      )}
      {currentScreen === 'levelSelect' && (
        <LevelSelectScreen 
          onSelectLevel={handleSelectLevel} 
          onBack={handleBack}
        />
      )}
      {currentScreen === 'game' && (
        <GameScreen
          levelId={selectedLevel}
          onHome={() => setCurrentScreen('levelSelect')}
          onNextLevel={handleNextLevel}
        />
      )}
    </main>
  );
};

export default Index;
