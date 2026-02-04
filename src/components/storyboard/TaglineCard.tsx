export default function TaglineCard() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-charcoal to-offblack text-ash p-12 md:p-16 rounded-lg min-h-[400px]">
      <div className="text-center max-w-2xl">
        {/* Decorative line */}
        <svg
          className="w-16 h-1 mx-auto mb-8 text-ember"
          viewBox="0 0 64 4"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M0 2 Q 16 0, 32 2 T 64 2"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Main tagline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          it&apos;s good to be pitched
        </h2>

        {/* Brand */}
        <p className="text-xl md:text-2xl text-ash/70 font-medium">
          Juxt Interactive
        </p>

        {/* Small accent */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-1 h-1 bg-ember rounded-full" />
          <div className="w-1 h-1 bg-copper rounded-full" />
          <div className="w-1 h-1 bg-electric rounded-full" />
        </div>
      </div>
    </div>
  );
}
