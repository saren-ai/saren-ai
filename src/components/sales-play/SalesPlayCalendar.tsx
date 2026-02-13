import React from "react";

export const SalesPlayCalendar = () => {
    const touches = {
        1: { channel: "LinkedIn", action: "Connection request with personalized note" },
        2: { channel: "Email", action: "Value-first cold email (no pitch)" },
        4: { channel: "LinkedIn", action: "Engage with their content" },
        6: { channel: "Email", action: "Follow-up with relevant insight" },
        8: { channel: "Phone", action: "Cold call with specific reason" },
        10: { channel: "LinkedIn", action: "Share relevant content directly" },
        13: { channel: "Email", action: "Case study or social proof" },
        16: { channel: "LinkedIn", action: "Voice message or video" },
        20: { channel: "Phone", action: "Follow-up call" },
        25: { channel: "Email", action: "Break-up email with value offer" },
    };

    return (
        <div className="w-full">
            {/* Calendar Grid */}
            <div className="grid grid-cols-5 gap-2 md:gap-3 mb-6">
                {Array.from({ length: 25 }, (_, i) => {
                    const dayNumber = i + 1;
                    const touch = touches[dayNumber as keyof typeof touches];
                    const hasTouch = !!touch;

                    return (
                        <div
                            key={dayNumber}
                            className={`aspect-square rounded-lg border flex flex-col p-1.5 md:p-2 transition-all ${hasTouch
                                    ? "bg-white/10 border-ember/30 shadow-sm hover:bg-white/15"
                                    : "bg-white/5 border-white/5 opacity-50"
                                }`}
                        >
                            <div className="flex items-start justify-between mb-1">
                                <span
                                    className={`text-[10px] md:text-sm font-mono font-semibold ${hasTouch ? "text-ember" : "text-white/30"
                                        }`}
                                >
                                    {dayNumber}
                                </span>
                            </div>
                            {hasTouch && touch && (
                                <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                                    <span
                                        className={`inline-block px-1.5 py-0.5 rounded-[4px] text-[8px] md:text-[10px] font-medium self-start truncate max-w-full ${touch.channel === "LinkedIn"
                                                ? "bg-[#0077B5]/20 text-[#0077B5] border border-[#0077B5]/30"
                                                : touch.channel === "Email"
                                                    ? "bg-electric/20 text-electric border border-electric/30"
                                                    : "bg-copper/20 text-copper border border-copper/30"
                                            }`}
                                    >
                                        {touch.channel}
                                    </span>
                                    <p className="text-[9px] md:text-[11px] text-white/90 leading-tight line-clamp-2 md:line-clamp-3">
                                        {touch.action}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-[#0077B5]/20 border border-[#0077B5]"></span>
                    <span className="text-xs md:text-sm text-white/70">LinkedIn</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-electric/20 border border-electric"></span>
                    <span className="text-xs md:text-sm text-white/70">Email</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-copper/20 border border-copper"></span>
                    <span className="text-xs md:text-sm text-white/70">Phone</span>
                </div>
            </div>
        </div>
    );
};
