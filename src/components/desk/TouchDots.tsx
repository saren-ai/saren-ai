const FILLED = new Set(["sent", "opened", "replied"]);
const DEAD = new Set(["bounced", "skipped"]);
const MAX = 10;

interface TouchDotsProps {
  statuses: (string | null)[];
}

export default function TouchDots({ statuses }: TouchDotsProps) {
  const dots = statuses.slice(0, MAX);

  return (
    <div className="flex items-center gap-1">
      {dots.map((s, i) => {
        const status = s ?? "pending";
        if (DEAD.has(status)) {
          return (
            <span
              key={i}
              className="inline-flex items-center justify-center w-3 h-3 text-[8px] text-ember font-bold"
              title={status}
            >
              ×
            </span>
          );
        }
        const filled = FILLED.has(status);
        return (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full border ${
              filled
                ? "bg-lavender border-lavender"
                : "border-border bg-transparent"
            }`}
            title={status}
          />
        );
      })}
    </div>
  );
}
