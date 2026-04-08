// --- src/constants/calendarData.js ---

export const HOLIDAYS = {
  "1-1": "New Year's Day",
  "1-26": "Republic Day",
  "3-8": "International Women's Day",
  "4-14": "Ambedkar Jayanti",
  "8-15": "Independence Day",
  "10-2": "Gandhi Jayanti",
  "10-31": "Halloween",
  "12-25": "Christmas Day",
  "12-31": "New Year's Eve",
};

export const MONTH_IMAGES = [
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=70", // Jan
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=70", // Feb
  "https://images.unsplash.com/photo-1490750967868-88df5691cc5f?w=600&q=70", // Mar
  "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=70", // Apr
  "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=70", // May
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=70", // Jun
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=70", // Jul
  "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=70", // Aug
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=70", // Sep
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=70", // Oct
  "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=600&q=70", // Nov
  "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=600&q=70", // Dec
];

export const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Notice how you can now easily add more themes (e.g., 'dracula', 'ocean') in the future!
export const THEMES = {
  light: {
    bg: "#f5f0e8",
    card: "#ffffff",
    ink: "#1a1208",
    muted: "#8b7355",
    soft: "#e8e0d0",
    accent: "#c4622d",
    rangeText: "#ffffff",
    rangeBg: "rgba(196,98,45,0.12)",
    hoverBg: "rgba(196,98,45,0.07)",
    noteGlass: "rgba(255,255,255,0.08)",
    noteBorder: "rgba(255,255,255,0.14)",
    pillBg: "#f5f0e8",
    todayDot: "#c4622d",
    shadow: "0 8px 40px rgba(26,18,8,0.13)",
  },
  dark: {
    bg: "#1a1510",
    card: "#221e18",
    ink: "#f0e8d8",
    muted: "#a08060",
    soft: "#2a221a",
    accent: "#e07a47",
    rangeText: "#ffffff",
    rangeBg: "rgba(224,122,71,0.15)",
    hoverBg: "rgba(224,122,71,0.10)",
    noteGlass: "rgba(255,255,255,0.05)",
    noteBorder: "rgba(255,255,255,0.09)",
    pillBg: "#1a1510",
    todayDot: "#e07a47",
    shadow: "0 8px 40px rgba(0,0,0,0.45)",
  },
};
