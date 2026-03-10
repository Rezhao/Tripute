export default function HeroScene() {
  return (
    <div className="hero-frame relative overflow-hidden rounded-3xl border border-white/60">
      <div className="hero-glow absolute inset-0" aria-hidden="true" />

      <svg
        className="hero-sky absolute inset-0 h-full w-full"
        viewBox="0 0 900 520"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E0F2FE" />
            <stop offset="1" stopColor="#F8FAFC" />
          </linearGradient>
          <linearGradient id="haze" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0EA5E9" stopOpacity="0.22" />
            <stop offset="1" stopColor="#F97316" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        <rect width="900" height="520" fill="url(#sky)" />
        <rect width="900" height="520" fill="url(#haze)" opacity="0.55" />
      </svg>

      <svg
        className="hero-clouds absolute inset-0 h-full w-full"
        viewBox="0 0 900 520"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g opacity="0.65" fill="#FFFFFF">
          <path d="M140 120c20-28 70-28 92 0 26-12 58 3 64 28 26 8 40 30 28 52H104c-28 0-46-18-46-38 0-22 18-40 40-42 6-12 22-16 42 0Z" />
          <path d="M620 96c18-24 54-26 76-4 24-10 52 4 56 26 24 8 36 28 26 46H556c-26 0-42-16-42-34 0-18 14-34 34-36 6-10 18-12 34 2Z" />
          <path d="M340 160c18-20 46-22 64-6 18-10 40 0 44 18 18 6 26 20 18 34H292c-20 0-32-12-32-26 0-14 12-26 28-28 6-8 16-8 24 8Z" />
        </g>
      </svg>

      <svg
        className="hero-mountains absolute inset-x-0 bottom-0 h-[70%] w-full"
        viewBox="0 0 900 360"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 300 L140 160 L240 220 L340 120 L460 240 L590 140 L690 220 L820 140 L900 210 L900 360 L0 360 Z"
          fill="#0F172A"
          opacity="0.12"
        />
        <path
          d="M0 320 L180 200 L260 250 L380 160 L500 270 L640 180 L720 240 L820 190 L900 240 L900 360 L0 360 Z"
          fill="#0F172A"
          opacity="0.18"
        />
        <path
          d="M0 340 L220 250 L340 300 L460 230 L580 310 L700 250 L820 300 L900 270 L900 360 L0 360 Z"
          fill="#0F172A"
          opacity="0.24"
        />
      </svg>

      <svg
        className="hero-route absolute inset-0 h-full w-full"
        viewBox="0 0 900 520"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          id="tripute-route"
          d="M120 360 C 240 280, 340 420, 460 330 S 680 260, 820 320"
          fill="none"
          stroke="#0EA5E9"
          strokeOpacity="0.55"
          strokeWidth="3"
          strokeDasharray="6 10"
        />
        <g transform="translate(120 360)" opacity="0.98">
          <path
            d="M0 -26c-9.4 0-17 7.6-17 17 0 12.6 17 29 17 29s17-16.4 17-29c0-9.4-7.6-17-17-17Z"
            fill="#F97316"
          />
          <path
            d="M0 -26c-9.4 0-17 7.6-17 17 0 12.6 17 29 17 29s17-16.4 17-29c0-9.4-7.6-17-17-17Z"
            fill="none"
            stroke="#0F172A"
            strokeOpacity="0.18"
            strokeWidth="2"
          />
          <circle cx="0" cy="-9" r="6.5" fill="#FFFFFF" />
          <circle cx="0" cy="-9" r="3.2" fill="#0EA5E9" opacity="0.95" />
        </g>
        <circle cx="820" cy="320" r="7" fill="#16A34A" opacity="0.9" />

        <g className="hero-travelers" opacity="0.95">
          <animateMotion dur="7.5s" repeatCount="indefinite" rotate="auto">
            <mpath href="#tripute-route" />
          </animateMotion>
          <g>
            <g transform="translate(0 -26)">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 -26; 0 -27.6; 0 -26"
                dur="1.1s"
                repeatCount="indefinite"
              />

              <g transform="translate(-22 6)">
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0; 0 -0.8; 0 0"
                    dur="0.9s"
                    repeatCount="indefinite"
                    begin="-0.2s"
                  />
                  <circle cx="0" cy="0" r="6.6" fill="#FFE7D6" />
                  <path d="M-6.8 -0.5c1.6-4.2 4.2-6.2 7.8-6.2 3.8 0 6.4 2.1 7.8 6.4" fill="#0F172A" opacity="0.22" />
                  <path d="M-2 -1.2c0 0 1.6 1.4 3.8 0" stroke="#0F172A" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M-8 15c0-4.6 3.6-8.4 8-8.4s8 3.8 8 8.4v6H-8v-6Z" fill="#16A34A" opacity="0.92" />
                  <path d="M-8 15c0-4.6 3.6-8.4 8-8.4s8 3.8 8 8.4" fill="none" stroke="#0F172A" strokeOpacity="0.18" strokeWidth="1.3" strokeLinejoin="round" />

                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="-18 0 9; 18 0 9; -18 0 9"
                      dur="0.8s"
                      repeatCount="indefinite"
                      begin="-0.2s"
                    />
                    <path d="M-7 10 L-14 15" stroke="#0F172A" strokeOpacity="0.28" strokeWidth="2.2" strokeLinecap="round" />
                  </g>
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="18 0 9; -18 0 9; 18 0 9"
                      dur="0.8s"
                      repeatCount="indefinite"
                      begin="-0.2s"
                    />
                    <path d="M7 10 L14 14" stroke="#0F172A" strokeOpacity="0.28" strokeWidth="2.2" strokeLinecap="round" />
                  </g>

                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="16 0 15; -16 0 15; 16 0 15"
                      dur="0.8s"
                      repeatCount="indefinite"
                      begin="-0.2s"
                    />
                    <path d="M-2 15 L-7 25" stroke="#0F172A" strokeOpacity="0.35" strokeWidth="2.4" strokeLinecap="round" />
                  </g>
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="-16 0 15; 16 0 15; -16 0 15"
                      dur="0.8s"
                      repeatCount="indefinite"
                      begin="-0.2s"
                    />
                    <path d="M2 15 L8 24" stroke="#0F172A" strokeOpacity="0.35" strokeWidth="2.4" strokeLinecap="round" />
                  </g>
                </g>
              </g>

              <g transform="translate(0 2)">
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0; 0 -1.1; 0 0"
                    dur="0.95s"
                    repeatCount="indefinite"
                  />
                  <circle cx="0" cy="0" r="7.2" fill="#FFE7D6" />
                  <path d="M-7.4 -1c1.8-4.7 4.6-6.9 8.4-6.9 4 0 6.8 2.3 8.4 7.1" fill="#0F172A" opacity="0.24" />
                  <path d="M-2.6 -1.4c0 0 2.1 1.7 5 0" stroke="#0F172A" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M-9 16c0-5.1 4-9.2 9-9.2s9 4.1 9 9.2v7H-9v-7Z" fill="#0EA5E9" opacity="0.92" />
                  <path d="M-9 16c0-5.1 4-9.2 9-9.2s9 4.1 9 9.2" fill="none" stroke="#0F172A" strokeOpacity="0.18" strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M-9 14c-2.6 1.6-4.2 4-4.2 6.6v3.4H-9V14Z" fill="#F97316" opacity="0.75" />

                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="-16 0 10; 16 0 10; -16 0 10"
                      dur="0.85s"
                      repeatCount="indefinite"
                    />
                    <path d="M-8 11 L-15 16" stroke="#0F172A" strokeOpacity="0.28" strokeWidth="2.4" strokeLinecap="round" />
                  </g>
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="16 0 10; -16 0 10; 16 0 10"
                      dur="0.85s"
                      repeatCount="indefinite"
                    />
                    <path d="M8 11 L15 15" stroke="#0F172A" strokeOpacity="0.28" strokeWidth="2.4" strokeLinecap="round" />
                  </g>

                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="18 0 16; -18 0 16; 18 0 16"
                      dur="0.85s"
                      repeatCount="indefinite"
                    />
                    <path d="M-2 16 L-9 27" stroke="#0F172A" strokeOpacity="0.36" strokeWidth="2.6" strokeLinecap="round" />
                  </g>
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="-18 0 16; 18 0 16; -18 0 16"
                      dur="0.85s"
                      repeatCount="indefinite"
                    />
                    <path d="M2 16 L10 26" stroke="#0F172A" strokeOpacity="0.36" strokeWidth="2.6" strokeLinecap="round" />
                  </g>
                </g>
              </g>

              <g transform="translate(24 8)">
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0; 0 -0.7; 0 0"
                    dur="0.9s"
                    repeatCount="indefinite"
                    begin="-0.35s"
                  />
                  <circle cx="0" cy="0" r="6.6" fill="#FFE7D6" />
                  <path d="M-6.8 -0.7c1.6-4.1 4.2-6.1 7.8-6.1 3.8 0 6.4 2.1 7.8 6.3" fill="#0F172A" opacity="0.22" />
                  <path d="M-1.9 -1.2c0 0 1.6 1.4 3.8 0" stroke="#0F172A" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M-8 15c0-4.6 3.6-8.4 8-8.4s8 3.8 8 8.4v6H-8v-6Z" fill="#F97316" opacity="0.92" />
                  <path d="M-8 15c0-4.6 3.6-8.4 8-8.4s8 3.8 8 8.4" fill="none" stroke="#0F172A" strokeOpacity="0.18" strokeWidth="1.3" strokeLinejoin="round" />

                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="18 0 9; -18 0 9; 18 0 9"
                      dur="0.8s"
                      repeatCount="indefinite"
                      begin="-0.35s"
                    />
                    <path d="M-7 10 L-14 14" stroke="#0F172A" strokeOpacity="0.28" strokeWidth="2.2" strokeLinecap="round" />
                  </g>
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="-18 0 9; 18 0 9; -18 0 9"
                      dur="0.8s"
                      repeatCount="indefinite"
                      begin="-0.35s"
                    />
                    <path d="M7 10 L14 15" stroke="#0F172A" strokeOpacity="0.28" strokeWidth="2.2" strokeLinecap="round" />
                  </g>

                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="-16 0 15; 16 0 15; -16 0 15"
                      dur="0.8s"
                      repeatCount="indefinite"
                      begin="-0.35s"
                    />
                    <path d="M-2 15 L-8 24" stroke="#0F172A" strokeOpacity="0.35" strokeWidth="2.4" strokeLinecap="round" />
                  </g>
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="16 0 15; -16 0 15; 16 0 15"
                      dur="0.8s"
                      repeatCount="indefinite"
                      begin="-0.35s"
                    />
                    <path d="M2 15 L7 25" stroke="#0F172A" strokeOpacity="0.35" strokeWidth="2.4" strokeLinecap="round" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <div className="hero-caption inline-flex flex-wrap items-center gap-2 rounded-2xl bg-white/70 px-4 py-3 text-sm text-slate-600 shadow-card backdrop-blur">
          <span className="font-semibold text-ink">Tripute</span>
          <span className="text-slate-300">·</span>
          <span>Collect ideas. Vote together. Build the itinerary.</span>
        </div>
      </div>
    </div>
  );
}
