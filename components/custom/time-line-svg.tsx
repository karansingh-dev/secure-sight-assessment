export default function TimeLineSvg24Hours() {
  const width = 2350;
  const height = 40;
  const hours = 27;
  const hourWidth = width / hours;
  const minorTicksPerHour = 6;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Timeline base line */}
      <line
        x1="0"
        y1={height / 2}
        x2={width}
        y2={height / 2}
        stroke="#444"
        strokeWidth="1"
      />

      {/* Hour markers and labels */}
      {Array.from({ length: hours + 1 }).map((_, i) => {
        const x = i * hourWidth;
        return (
          <g key={`hour-${i}`}>
            <line
              x1={x}
              y1={0}
              x2={x}
              y2={height}
              stroke="#ccc"
              strokeWidth="1"
            />
            <text
              x={x}
              y={height - 5}
              fontSize="10"
              textAnchor="middle"
              fill="#ccc"
              fontFamily="monospace"
            >
              {i.toString().padStart(2, "0")}:00
            </text>
          </g>
        );
      })}

      {/* Minor ticks every 10 minutes */}
      {Array.from({ length: hours }).flatMap((_, hourIndex) => {
        return Array.from({ length: minorTicksPerHour }).map((_, j) => {
          const x =
            hourIndex * hourWidth +
            ((j + 1) * hourWidth) / (minorTicksPerHour + 1);
          return (
            <line
              key={`minor-${hourIndex}-${j}`}
              x1={x}
              y1={height / 2 - 4}
              x2={x}
              y2={height / 2 + 4}
              stroke="#888"
              strokeWidth="1"
            />
          );
        });
      })}
    </svg>
  );
}
