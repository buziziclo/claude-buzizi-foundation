// Buzizi Foundation — Tweaks panel
// Provides color/hero/copy variants. Lives across all pages via assets/tweaks-panel.jsx
// + this controller.

(function () {
  // Read default tweaks from a JSON-shaped block we can rewrite to disk.
  const DEFAULTS = /*EDITMODE-BEGIN*/ {
    "accentMode": "orange",
    "heroStyle": "motion",
    "missionTone": "warm",
    "headerEyebrow": "The Claude Buzizi Foundation"
  } /*EDITMODE-END*/;

  // Apply tweaks to the document
  function apply(t) {
    const root = document.documentElement;

    // Accent palette
    const palettes = {
      orange:    ["16 94% 58%",  "43 74% 52%",  "25 95% 63%",  "45 100% 68%"],
      burgundy:  ["0 65% 38%",   "16 94% 58%",  "8 86% 58%",   "43 74% 52%"],
      forest:    ["152 40% 32%", "43 74% 52%",  "152 35% 45%", "45 100% 68%"],
      navy:      ["212 65% 28%", "43 74% 52%",  "212 50% 40%", "45 100% 68%"],
    };
    const p = palettes[t.accentMode] || palettes.orange;
    root.style.setProperty("--bf-orange", p[0]);
    root.style.setProperty("--bf-gold", p[1]);
    root.style.setProperty("--bf-orange-warm", p[2]);
    root.style.setProperty("--bf-gold-soft", p[3]);

    // Hero style
    document.body.dataset.heroStyle = t.heroStyle || "motion";

    // Mission tone — swaps headline copy on home/about
    const headlines = document.querySelectorAll("[data-tone-target]");
    const tones = {
      warm: {
        hero_eyebrow: t.headerEyebrow,
        hero_h1_pre: "Restoring",
        hero_h1_script: "Hope",
        hero_h1_post: "in every life we touch.",
        hero_lead: "A foundation born from a simple conviction: success should not stop with you. We turn business income into meals on tables, scholarships in classrooms, and skills in the hands of people building their first real chance.",
      },
      bold: {
        hero_eyebrow: t.headerEyebrow,
        hero_h1_pre: "Feeding lives.",
        hero_h1_script: "Building futures.",
        hero_h1_post: "Equipping the next giver.",
        hero_lead: "Three pillars — Feed, Educate, Equip — powered by one flywheel: business income becoming someone else's first chance.",
      },
      editorial: {
        hero_eyebrow: t.headerEyebrow,
        hero_h1_pre: "Every life",
        hero_h1_script: "matters.",
        hero_h1_post: "We're here to prove it.",
        hero_lead: "From 13-hour factory shifts to a foundation: the Claude Buzizi Foundation channels income from the Mognetize universe into meals, scholarships, and the same playbook that built it.",
      },
    };
    const tone = tones[t.missionTone] || tones.warm;
    headlines.forEach((el) => {
      const key = el.dataset.toneTarget;
      if (tone[key]) el.textContent = tone[key];
    });
  }

  // ---- React UI for the Tweaks panel ----
  function App() {
    const { useTweaks } = window;
    const [t, setTweak] = useTweaks(DEFAULTS);

    React.useEffect(() => apply(t), [t]);

    return (
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Color accent">
          <window.TweakColor
            label="Palette"
            value={t.accentMode}
            onChange={(v) => setTweak("accentMode", v)}
            options={[
              ["#F46D2E", "#D9A23A"],
              ["#A11F2A", "#F46D2E"],
              ["#3B7558", "#D9A23A"],
              ["#1B3A66", "#D9A23A"],
            ]}
            optionLabels={["Orange & Gold (default)", "Burgundy & Orange", "Forest & Gold", "Navy & Gold"]}
          />
        </window.TweakSection>

        <window.TweakSection title="Home hero">
          <window.TweakRadio
            label="Background"
            value={t.heroStyle}
            onChange={(v) => setTweak("heroStyle", v)}
            options={[
              { value: "motion", label: "Motion gradient" },
              { value: "portrait", label: "Founder portrait" },
              { value: "video", label: "Video slot" },
            ]}
          />
        </window.TweakSection>

        <window.TweakSection title="Mission tone">
          <window.TweakSelect
            label="Headline voice"
            value={t.missionTone}
            onChange={(v) => setTweak("missionTone", v)}
            options={[
              { value: "warm", label: "Warm — Restoring Hope" },
              { value: "bold", label: "Bold — Rebuilding Lives" },
              { value: "editorial", label: "Editorial — Every life matters" },
            ]}
          />
          <window.TweakText
            label="Eyebrow tagline"
            value={t.headerEyebrow}
            onChange={(v) => setTweak("headerEyebrow", v)}
          />
        </window.TweakSection>

        <window.TweakSection title="Quick links">
          <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: "rgba(255,255,255,0.7)" }}>
            All variants persist across pages. Cycle through tones to compare copy directions before you lock anything down.
          </p>
        </window.TweakSection>
      </window.TweaksPanel>
    );
  }

  // Apply defaults immediately so pages load with chosen accent/tone
  // even before Tweaks panel is opened.
  document.addEventListener("DOMContentLoaded", () => {
    apply(DEFAULTS);
  });

  // Mount the panel root
  const mount = document.createElement("div");
  mount.id = "bf-tweaks-root";
  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(mount);
    // wait for tweaks-panel.jsx to load (it sets window.TweaksPanel)
    const tryMount = () => {
      if (window.TweaksPanel && window.useTweaks) {
        ReactDOM.createRoot(mount).render(<App />);
      } else {
        setTimeout(tryMount, 50);
      }
    };
    tryMount();
  });
})();
