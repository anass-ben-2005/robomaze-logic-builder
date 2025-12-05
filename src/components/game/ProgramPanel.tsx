import { useState } from 'react';
import { Command, CommandType } from '@/game/types';
import { CommandBlock } from './CommandBlock';
import { soundManager } from '@/game/soundManager';

interface ProgramPanelProps {
  commands: Command[];
  onCommandsChange: (commands: Command[]) => void;
  functionCommands: Command[];
  onFunctionCommandsChange: (commands: Command[]) => void;
  blockLimit: number;
  recursionLimit: number;
  disabled?: boolean;
}

export function ProgramPanel({
  commands,
  onCommandsChange,
  functionCommands,
  onFunctionCommandsChange,
  blockLimit,
  recursionLimit,
  disabled
}: ProgramPanelProps) {
  const [draggedType, setDraggedType] = useState<CommandType | null>(null);

  const availableBlocks: CommandType[] = recursionLimit > 0 
    ? ['forward', 'left', 'right', 'function']
    : ['forward', 'left', 'right'];

  const totalBlocks = commands.length + functionCommands.length;

  const handleDragStart = (type: CommandType) => (e: React.DragEvent) => {
    setDraggedType(type);
    e.dataTransfer.setData('text/plain', type);
    soundManager.playClick();
  };

  const handleDrop = (target: 'main' | 'function') => (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain') as CommandType;
    
    if (totalBlocks >= blockLimit) return;

    const newCommand: Command = {
      id: `${Date.now()}-${Math.random()}`,
      type
    };

    soundManager.playDrop();

    if (target === 'main') {
      onCommandsChange([...commands, newCommand]);
    } else {
      onFunctionCommandsChange([...functionCommands, newCommand]);
    }
    
    setDraggedType(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeCommand = (id: string, from: 'main' | 'function') => {
    soundManager.playClick();
    if (from === 'main') {
      onCommandsChange(commands.filter(c => c.id !== id));
    } else {
      onFunctionCommandsChange(functionCommands.filter(c => c.id !== id));
    }
  };

  const clearAll = () => {
    soundManager.playClick();
    onCommandsChange([]);
    onFunctionCommandsChange([]);
  };

  return (
    <div className="wood-panel flex flex-col gap-4 w-full max-w-xs">
      <h2 className="text-sm text-foreground text-pixel-shadow text-center">PROGRAM</h2>
      
      {/* Available blocks */}
      <div className="flex flex-wrap gap-2 justify-center p-2 bg-muted/50">
        {availableBlocks.map(type => (
          <CommandBlock
            key={type}
            type={type}
            onDragStart={handleDragStart(type)}
            draggable={!disabled}
          />
        ))}
      </div>

      {/* Block counter */}
      <div className="text-xs text-center text-muted-foreground">
        Blocks: {totalBlocks} / {blockLimit}
        {recursionLimit > 0 && (
          <span className="ml-2">| Recursion: {recursionLimit}</span>
        )}
      </div>

      {/* Main program area */}
      <div
        onDrop={handleDrop('main')}
        onDragOver={handleDragOver}
        className={`
          min-h-[120px] p-2 bg-muted/30 border-2 border-dashed border-muted-foreground/50
          flex flex-wrap gap-2 content-start
          ${disabled ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <div className="w-full text-[10px] text-muted-foreground mb-1">Main:</div>
        {commands.map(cmd => (
          <CommandBlock
            key={cmd.id}
            type={cmd.type}
            draggable={false}
            showRemove={!disabled}
            onRemove={() => removeCommand(cmd.id, 'main')}
          />
        ))}
        {commands.length === 0 && (
          <div className="text-[10px] text-muted-foreground/50 w-full text-center py-4">
            Drag blocks here
          </div>
        )}
      </div>

      {/* Function area (if recursion allowed) */}
      {recursionLimit > 0 && (
        <div
          onDrop={handleDrop('function')}
          onDragOver={handleDragOver}
          className={`
            min-h-[80px] p-2 bg-exit/20 border-2 border-dashed border-exit/50
            flex flex-wrap gap-2 content-start
            ${disabled ? 'opacity-50 pointer-events-none' : ''}
          `}
        >
          <div className="w-full text-[10px] text-exit mb-1">Function (loops {recursionLimit}x):</div>
          {functionCommands.map(cmd => (
            <CommandBlock
              key={cmd.id}
              type={cmd.type}
              draggable={false}
              showRemove={!disabled}
              onRemove={() => removeCommand(cmd.id, 'function')}
            />
          ))}
        </div>
      )}

      {/* Clear button */}
      {!disabled && (commands.length > 0 || functionCommands.length > 0) && (
        <button
          onClick={clearAll}
          className="text-xs text-destructive hover:text-destructive/80 underline"
        >
          Clear All
        </button>
      )}
    </div>
  );
}
