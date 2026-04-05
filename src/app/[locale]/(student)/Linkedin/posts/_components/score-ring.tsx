export default function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const stroke = 9;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = circumference - (score / 100) * circumference;
  const color = score >= 75 ? "#2563eb" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg width="144" height="144" viewBox="0 0 144 144">
          <circle
            cx="72"
            cy="72"
            r={normalizedRadius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={stroke}
          />
          <circle
            cx="72"
            cy="72"
            r={normalizedRadius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            transform="rotate(-90 72 72)"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold" style={{ color }}>
            {score}%
          </span>
          <span className="text-xs text-gray-400 font-medium">Match Score</span>
        </div>
      </div>
      <p className="text-lg font-bold text-gray-800">
        {score >= 75 ? "Strong Match!" : score >= 50 ? "Partial Match!" : "Low Match!"}
      </p>
    </div>
  );
}
