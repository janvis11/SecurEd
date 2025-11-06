import React, { useEffect, useState, useRef } from "react";

type Cell = {
  x: number;
  y: number;
};

const W = 10;
const H = 6;

const obstacles: Cell[] = [
  { x: 3, y: 1 },
  { x: 3, y: 2 },
  { x: 3, y: 3 },
  { x: 6, y: 2 },
  { x: 6, y: 3 },
  { x: 1, y: 4 },
];

const isObstacle = (x: number, y: number) => obstacles.some((c) => c.x === x && c.y === y);

const start: Cell = { x: 0, y: 0 };
const exitCell: Cell = { x: W - 1, y: H - 1 };

function cellKey(x: number, y: number) {
  return `${x},${y}`;
}

const DisasterEvacuationDemo: React.FC = () => {
  const [player, setPlayer] = useState<Cell>(start);
  const [steps, setSteps] = useState(0);
  const [started, setStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (started && !completed) {
      timerRef.current = window.setInterval(() => {
        setTimeElapsed((t) => t + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [started, completed]);

  const handleCellClick = (x: number, y: number) => {
    if (completed) return;
    // can't move into obstacles
    if (isObstacle(x, y)) return;

    // if not started, start timer
    if (!started) setStarted(true);

    const dx = Math.abs(player.x - x);
    const dy = Math.abs(player.y - y);
    // allow only adjacent moves
    if (dx + dy === 1) {
      setPlayer({ x, y });
      setSteps((s) => s + 1);
      if (x === exitCell.x && y === exitCell.y) {
        setCompleted(true);
        if (timerRef.current) window.clearInterval(timerRef.current);
      }
    }
  };

  const reset = () => {
    setPlayer(start);
    setSteps(0);
    setStarted(false);
    setTimeElapsed(0);
    setCompleted(false);
  };

  const computeScore = () => {
    // simple scoring: fewer steps and less time is better
    const stepPenalty = Math.min(80, steps * 2);
    const timePenalty = Math.min(50, timeElapsed * 1);
    const score = Math.max(0, 100 - stepPenalty - timePenalty);
    return score;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Evacuation Drill (Demo)</h2>
          <p className="text-sm text-muted-foreground max-w-xl">Practice moving a person from the starting point to the exit while avoiding obstacles. Click adjacent tiles to move. This demo demonstrates decision-making and time pressure during evacuation.</p>
        </div>

        <div className="text-right">
          <div className="text-sm">Time: <span className="font-mono">{timeElapsed}s</span></div>
          <div className="text-sm">Steps: <span className="font-mono">{steps}</span></div>
          <div className="mt-2">
            <button onClick={reset} className="px-3 py-1 rounded-md bg-primary text-white">Reset</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-1 bg-muted/20 p-3 rounded-md" style={{ width: 640 }}>
        {Array.from({ length: H }).map((_, row) => (
          <React.Fragment key={row}>
            {Array.from({ length: W }).map((_, col) => {
              const x = col;
              const y = row;
              const isPlayer = player.x === x && player.y === y;
              const isExit = exitCell.x === x && exitCell.y === y;
              const blocked = isObstacle(x, y);

              return (
                <div
                  key={cellKey(x, y)}
                  onClick={() => handleCellClick(x, y)}
                  className={`w-16 h-12 flex items-center justify-center text-sm font-medium cursor-pointer select-none rounded-md transition-all border
                    ${blocked ? 'bg-gray-700 text-white border-gray-600' : isPlayer ? 'bg-yellow-300 border-yellow-500' : isExit ? 'bg-green-400 border-green-600 text-white' : 'bg-white border-border hover:bg-accent/30'}`}
                >
                  {blocked ? 'X' : isPlayer ? 'YOU' : isExit ? 'EXIT' : ''}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {completed && (
        <div className="p-4 rounded-md bg-success/10 border border-success">
          <h3 className="text-lg font-semibold">Evacuated!</h3>
          <p className="mt-2">You reached the exit in <strong>{timeElapsed}s</strong> with <strong>{steps}</strong> steps.</p>
          <p className="mt-2">Score: <strong>{computeScore()}</strong></p>
        </div>
      )}
    </div>
  );
};

export default DisasterEvacuationDemo;
