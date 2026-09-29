import { useMemo } from 'react';

const GanttChart = ({ tasks }) => {
  const config = useMemo(() => {
    if (!tasks || tasks.length === 0) return null;

    const projectDuration = Math.max(...tasks.map(t => t.ef));
    const rowHeight = 44;
    const headerHeight = 40;
    const labelWidth = 120;
    const dayWidth = 50;
    const chartWidth = labelWidth + projectDuration * dayWidth + 40;
    const chartHeight = headerHeight + tasks.length * rowHeight + 20;

    return { projectDuration, rowHeight, headerHeight, labelWidth, dayWidth, chartWidth, chartHeight };
  }, [tasks]);

  if (!config) return null;

  const { projectDuration, rowHeight, headerHeight, labelWidth, dayWidth, chartWidth, chartHeight } = config;

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg width={chartWidth} height={chartHeight} className="gantt-svg">
        {/* Background grid */}
        {Array.from({ length: projectDuration + 1 }, (_, i) => (
          <line
            key={`grid-${i}`}
            x1={labelWidth + i * dayWidth}
            y1={0}
            x2={labelWidth + i * dayWidth}
            y2={chartHeight}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Header - Day numbers */}
        {Array.from({ length: projectDuration }, (_, i) => (
          <text
            key={`header-${i}`}
            x={labelWidth + i * dayWidth + dayWidth / 2}
            y={headerHeight / 2 + 5}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="12"
            fontFamily="Inter, sans-serif"
          >
            {i}
          </text>
        ))}

        {/* Header line */}
        <line
          x1={0}
          y1={headerHeight}
          x2={chartWidth}
          y2={headerHeight}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />

        {/* Task rows */}
        {tasks.map((task, index) => {
          const y = headerHeight + index * rowHeight;
          const barX = labelWidth + task.es * dayWidth;
          const barWidth = task.duration * dayWidth;
          const barY = y + 8;
          const barHeight = rowHeight - 16;
          const isCritical = task.isCritical;

          return (
            <g key={task.id}>
              {/* Row background - alternate */}
              {index % 2 === 0 && (
                <rect
                  x={0}
                  y={y}
                  width={chartWidth}
                  height={rowHeight}
                  fill="rgba(255,255,255,0.02)"
                />
              )}

              {/* Task label */}
              <text
                x={10}
                y={y + rowHeight / 2 + 5}
                fill="#f8fafc"
                fontSize="13"
                fontWeight="600"
                fontFamily="Inter, sans-serif"
              >
                {task.id}
              </text>

              {/* Slack bar (light background showing total float) */}
              {task.slack > 0 && (
                <rect
                  x={barX}
                  y={barY + barHeight / 4}
                  width={(task.duration + task.slack) * dayWidth}
                  height={barHeight / 2}
                  rx="4"
                  fill="rgba(148,163,184,0.1)"
                />
              )}

              {/* Task bar */}
              <rect
                x={barX}
                y={barY}
                width={Math.max(barWidth, 4)}
                height={barHeight}
                rx="6"
                fill={isCritical ? 'url(#criticalGradient)' : 'url(#normalGradient)'}
                style={{ filter: isCritical ? 'drop-shadow(0 0 6px rgba(239,68,68,0.5))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
              >
                <animate
                  attributeName="width"
                  from="0"
                  to={Math.max(barWidth, 4)}
                  dur="0.6s"
                  fill="freeze"
                />
              </rect>

              {/* Duration label on bar */}
              {barWidth > 30 && (
                <text
                  x={barX + barWidth / 2}
                  y={barY + barHeight / 2 + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                >
                  {task.duration}d
                </text>
              )}

              {/* ES/EF labels */}
              <text
                x={barX - 4}
                y={barY - 2}
                textAnchor="end"
                fill="#64748b"
                fontSize="9"
                fontFamily="Inter, sans-serif"
              >
                ES:{task.es}
              </text>
              <text
                x={barX + barWidth + 4}
                y={barY - 2}
                textAnchor="start"
                fill="#64748b"
                fontSize="9"
                fontFamily="Inter, sans-serif"
              >
                EF:{task.ef}
              </text>
            </g>
          );
        })}

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="criticalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="normalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default GanttChart;
