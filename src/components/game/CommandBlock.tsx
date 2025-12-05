import { CommandType } from '@/game/types';
import { ArrowUp, RotateCcw, RotateCw, Repeat } from 'lucide-react';

interface CommandBlockProps {
  type: CommandType;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onClick?: () => void;
  showRemove?: boolean;
  onRemove?: () => void;
}

const blockConfig: Record<CommandType, { label: string; icon: React.ReactNode; bgColor: string }> = {
  forward: {
    label: 'Forward',
    icon: <ArrowUp className="w-4 h-4" />,
    bgColor: 'bg-grass'
  },
  left: {
    label: 'Left',
    icon: <RotateCcw className="w-4 h-4" />,
    bgColor: 'bg-sky'
  },
  right: {
    label: 'Right',
    icon: <RotateCw className="w-4 h-4" />,
    bgColor: 'bg-sky'
  },
  function: {
    label: 'Function',
    icon: <Repeat className="w-4 h-4" />,
    bgColor: 'bg-exit'
  }
};

export function CommandBlock({ 
  type, 
  draggable = true, 
  onDragStart, 
  onClick,
  showRemove,
  onRemove 
}: CommandBlockProps) {
  const config = blockConfig[type];

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onClick={onClick}
      className={`
        command-block ${config.bgColor} text-foreground
        flex items-center gap-2 select-none
        ${draggable ? 'hover:brightness-110' : ''}
        transition-all duration-100
        relative
      `}
    >
      {config.icon}
      <span className="text-[10px]">{config.label}</span>
      {showRemove && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[8px] flex items-center justify-center"
        >
          ×
        </button>
      )}
    </div>
  );
}
